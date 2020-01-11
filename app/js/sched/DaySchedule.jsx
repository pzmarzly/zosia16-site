import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { showTime } from './Helpers';
import AccessTime from './AccessTime';
import Break from './Break';
import { 
  Time,
  DurTime,
  Entry, 
  ColumnContainer,
  EntryContainer,
  Duration,
  Details,
} from './StyledElelements';

const ScheduleLecture = (props) => {
  const { lecture, index, startTime, endTime} = props
  return (
    <Draggable draggableId={lecture.id} index={index}>
    {(provided, snapshot) => (
      <Entry
      ref={provided.innerRef}
      {...provided.draggableProps}
      >
      <Duration {...provided.dragHandleProps}>
        <Time> {showTime(startTime)} </Time>
        <DurTime> {lecture.duration} </DurTime>
        <Time> {showTime(endTime)} </Time>
      </Duration>
      <Details onClick={() => props.focus(lecture.id)}>
        <div> {lecture.title} </div>
      </Details>
      </Entry>
    )}
    </Draggable>
  )
}
class DaySchedule extends React.Component
{
  element (lectureId, i, time) {
    const lecture = this.props.allLectures[lectureId];
    const startTime = new Date(time);
    time.setMinutes(time.getMinutes() + lecture.duration);
    const endTime = new Date(time);
    if (lecture.type === "lecture")
    {
      return (
        <ScheduleLecture 
        key={lectureId}
        focus={this.props.focus}
        lecture={lecture} 
        index={i}
        startTime={startTime}
        endTime={endTime}
        />);
    }
    else 
    {
      return (<Break focus={this.props.focus} key={lectureId} lecture={lecture} index={i}/>);	
    }
  }
  /* eslint-disable no-unused-expressions */
  render ()
  {
    return (
      <ColumnContainer>
      <div><h4>{this.props.title}</h4></div>
      <Droppable droppableId={this.props.id} type="PERSON">
      {(provided, snapshot) => { 
        const time = new Date(this.props.startTime);
        return (
          <EntryContainer 
          ref={provided.innerRef} 
          {...provided.droppableProps}>
          {this.props.lectureIds.map(
            (lectureId, i) => this.element(lectureId, i, time))}
          {provided.placeholder}
          </EntryContainer>)
      }}			
      </Droppable>
      </ColumnContainer>);
  }
}

export default DaySchedule;

