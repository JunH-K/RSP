export const DEFAULT_LIMIT_TIME = 5;

const initialState = {
  isRunning: false,
  isStart: false,
  result: '',
  victoryCondition: 1,
  limitTime: DEFAULT_LIMIT_TIME,
};

export const ALL_ACTION = 'allAction';
export const allAction = data => ({ type: ALL_ACTION, data });

export const RUNNING = 'running';
export const runningAction = data => ({ type: RUNNING, data });

export const LIMIT_TIME = 'limitTime';
export const limitTimeAction = data => ({ type: LIMIT_TIME, data });

export const START = 'start';
export const startAction = data => ({ type: START, data });

export const RESULT = 'result';
export const resultAction = data => ({ type: RESULT, data });

export const VICTORY_CONDITION = 'victoryCondition';
export const victoryConditionAction = data => ({
  type: VICTORY_CONDITION,
  data,
});

const gameBoard = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ACTION: {
      return {
        ...state,
        isRunning: action.data.isRunning,
      };
    }
    case RUNNING: {
      return {
        ...state,
        isRunning: action.data.isRunning,
      };
    }
    case START: {
      return {
        ...state,
        isStart: action.data.isStart,
      };
    }
    case RESULT: {
      return {
        ...state,
        result: action.data.result,
      };
    }
    case VICTORY_CONDITION: {
      return {
        ...state,
        victoryCondition: action.data.victoryCondition,
      };
    }
    case LIMIT_TIME: {
      return {
        ...state,
        limitTime: action.data.limitTime,
      };
    }

    default: {
      return state;
    }
  }
};

export default gameBoard;
