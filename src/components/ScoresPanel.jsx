import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScorePanel = memo(
  ({
    isStart,
    limitTime,
    score = {},
    totalScore = {},
    victoryCondition,
    onClickCount,
  }) => {
    return (
      <>
        {!isStart && (
          <>
            <div>
              * 최종 승리 조건 설정 (1세트 : 5판 3선승)
              <br />
              {victoryCondition}
              세트
              <button onClick={onClickCount} name="plus">
                {' + '}
              </button>
              <button onClick={onClickCount} name="minus">
                {' - '}
              </button>
            </div>
          </>
        )}
        <div>{`( ${victoryCondition}set 승리시 최종우승! )`}</div>
        <ScorePanelDiv>
          <Div>남은시간 : {limitTime}초</Div>
          <Div>
            {`${score.set}세트 승리 횟수`}
            <UL>
              <li>승 : {`${score.wins} `}</li>
              <li>패 : {` ${score.lose}`} </li>
              <li>무승부 : {` ${score.draw}`} </li>
            </UL>
          </Div>
          <Div>
            세트 승리횟수
            <UL>
              <li>승 : {`${totalScore.wins}`}</li>
              <li>패 : {`${totalScore.lose}`}</li>
              <li>무승부 : {`${totalScore.draw}`}</li>
            </UL>
          </Div>
        </ScorePanelDiv>
      </>
    );
  }
);

const ScorePanelDiv = styled.div`
  display: flex;
`;
const Div = styled.div`
  flex: 1;
`;

const UL = styled.ul`
  list-style-type: none;
`;

ScorePanel.propTypes = {
  limitTime: PropTypes.number.isRequired,
  score: PropTypes.shape({
    set: PropTypes.number,
    wins: PropTypes.number,
    lose: PropTypes.number,
  }).isRequired,
  totalScore: PropTypes.shape({
    wins: PropTypes.number,
    lose: PropTypes.number,
  }),
};

export default ScorePanel;
