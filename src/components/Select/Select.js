import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import styles from './Select.module.css';
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';

const Select = (props) => {
  const { id } = props
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = useSelector(state => state.options);

  const [value, setValue] = useState(props.status);
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount);
  const [bill, setBill] = useState(props.bill);

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


  const handleChange = (event, min, max, id) => {
    let value = event.target.value;
    if (+value < min) {
      value = min
    } else if (+value > max) {
      value = max
    }

    if (id === 'amount' && value > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
      return
    }
    if (id === 'amount') {
      setPeopleAmount(value);
    } else if (id === 'maxAmount') {
      setMaxPeopleAmount(value);
    } else if (id === 'bill') {
      setBill(value)
    }
  };

  console.log(peopleAmount)
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_SELECT', payload: { status: value, id, bill, peopleAmount, maxPeopleAmount } });
    putData(`http://localhost:3131/api/tables/${id}`, {
      id,
      status: value,
      peopleAmount: Number(peopleAmount),
      maxPeopleAmount: Number(maxPeopleAmount),
      bill: Number(bill)
    })
      .then((data) => {
        console.log('data', data);
        navigate('/');
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <label className={styles.status}>
          Status:
          <select value={value} onChange={e => setValue(e.target.value)}>
            {options.map((option) => (
              <option value={option.label}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className={styles.people}>
          People:
          <input type='number' value={peopleAmount} onChange={event => handleChange(event, 0, 10, 'amount')} min='0' max='10' />
          <span>/</span>
          <input type='number' value={maxPeopleAmount} onChange={event => handleChange(event, 1, 10, 'maxAmount')} />
        </label>
        <label className={clsx(styles.showBill, value !== 'Busy' && styles.bill)}>
          Bill:
          <input
            type='number' value={bill} onChange={event => handleChange(event, 1, 10000, 'bill')} />
        </label>
      </div>
      <Button type='submit'>Update</Button>
    </form>
  );
};

export default Select;