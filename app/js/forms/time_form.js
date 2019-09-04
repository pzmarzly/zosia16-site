
import React from 'react';
import IdGenerator from './../sched/IdGenerator';
import { form } from './forms';

const timeinputIdGenerator = new IdGenerator("time_input");

const TimeForm = form("", (props) => {
  const id = timeinputIdGenerator.getId();
  const onChange = e => {
    props.onChange(e.target.value);
  }
  React.useEffect(() => {
    M.updateTextFields();
  }, []);
  return (
  <div className="input-field">
    <input id={id} value={props.value} type="time"/>
    <label className="active" htmlFor={id}>{props.name}</label>
  </div>
  )
});

export default TimeForm;
