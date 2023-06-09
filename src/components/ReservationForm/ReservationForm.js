import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import styles from './ReservationForm.module.css';
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';
import { putData } from "../../redux/TablesRedux";
import { useEffect } from 'react';
import { fetchOptions } from "../../redux/OptionsRedux";

const ReservationForm = (props) => {
  const { id } = props
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = useSelector(state => state.options);

  const [status, setStatus] = useState(props.status);
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount);
  const [bill, setBill] = useState(props.bill);


  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  const handleSelect = (event) => {
    let value = event.target.value;
    setStatus(value);
    if (value === 'Free' || value === 'Cleaning') {
      setPeopleAmount(0)
    }
    if (value !== 'Busy') {
      setBill(0);
    }
  }

  const valideMinMaxNumber = (value, min, max) => {

    if (value < min) {
      return min
    } else if (value > max) {
      return max
    }
    return value
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    await dispatch(putData({
      id,
      status: status,
      peopleAmount: Number(peopleAmount),
      maxPeopleAmount: Number(maxPeopleAmount),
      bill: Number(bill)
    }))

    navigate('/');

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.WrapperForm}>
          <label className={styles.status} htmlFor='status-select'>
            Status:
          </label>
          <select value={status} onChange={handleSelect} id='status-select'>
            {options?.map((option) => (
              <option key={option.label} value={option.label}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.WrapperForm}>
          <label className={styles.people} htmlFor='status-people'>
            People:
          </label>
          <input className={styles.input} type='number' value={peopleAmount} onChange={event => setPeopleAmount(valideMinMaxNumber(Number(event.target.value), 1, maxPeopleAmount))} min='0' max='10' />
          <span className={styles.span}>/</span>
          <input type='number' value={maxPeopleAmount} onChange={event => setMaxPeopleAmount(valideMinMaxNumber(Number(event.target.value), 1, 10))} />

        </div>
        {status === 'Busy' && (
          <div className={styles.WrapperForm}>
            <label className={clsx(styles.showBill)} htmlFor='status-bill'>
              Bill:
            </label>
            <input type='number' value={bill} onChange={event => setBill(valideMinMaxNumber(Number(event.target.value), 1, 10000))} id='status-bill' />
          </div>
        )}

      </div>
      <Button className={styles.btnUpdate} type='submit'>Update</Button>
    </form>
  );
};

export default ReservationForm;


