import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { selectedAction } from '../reducers/CPU';

const useCPU = () => {
  const dispatch = useDispatch();

  const randomDeck = useCallback(() => {
    return Math.floor(Math.random() * 3);
  }, []);

  const updateCpuDeck = () => {
    dispatch(selectedAction({ selected: randomDeck() }));
  };

  return [updateCpuDeck];
};

export default useCPU;
