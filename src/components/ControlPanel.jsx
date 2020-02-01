import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ControlPanel = memo(({ isStart, onClickStart, onClickStop }) => {
  return (
    <>
      {isStart ? (
        <>
          <button type="button" onClick={onClickStop}>
            그만하기
          </button>
        </>
      ) : (
        <button type="button" onClick={onClickStart}>
          게임시작
        </button>
      )}
    </>
  );
});

ControlPanel.propTypes = {
  isStart: PropTypes.bool.isRequired,
  onClickStart: PropTypes.func.isRequired,
  onClickStop: PropTypes.func.isRequired,
};

export default ControlPanel;
