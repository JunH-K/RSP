export const initScore = { set: 0, wins: 0, lose: 0, draw: 0 };
export const initTotalScore = { wins: 0, lose: 0, draw: 0 };

const initialState = {
  score: initScore,
  totalScore: initTotalScore,
  gameSets: 0,
};

export const SCORE = 'score';
export const scoreAction = data => ({ type: SCORE, data });

export const TOTAL_SCORE = 'totalScore';
export const totalScoreAction = data => ({ type: TOTAL_SCORE, data });

export const GAME_SETS = 'gameSets';
export const gameSetsAction = data => ({ type: GAME_SETS, data });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SCORE: {
      return {
        ...state,
        score: action.data.score,
      };
    }
    case GAME_SETS: {
      return {
        ...state,
        gameSets: action.data.gameSets,
      };
    }
    case TOTAL_SCORE: {
      return {
        ...state,
        totalScore: action.data.totalScore,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
