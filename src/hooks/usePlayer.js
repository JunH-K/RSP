import { useDispatch } from 'react-redux';
import { selectedAction } from '../reducers/player';

const usePlayer = () => {
  const dispatch = useDispatch();

  const updateSelected = selectedIndex => {
    dispatch(selectedAction({ selected: selectedIndex }));
  };

  return [updateSelected];
};

export default usePlayer;
