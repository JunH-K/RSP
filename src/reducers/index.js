import { combineReducers } from 'redux';
import gameStatus from './gameStatus';
import player from './player';
import CPU from './CPU';
import gameBoard from './gameBoard';

const rootReducer = combineReducers({
  gameStatus,
  player,
  CPU,
  gameBoard,
});

export default rootReducer;
