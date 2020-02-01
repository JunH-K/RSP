import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  gameSetsAction,
  initTotalScore,
  scoreAction,
  totalScoreAction,
} from '../reducers/gameStatus';
import { runningAction } from '../reducers/gameBoard';

const RULES = {
  draw: [0],
  wins: [2, -1],
  lose: [1, -2],
};

const MATCH = {
  WINS: 'wins',
  LOSE: 'lose',
  DRAW: 'draw',
};

export const RESULT_TEXT = {
  [MATCH.WINS]: '이겼습니다!',
  [MATCH.LOSE]: '졌습니다..',
  [MATCH.DRAW]: '비겼습니다!',
};

const setFinishRule = (totalCount, wins, lose) => {
  return {
    totalCount,
    wins,
    lose,
  };
};

export const compareDecks = (userSelected, cpuSelected) => {
  const diff = userSelected - cpuSelected;
  let result;

  if (Number.isNaN(diff)) {
    return MATCH.LOSE;
  }

  if (RULES.wins.includes(diff)) {
    result = MATCH.WINS;
  } else if (RULES.lose.includes(diff)) {
    result = MATCH.LOSE;
  } else {
    result = MATCH.DRAW;
  }

  return result;
};

const confirmMatch = score => {
  const { wins, lose } = score;
  if (wins > lose) {
    return MATCH.WINS;
  }

  if (lose > wins) {
    return MATCH.LOSE;
  }

  return MATCH.DRAW;
};

const checkFinishGameSets = (score, finishRules) => {
  const { wins, lose, draw } = score;
  const totalCount = wins + lose + draw;

  if (
    finishRules.totalCount === totalCount ||
    finishRules.wins === wins ||
    finishRules.lose === lose
  ) {
    return true;
  }

  return false;
};

const showSetsResult = str => {
  alert(str);
};

const useGameStatus = ({ reset }) => {
  const { score, gameSets, totalScore } = useSelector(
    state => state.gameStatus
  );
  const { selected: selectedCpuDeck } = useSelector(state => state.CPU);
  const { selected } = useSelector(state => state.player);
  const { victoryCondition } = useSelector(state => state.gameBoard);

  const dispatch = useDispatch();

  const finishGameSets = useRef(setFinishRule(5, 3, 3));

  const calculateScore = useCallback(() => {
    const index = parseInt(selected.index, 10);

    if (
      [...RULES.draw, ...RULES.wins, ...RULES.lose].includes(index) ||
      index === undefined
    ) {
      const result = compareDecks(index, selectedCpuDeck);

      dispatch(
        scoreAction({
          score: {
            ...score,
            [result]: score[result] + 1,
          },
        })
      );
    }
  }, [selected, selectedCpuDeck]);

  const updateTotalScore = useCallback(() => {
    const result = confirmMatch(score);
    const { set } = score;

    dispatch(
      scoreAction({
        score: {
          ...score,
          wins: 0,
          lose: 0,
          draw: 0,
        },
      })
    );

    dispatch(
      totalScoreAction({
        totalScore: {
          ...totalScore,
          [result]: totalScore[result] + 1,
        },
      })
    );

    showSetsResult(`${set}세트 ${RESULT_TEXT[result]}`);
  }, [score]);

  const checkGameOver = useCallback(() => {
    const { wins, lose } = totalScore;
    const isWins = victoryCondition === wins;
    const isLose = victoryCondition === lose;

    if (isWins || isLose) {
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
      reset();
    }

    if (isWins) {
      showSetsResult('최종승리!');
    } else if (isLose) {
      showSetsResult('컴퓨터에게 패배..');
    }
  }, [totalScore, victoryCondition]);

  useEffect(() => {
    calculateScore();
  }, [selected]);

  useEffect(() => {
    dispatch(
      scoreAction({
        score: {
          ...score,
          set: gameSets,
        },
      })
    );
  }, [gameSets]);

  useEffect(() => {
    const isFinish = checkFinishGameSets(score, finishGameSets.current);

    if (isFinish) {
      updateTotalScore();
      dispatch(
        gameSetsAction({
          gameSets: gameSets + 1,
        })
      );
      dispatch(runningAction({ isRunning: true }));
    }
  }, [score]);

  useEffect(() => {
    checkGameOver();
  }, [totalScore]);
};

export default useGameStatus;
