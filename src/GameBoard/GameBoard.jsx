import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from '../hooks/useInterval';
import { Container, GamePenal } from './style';
import ScorePanel from '../components/ScoresPanel';
import ControlPanel from '../components/ControlPanel';
import Decks from '../components/Decks';
import useGameStatus, {
  compareDecks,
  RESULT_TEXT,
} from '../hooks/useGameStatus';
import usePlayer from '../hooks/usePlayer';
import useCPU from '../hooks/useCPU';
import {
  gameSetsAction,
  initScore,
  initTotalScore,
  scoreAction,
  totalScoreAction,
} from '../reducers/gameStatus';
import {
  DEFAULT_LIMIT_TIME,
  limitTimeAction,
  resultAction,
  runningAction,
  startAction,
  victoryConditionAction,
} from '../reducers/gameBoard';

const GameBoard = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector(state => state.player);
  const { score, gameSets, totalScore } = useSelector(
    state => state.gameStatus
  );
  const { selected: selectedCpuDeck } = useSelector(state => state.CPU);
  const {
    isRunning,
    isStart,
    result,
    victoryCondition,
    limitTime,
  } = useSelector(state => state.gameBoard);

  const [updateSelected] = usePlayer();
  const [updateCpuDeck] = useCPU();

  const initialLimitTime = useRef(5);
  const millisecond = useRef(1000);
  const delay = useRef(millisecond.current);

  const reset = useCallback(() => {
    dispatch(startAction({ isStart: false }));
    dispatch(victoryConditionAction({ victoryCondition: 1 }));
    dispatch(runningAction({ isRunning: false }));
    dispatch(resultAction({ result: '' }));
    dispatch(limitTimeAction({ limitTime: DEFAULT_LIMIT_TIME }));
  }, []);

  useGameStatus({
    reset,
  });

  useInterval(
    () => {
      dispatch(limitTimeAction({ limitTime: limitTime - 1 }));
    },
    isRunning ? delay.current : null
  );

  useEffect(() => {
    updateCpuDeck();
  }, [selected]);

  useEffect(() => {
    if (limitTime === 0) {
      dispatch(
        scoreAction({
          score: {
            ...score,
            lose: score.lose + 1,
          },
        })
      );

      dispatch(runningAction({ isRunning: false }));
      const res = compareDecks(undefined, selectedCpuDeck);
      dispatch(resultAction({ result: RESULT_TEXT[res] }));
    }
  }, [limitTime]);

  const onClickStart = useCallback(() => {
    dispatch(runningAction({ isRunning: true }));
    dispatch(
      gameSetsAction({
        gameSets: gameSets + 1,
      })
    );
    dispatch(startAction({ isStart: true }));
    updateCpuDeck();
  }, []);

  const onClickStop = useCallback(() => {
    reset();
    dispatch(
      gameSetsAction({
        gameSets: 0,
      })
    );

    dispatch(
      totalScoreAction({
        totalScore: initTotalScore,
      })
    );

    dispatch(scoreAction({ score: initScore }));
  }, []);

  const onClickSelected = useCallback(
    selectedIndex => () => {
      updateSelected({ ...selectedIndex });
      dispatch(runningAction({ isRunning: false }));

      const res = compareDecks(selectedIndex.index, selectedCpuDeck);
      dispatch(resultAction({ result: RESULT_TEXT[res] }));
    },
    [selectedCpuDeck]
  );

  const onClickNextRound = useCallback(() => {
    dispatch(runningAction({ isRunning: true }));
    dispatch(limitTimeAction({ limitTime: initialLimitTime.current }));
    dispatch(resultAction({ result: '' }));
  }, []);

  const onClickCount = useCallback(
    event => {
      const {
        target: { name },
      } = event;

      const getVictoryCondition = () => {
        let nextValue;
        if (name === 'plus') {
          nextValue = victoryCondition + 1;
        } else {
          nextValue = victoryCondition - 1;
        }

        if (nextValue < 1) {
          nextValue = 1;
          alert('최소 조건은 1세트 입니다');
        }

        return nextValue;
      };

      dispatch(
        victoryConditionAction({ victoryCondition: getVictoryCondition() })
      );
    },
    [victoryCondition]
  );

  return (
    <Container>
      <ScorePanel
        limitTime={limitTime}
        score={score}
        totalScore={totalScore}
        onClickCount={onClickCount}
        victoryCondition={victoryCondition}
        isStart={isStart}
      />
      <GamePenal>
        <div>{result}</div>
      </GamePenal>
      <div>
        {isRunning ? (
          <Decks onClickSelected={onClickSelected} />
        ) : (
          <>
            {isStart && (
              <div>
                <button type="button" onClick={onClickNextRound}>
                  다음판
                </button>
              </div>
            )}
            <div>
              <ControlPanel
                onClickStart={onClickStart}
                onClickStop={onClickStop}
                isStart={isStart}
              />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default GameBoard;
