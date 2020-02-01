const initialState = {
  selected: 0,
};

export const SELECTED_CPU = 'selectedCPU';
export const selectedAction = data => ({ type: SELECTED_CPU, data });

const CPU = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_CPU: {
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

export default CPU;
