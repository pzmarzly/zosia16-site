
import React from 'react';
import IdGenerator from './../sched/IdGenerator';
import { form } from './forms';

const dateinputIdGenerator = new IdGenerator("date_input");

const DateForm = form("", (props) => {
  const id = dateinputIdGenerator.getId();
  const onChange = e => {
    props.onChange(e.target.value);
  }
  React.useEffect(() => {
    M.updateTextFields();
  }, []);
  return (
  <div className="input-field">
    <input id={id} value={props.value} type="date" onChange={onChange}/>
    <label className="active" htmlFor={id}>{props.name}</label>
  </div>
  )
});

export default DateForm;