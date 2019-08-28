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
      {...provided.dragHandleProps}
      >
      <Duration >
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
      <Droppable droppableId={this.props.id} type="PERSON">
          {(provided, snapshot) => { 
            const time = new Date(this.props.startTime);
            return (
              <EntryContainer 
              ref={provided.innerRef} 
              {...provided.droppableProps}>
              {this.props.lectures.map(
                (lectureId, i) => this.element(lectureId, i, time))}
              {provided.placeholder}
              </EntryContainer>)
          }}			
      </Droppable>
      );
  }
}

export default DaySchedule;

