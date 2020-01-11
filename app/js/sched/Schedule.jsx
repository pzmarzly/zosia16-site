import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LectureList from './LectureList'
import DaySchedule from './DaySchedule'
import { initial_lectures, initial_columns } from './data'
import IdGenerator from './IdGenerator'
import Details from './Details'
import styled from 'styled-components'
import TimeForm from './../forms/time_form'
import DateForm from './../forms/date_form'
import { useForm } from '../forms/forms';
import Modal from '../modals/materialize_modal';
import { useModal } from '../modals/modals';


const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 65px auto 300px;
  background: white;
`;

const BottomBar = styled.div`
  padding: 1em;
  grid-column: 2;
  grid-row: 3;
  overflow-x: auto; /* Disable horizontal scroll */
  overflow-y: auto;
`

const TopBar= styled.div`
  padding: 1em;
  grid-column: 1 / 3;
  grid-row: 1;
  background: #2196f3;
  box-shadow: 0 0 5px grey;
`

const SideBar = styled.div`
  grid-column: 1;
  grid-row: 2 / 4;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: auto;
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 80px auto;
`;

const Day = styled.div`
  background: #e0e0e0;
  overflow-y: scroll;
  margin: 1rem;
  grid-row: 2;
  grid-column: ${props => props.day_number + 1};
`;

const Main = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-template-columns: 300px 300px 300px 300px 300px;
  grid-template-rows: 80px auto;
`;

const Title = styled.div`
  grid-row: 1;
  grid-column: ${props => props.day_number + 1};
  transition: color 0.4s;
  &:hover {
    cursor: ${props => props.delete ? "not-allowed" : "auto"};
    color: ${props => props.delete ? "#ff3d00" : "inherit"};
  }
`;

const MaxSize = styled.div`
  height:100%;
`;

const breakIdGenerator = new IdGenerator("BREAK");
const timepickerIdGenerator = new IdGenerator("Timepicker");
const datepickerIdGenerator = new IdGenerator("Datepicker");

const Datepicker = props => {
  const [id, setId] = React.useState(datepickerIdGenerator.getId());
  React.useEffect(() => {
    const elem = document.querySelector('#' + id);
    const instance = M.Datepicker.init(elem, {
      onClose: () => {
        props.onSelect(new Date(instance.toString()));
        console.log(instance.toString());
      },
    });
  });
  return (
    <div className="input-field">
      <input id={id} type="text" className="datepicker"/>
      <label className="active" htmlFor={id}>
        {props.label}
      </label>
    </div>
  )
}

const AddDayModal = props => {
  const submit = () => {
    props.addDay(new Date(formValue));
  }

  const onSelect = () => {

  }

  const [FormInput, formValue, setFormValue] = useForm(DateForm);
  
  return (
    <Modal closeModal={props.closeModal}>
      <div className="modal-content">
        <h4>Add Room</h4>
        <div className="row">
          <FormInput value={formValue} onChange={setFormValue} name="Date"/>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={submit}>
          Add
        </a>
      </div>
    </Modal>
  );
}

// const AddDayModal = React.forwardRef((props, ref) => {
//   const [showed, setShowed] = React.useState(false);
//   const show = () => { setShowed(true); }
//   const hide = () => { setShowed(false); }
//   const onSelect = date => {
//     hide();
//     props.onAddDay(date);
//   }
//   React.useImperativeHandle(ref, () => ({ show: show }) );
  
//   return null
//     // showed ? 
//     //   <Modal onCancel={hide}> 
//     //     <div className="row">
//     //       <h3>
//     //         Add day
//     //       </h3>
//     //     </div>
//     //     <div className="row">
//     //       <div className="col s6">
//     //         <Datepicker onSelect={onSelect}/>
//     //       </div>
//     //     </div>
//     //   </Modal> : ""
// });

const url = () => "http://" + window.location.hostname + ":" + window.location.port
const get = endpoint => 
  fetch(url() + endpoint)
    .then(resp => resp.json())

const get_schedule = id => get("/schedule/schedules/v1/" + id)
const get_events = () => get("/schedule/events/v1")

const Schedule = () => {
  const [schedule, setSchedule] = React.useState({
    lectures: initial_lectures,
    columns: initial_columns,
  });
  const lectures = schedule.lectures;
  const columns = schedule.columns;
  const setLectures = lectures => {
    setSchedule({...schedule, lectures})
  }
  const setColumns = columns => {
    setSchedule({...schedule, columns});
  }
  const [focusedLecture, setFocusedLecture] = React.useState(1);
  const [deleteMode, setDelete] = React.useState(false);
  const [openModal, closeModal] = useModal();

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const schedule_id = url.searchParams.get("schedule_id");
    Promise.all([get_schedule(schedule_id), get_events()])
      .then(([sched, events]) => {
        let allLectureIds = events.map(event => event.pk);
        const newLectures = events.reduce((map, obj) => {
          map[obj.pk] = {
            type: "lecture",
            id: obj.pk,
            title: obj.title,
            name: "Zosia Debeściak", // TODO
            duration: 10,
          }
          return map;
        }, {});
        console.log(sched);
        const newColumns = {};
        sched.days.forEach(day => {
          console.log(day.start);
          const day_start = new Date(Date.parse(day.start));
          newColumns[day.pk.toString()] = {
            id: day.pk.toString(),
            title: day_start.toLocaleDateString(),
            lectures: day.entries.map(entry => entry.event),
            startTime: day_start,
          }
          
          day.entries.forEach(entry => {
            allLectureIds = allLectureIds.filter(id => id != entry.event); 
          });
        });
        newColumns["lec"] = 
        {
          id: "lec",
          title: "Lectures",
          lectures: allLectureIds,
          startTime: Date.now()
        };
        setSchedule({
          lectures: newLectures,
          columns: newColumns,
        })
      });
  }, []);

  const swapInSameColumn = (result, state) => {
    const { source, destination, draggableId } = result;
    if (source.index === destination.index) { return state; }
    const { droppableId } = source;
    const column = columns[droppableId];
    const newLectures = Array.from(column.lectures);

    newLectures.splice(source.index, 1);
    newLectures.splice(destination.index, 0, draggableId);

    return {
      ...columns,
      [column.id]: {
        ...column,
        ["lectures"]: newLectures,
      }
    }
  };

  const deleteSource = (result, state) => {
    const { source, destination, draggableId } = result;
    const { droppableId } = source;
    const column = columns[droppableId];
    const newLectures = Array.from(column.lectures);

    newLectures.splice(source.index, 1);

    return {
      ...columns,
      [column.id]: {
        ...column,
        ["lectures"]: newLectures,
      }
    }
  };

  const swapInOtherColumns = (result, state) => {
    const { source, destination, draggableId } = result;
    let { droppableId, index } = source;
    const sourceColumn = columns[droppableId];
    const sourceColumnLectures = Array.from(sourceColumn.lectures);
    sourceColumnLectures.splice(index, 1);

    droppableId = destination.droppableId;
    index = destination.index;
    const destinationColumn = columns[droppableId];
    const destinationColumnLectures = Array.from(destinationColumn.lectures);
    destinationColumnLectures.splice(index, 0, draggableId);

    return {
      ...columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        ["lectures"]: sourceColumnLectures,
      },
      [destinationColumn.id]: {
        ...destinationColumn,
        ["lectures"]: destinationColumnLectures,
      }
    };
  };

  const swap = (result, state) => {
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId)
    {
      return swapInSameColumn(result, state);
    }
    else
    {
      return swapInOtherColumns(result, state);
    }
  };

  const handleBreaks = (result, state) => {
    const { source, destination, draggableId } = result;
    if ( destination.droppableId === "break"
      || destination.droppableId === "lec")
    {
      return deleteSource(result, state);
    }
    else
    {
      return swap(result, state);
    }
  };

  const newBreakToDestination = (result, state) => {
    const { source, destination, draggableId } = result;
    if (destination.droppableId === "lec") {
      return state;
    }

    const breakId = breakIdGenerator.getId();
    let { droppableId, index } = destination;
    const destinationColumn = columns[droppableId];
    const destinationColumnLectures = Array.from(destinationColumn.lectures);
    destinationColumnLectures.splice(index, 0, breakId);

    setLectures({
      ...lectures,
      [breakId] : {
        type: "break",
        id: breakId,
        duration: 10,
      }
    });

    return {
      ...columns,
      [destinationColumn.id]: {
        ...destinationColumn,
        ["lectures"]: destinationColumnLectures
        }
    };
  }

  const onSetLecture = lecture => {
    if (lecture.id in lectures)
    {
      setLectures({
          ...lectures,
          [lecture.id]: lecture,
      });
    }
  }

  const onFocus = lectureId => {
    setFocusedLecture(lectureId);
  }

  const onDragStart = result => {
  }

  const onBeforeDragStart = result => {
  }

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (draggableId === "break_gen") {
      const newState = newBreakToDestination(result, columns);
      setColumns(newState);
      return;
    }

    const { type } = lectures[draggableId];
    if (type === "break") {
      const newState = handleBreaks(result, columns);
      setColumns(newState);
      return;
    }

    setColumns(swap(result, columns));
  }

  const showAddDayModal = () => openModal(AddDayModal, {closeModal, addDay});

  const addDay = date => {
    setColumns({
      ...columns,
      [date.getTime()] : {
        id: date.getTime(),
        title: date.toLocaleDateString(),
        lectures: [],
        startTime: date,
      }
    })
  }

  const days = Object.keys(columns).filter(id => id != "lec");

  const ToggleButton = props => {
    const [toggle, setToggle] = React.useState("false");

  }

  return (
      <DragDropContext 
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}>
      <Layout>
      <TopBar>
        <div className="row">
          <div className="col">
            <a className="waves-effect waves-light btn">{"SAVE"}</a>
          </div>
          <div className="col">
            <a onClick={showAddDayModal} className="waves-effect waves-light btn">
              <i className="material-icons">add</i>
            </a>
          </div>
          <div className="col">
            <a onClick={() => setDelete(!deleteMode)} className={"waves-effect waves-light btn" + (deleteMode ? " deep-orange accent-3" : "")}>
              <i className="material-icons">delete</i>
            </a>
          </div>
        </div>
      </TopBar>
      <Main>
      {days.map((dayId, i) => (
        <Title day_number={i} key={dayId} delete={deleteMode}>
          <div className="row">
            <div className="col s8"
            onClick={() => 
            {
              if (deleteMode) 
              {
                const newColumns = {
                  ...columns,
                  ["lec"]: {
                    ...columns["lec"],
                    lectures: columns["lec"].lectures.concat(
                      columns[dayId].lectures.filter(id => lectures[id].type != "break"))
                  }
                }
                delete newColumns[dayId];
                setColumns(newColumns);
              }
            }}>
              <div className="section">
                <h4>
                  {columns[dayId].title}
                </h4>
              </div>
            </div>
            <div className="col s4">
              <div className="section">
                {/* <TimeForm
                  label="Start time" 
                  initial_time={columns[dayId].startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  onSelect={(hour, minute) => {
                    const time = columns[dayId].startTime;
                    time.setHours(hour);
                    time.setMinutes(minute);
                    setColumns({
                      ...columns,
                      [dayId] : {
                        ...columns[dayId],
                        startTime: time,
                      }
                    })
                  }}/> */}
              </div>
            </div>
          </div> 
        </Title>
      ))}
      {days.map((dayId, i) => {
        const day = columns[dayId];
        return (
        <Day day_number={i} key={i}>
          <DaySchedule 
            key={day.id}
            allLectures={lectures}
            {...day}
            focus={onFocus}/>
        </Day>
        )
      })}
      </Main>
      <SideBar>
        <Title day_number={0}>
          <div className="row">
            <div className="col s12">
              <div className="section">
                <h4>
                  {"Lectures"}
                </h4>
              </div>
            </div>
          </div> 
        </Title>
        <Day day_number={0}>
          <LectureList 
            key={"lec"}
            {...columns["lec"]}
            allLectures={lectures}
            focus={onFocus}/>
        </Day>
      </SideBar>
      <BottomBar>
        <Details setLecture={onSetLecture} lecture={lectures[focusedLecture]}/>
      </BottomBar>
      </Layout>
      </DragDropContext>
  );
}

export default Schedule;

