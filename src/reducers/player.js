const initialState = {
  selected: { index: 99 },
};

export const SELECTED = 'selected';
export const selectedAction = data => ({ type: SELECTED, data });

const player = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED: {
      return {
        ...state,
        selected: action.data.selected,
      };
    }

    default: {
      return state;
    }
  }
};

export default player;
