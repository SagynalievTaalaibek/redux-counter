import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../app/store';
import { selectFetchCounterLoading } from '../../store/counterSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../Spinner/Spinner';
import {
  decreaseCounter,
  decreaseCounterByFive,
  fetchCounter,
  increaseCounter,
  increaseCounterByFive,
} from '../../store/counterThunks';


const Counter = () => {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectFetchCounterLoading);

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  const onIncrement = async () => {
    await dispatch(increaseCounter());
    await dispatch(fetchCounter());
  };

  const onDecrement = async () => {
    await dispatch(decreaseCounter());
    await dispatch(fetchCounter());
  };

  const onIncreaseByFive = async () => {
    await dispatch(increaseCounterByFive());
    await dispatch(fetchCounter());
  };

  const onDecreaseByFive = async () => {
    await dispatch(decreaseCounterByFive());
    await dispatch(fetchCounter());
  };

  return (
    <div>
      <h1>{fetchLoading ? <Spinner /> : counterValue}</h1>
      <button className="btn btn-primary me-2" onClick={onIncrement}>Increase</button>
      <button className="btn btn-danger me-2" onClick={onDecrement}>Decrease</button>
      <button className="btn btn-primary me-2" onClick={onIncreaseByFive}>Increase by 5</button>
      <button className="btn btn-danger me-2" onClick={onDecreaseByFive}>Decrease by 5</button>
    </div>
  );
};

export default Counter;