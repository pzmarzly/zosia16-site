import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LectureList from './LectureList'
import DaySchedule from './DaySchedule'
import { initial_lectures, initial_columns } from './data'
import IdGenerator from './IdGenerator'
import Details from './Details'
import styled from 'styled-components'

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 300px 300px 300px 300px auto;
  grid-template-rows: 65px auto 300px;
  background: white;
`;

const BottomBar = styled.div`
  padding: 1em;
  grid-column: 2 / 6;
  grid-row: 3;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: auto;
`

const TopBar= styled.div`
  padding: 1em;
  grid-column: 1 / 6;
  grid-row: 1;
  background: #2196f3;
  box-shadow: 0 0 5px grey;
`

const SideBar = styled.div`
  padding: 0 1em;
  grid-column: 1;
  grid-row: 2 / 4;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: auto;
`;

const Day = styled.div`
  padding: 0 1em;
  overflow-y: auto;
  overflow-x: hidden; /* Disable horizontal scroll */
  grid-row: 2;
  grid-column: ${props => props.day_number + 2};
`;

const MaxSize = styled.div`
  height:100%;
`;

const DayView = styled.div`

`;

class Schedule extends React.Component {
  breakIdGenerator = new IdGenerator("BREAK");
  state = {
    allLectures: initial_lectures,
    columns: initial_columns,
    focusedLectureId: "1",
  };

  swapInSameColumn = (result, state) => {
    const { source, destination, draggableId } = result;
    if (source.index === destination.index) { return state; }
    const { droppableId } = source;
    const column = state.columns[droppableId];
    const newLectureIds = Array.from(column.lectureIds);

    newLectureIds.splice(source.index, 1);
    newLectureIds.splice(destination.index, 0, draggableId);

    return {
      ...this.state,
      columns: {
        ...state.columns,
        [column.id]: {
          ...column,
          ["lectureIds"]: newLectureIds,
        }
      }
    }
  };

  deleteSource = (result, state) => {
    const { source, destination, draggableId } = result;
    const { droppableId } = source;
    const column = this.state.columns[droppableId];
    const newLectureIds = Array.from(column.lectureIds);

    newLectureIds.splice(source.index, 1);

    return {
      ...this.state,
      columns: {
        ...this.state.columns,
        [column.id]: {
          ...column,
          ["lectureIds"]: newLectureIds,
        }
      }
    }
  };

  swapInOtherColumns = (result, state) => {
    const { source, destination, draggableId } = result;
    let { droppableId, index } = source;
    const sourceColumn = this.state.columns[droppableId];
    const sourceColumnIds = Array.from(sourceColumn.lectureIds);
    sourceColumnIds.splice(index, 1);

    droppableId = destination.droppableId;
    index = destination.index;
    const destinationColumn = this.state.columns[droppableId];
    const destinationColumnIds = Array.from(destinationColumn.lectureIds);
    destinationColumnIds.splice(index, 0, draggableId);

    return {
      ...this.state,
      columns: {
        ...this.state.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          ["lectureIds"]: sourceColumnIds,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          ["lectureIds"]: destinationColumnIds
        }
      }
    };
  };

  swap = (result, state) => {
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId)
    {
      return this.swapInSameColumn(result, state);
    }
    else
    {
      return this.swapInOtherColumns(result, state);
    }
  };

  handleBreaks = (result, state) => {
    const { source, destination, draggableId } = result;
    if ( destination.droppableId === "break"
      || destination.droppableId === "lec")
    {
      return this.deleteSource(result, state);
    }
    else
    {
      return this.swap(result, state);
    }
  };

  newBreakToDestination = (result, state) => {
    const { source, destination, draggableId } = result;
    if (destination.droppableId === "lec") {
      return state;
    }

    const breakId = this.breakIdGenerator.getId();
    let { droppableId, index } = destination;
    const destinationColumn = this.state.columns[droppableId];
    const destinationColumnIds = Array.from(destinationColumn.lectureIds);
    destinationColumnIds.splice(index, 0, breakId);

    return {
      ...this.state,
      allLectures: {
        ...this.state.allLectures,
        [breakId] : {
          type: "break",
          id: breakId,
          duration: 10,
        }
      },
      columns: {
        ...this.state.columns,
        [destinationColumn.id]: {
          ...destinationColumn,
          ["lectureIds"]: destinationColumnIds
        }
      }
    };
  }

  onSetLecture = lecture => {
    if (lecture.id in this.state.allLectures)
    {
      this.setState({
        ...this.state,
        allLectures: {
          ...this.state.allLectures,
          [lecture.id]: lecture,
        }
      });
    }
  }

  onFocus = lectureId => {
    this.setState({
      ...this.state,
      focusedLectureId: lectureId,
    });
  }

  onDragStart = result => {
  }

  onBeforeDragStart = result => {
  }

  onDragEnd = result => {
    const { source, destination, draggableId } = result;

  }

  onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (draggableId === "break_gen") {
      const newState = this.newBreakToDestination(result, this.state);
      this.setState(newState);
      return;
    }

    const { type } = this.state.allLectures[draggableId];
    if (type === "break") {
      const newState = this.handleBreaks(result, this.state);
      this.setState(newState);
      return;
    }

    this.setState(this.swap(result, this.state));
  }

  exportSchedule = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state, null, 2)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "schedule.json";
    element.click();
  }


  render() {
    const lectures = this.state.columns["lec"];
    const days = ["thu", "fri", "sat"];

    return (
        <DragDropContext 
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onBeforeDragStart={this.onBeforeDragStart}>
        <Layout>
        <TopBar>
          <div className="row">
            <div className="col s4">
              <a className="waves-effect waves-light btn">{"<"}</a>
              <a className="waves-effect waves-light btn">{">"}</a>
            </div>
          </div>
        </TopBar>
        {/* <Main>
          <div className="row">
            <div className="col s12">
              <div className="section">
                <DaySchedule 
                  key={this.state.columns["thu"].id}
                  allLectures={this.state.allLectures}
                  {...this.state.columns["thu"]}
                  focus={this.onFocus}/>
              </div>
            </div>
          </div>
        </Main> */}
        {days.map((dayId, i) => {
          const day = this.state.columns[dayId];
          return (
          <Day day_number={i}>
            <div className="row">
              <div className="col s12">
                <div className="section">
                  <DaySchedule 
                    key={day.id}
                    allLectures={this.state.allLectures}
                    {...day}
                    focus={this.onFocus}/>
                </div>
              </div>
            </div>
          </Day>
          )
        })}
        <SideBar>
          <div className="row">
            <div className="col s12">
              <div className="section">
                <LectureList 
                  key={"lec"}
                  {...lectures}
                  allLectures={this.state.allLectures}
                  focus={this.onFocus}/>
              </div>
            </div>
          </div>
        </SideBar>
        <BottomBar>
            <Details setLecture={this.onSetLecture} lecture={this.state.allLectures[this.state.focusedLectureId]}/>
        </BottomBar>
        </Layout>
        </DragDropContext>
    );
  }
}

export default Schedule;

