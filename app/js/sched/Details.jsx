
import React from 'react';



const Details = (props) => {
  const {lecture, setLecture} = props;
  const onDurationChange = ev => {
    let newDuration = parseInt(ev.target.value);
    if (!Number.isInteger(newDuration)) {
      if (ev.target.value === "") {
        newDuration = 0;
      }
      else {
        newDuration = duration;
      }
    }
    setLecture({
      ...lecture,
      duration: newDuration,
    });
  }
  if (lecture == undefined) {
    return null;
  }
  const {type} = lecture;
  let content = "";
  if (type === "lecture") {
    const {title, name, duration} = lecture;
    content = (
      <div className="row">
        <div className="input-field col s6">
          <input disabled value={title} id="title" type="text" className="validate valid"/>
          <label className="active" htmlFor="title">Title</label>
        </div>
        <div className="input-field col s6">
          <input disabled value={name} id="speaker" type="text" className="validate valid"/>
          <label className="active" htmlFor="speaker">Speaker</label>
        </div>
        <div className="input-field col s3">
          <input value={duration} id="duration" type="number" onChange={onDurationChange} className="validate valid"/>
          <label className="active" htmlFor="duration">Duration(min.)</label>
        </div>
      </div>)
  }
  else if (type === "break")
  {
    const {duration} = lecture;
    content = (
      <div className="row">
        <div className="input-field">
          <input value={duration} id="duration" type="number" onChange={onDurationChange} className="validate valid"/>
          <label className="active" htmlFor="duration">Duration(min.)</label>
        </div>
      </div>)
  }
  else
    content = JSON.stringify(props.lecture, null, 2)
  return (
    <div>
      <h4> Details </h4>
      {content}
    </div>
  )
}

export default Details;

