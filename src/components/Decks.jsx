import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Decks = memo(({ onClickSelected }) => {
  return (
    <>
      <div>
        <button type="button" onClick={onClickSelected({ index: 1 })}>
          가위
        </button>
        <button type="button" onClick={onClickSelected({ index: 0 })}>
          바위
        </button>
        <button type="button" onClick={onClickSelected({ index: -1 })}>
          보
        </button>
      </div>
    </>
  );
});

Decks.propTypes = {
  onClickSelected: PropTypes.func.isRequired,
};

export default Decks;
