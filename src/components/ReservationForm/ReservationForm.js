import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import styles from './ReservationForm.module.css';
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';
import { addActions } from "../../redux/ActionsRedux";
import { useEffect } from 'react';
import { addOptions } from '../../redux/OptionsRedux';

const Select = (props) => {
  const { id } = props
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = useSelector(state => state.options);

  const [status, setStatus] = useState(props.status);
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount);
  const [bill, setBill] = useState(props.bill);

  const fetchOptions = () => {
    return fetch('http://localhost:3131/api/options')
      .then(res => res.json())
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchOptions()
      .then(options => {
        dispatch(addOptions(options))
      })
      .catch(err => console.error(err));
  }, [dispatch]);


  function putData(url = "", data = {}) {
    return fetch(url, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(
        data
      ),
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

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

  const handleChange = (event, min, max, id) => {

    let valueAmount = event.target.value;
    if (+valueAmount < min) {
      valueAmount = min
    } else if (+valueAmount > max) {
      valueAmount = max
    }

    if (id === 'amount' && valueAmount > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
      return
    }

    if (id === 'amount') {
      setPeopleAmount(valueAmount);
    } else if (id === 'maxAmount') {
      setMaxPeopleAmount(valueAmount);
    } else if (id === 'bill') {
      setBill(valueAmount)
    }

  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addActions({ status: status, id, bill, peopleAmount, maxPeopleAmount }))
    putData(`http://localhost:3131/api/tables/${id}`, {
      id,
      status: status,
      peopleAmount: Number(peopleAmount),
      maxPeopleAmount: Number(maxPeopleAmount),
      bill: Number(bill)
    })
      .then(() => {
        navigate('/');
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>

        <label className={styles.status}>
          Status:
          <select value={status} onChange={handleSelect}>
            {options?.map((option) => (
              <option value={option.label}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className={styles.people}>
          People:
          <input className={styles.input} type='number' value={peopleAmount} onChange={event => handleChange(event, 1, 10, 'amount')} min='0' max='10' />
          <span>/</span>
          <input type='number' value={maxPeopleAmount} onChange={event => handleChange(event, 1, 10, 'maxAmount')} />
        </label>
        <label className={clsx(styles.showBill, status !== 'Busy' && styles.bill)}>
          Bill:
          <input type='number' value={bill} onChange={event => handleChange(event, 1, 10000, 'bill')} />
        </label>
      </div>
      <Button type='submit'>Update</Button>
    </form>
  );
};

export default Select;


