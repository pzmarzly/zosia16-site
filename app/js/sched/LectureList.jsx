
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AccessTime from './AccessTime'
import Break from './Break'
import { 
  Entry,
  DurTime,
  ColumnContainer,
  EntryContainer,
  Duration,
  Details
} from './StyledElelements';

const BreakGenerator = () => {
  return (
    <Draggable draggableId={"break_gen"} index={0}>
    {(provided, snapshot) => (
      <Entry 
      ref={provided.innerRef} 
      {...provided.dragHandleProps} 
      {...provided.draggableProps} 
      >
      <div> Drag for 10 minute break </div>
      </Entry>
    )}
    </Draggable>
  )
}

const Lecture = (props) =>
{
  const { lecture, index } = props;
  return (
    <Draggable draggableId={lecture.id} index={index}>
    {(provided, snapshot) => (
      <Entry
      ref={provided.innerRef}
      {...provided.draggableProps}
      >
      <Duration {...provided.dragHandleProps}> 
        <DurTime> {lecture.duration} </DurTime>
      </Duration>
      <Details onClick={() => props.focus(lecture.id)}>
      <div> {lecture.title} </div>
      </Details>
      </Entry>
    )}
    </Draggable>
  )
}

class LectureList extends React.Component {

  getLecture(lectureId) {
    return this.props.allLectures[lectureId];
  }

  element(lectureId, i) {
    const lecture = this.getLecture(lectureId);
    if (lecture.type === "lecture")
    {
      return (<Lecture focus={this.props.focus} key={lectureId} lecture={lecture} index={i}/>);
    }
    else if (lecture.type === "break")
    {
      return (<Break focus={this.props.focus} key={lectureId} lecture={lecture} index={i}/>);
    }
    else
    {
      console.log("Error unhandled type");	
    }
  }

  /* eslint-disable no-unused-expressions */
  render() {

    return (
      <ColumnContainer>
      <div><h4>{this.props.title}</h4></div>
      <Droppable droppableId={this.props.id} type="PERSON">	
      {(provided, snapshot) => (
        <EntryContainer 
        ref={provided.innerRef} 
        {...provided.droppableProps}
        >
        <BreakGenerator/>
        {this.props.lectureIds.map(
          (lectureId, i) => this.element(lectureId, i)
        )}
        {provided.placeholder}
        </EntryContainer>
      )}			
      </Droppable>
      </ColumnContainer>);	
  }
}

export default LectureList;

