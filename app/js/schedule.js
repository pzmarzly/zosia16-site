
import React from 'react';
import { get_schedules, create_schedule, delete_schedule } from "./zosia_api";
import useInterval from "./use_interval";
import { useModal } from "./modals/modals";
import Modal from "./modals/materialize_modal";
import { composeForms, useForm } from "./forms/forms";
import TextForm from "./forms/text_form";
import CheckboxForm from "./forms/checkbox_form";

const ScheduleForm = composeForms({ name: TextForm, is_active: CheckboxForm},
  ([NameInput, IsActiveInput]) => props => {
    const onChange = name => val => {
      props.onChange({...props.value, [name]: val});
    }

    return (
      <div>
        <NameInput name="Name" value={props.value["name"]} onChange={onChange("name")}/>
        <IsActiveInput name="Is active" value={props.value["is_active"]} onChange={onChange("is_active")}/>
      </div>
    )

  }
)

const AddScheduleModal = (props) => {
  const [FormInput, formValue, setValue] = useForm(ScheduleForm);
  const submit = () => {
    create_schedule(formValue);
  }

  return (
    <Modal closeModal={props.closeModal}>
      <div className="modal-content">
        <h4>Add Schedule</h4>
        <div className="row">
          <FormInput name="" value={formValue} onChange={setValue}></FormInput>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={submit}>
          Add
        </a>
      </div>
    </Modal>
  )
}

const DeleteConfirmModal = (props) => {
  const submit = () => {
    delete_schedule(props.schedule.id);
  }

  return (
    <Modal closeModal={props.closeModal}>
      <div className="modal-content">
        <h5>Are you sure you want to delete schedule {props.schedule.name} ?</h5>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-red btn-flat" onClick={submit}>
          Yes
        </a>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          No
        </a>
      </div>
    </Modal>
  )
}

const Schedule = () => {
  const [schedules, setSchedules] = React.useState([]);
  useInterval(() => {
    get_schedules().then(setSchedules);
  }, 1000);

  const [openModal, closeModal] = useModal();

  const addSchedule = () => {
    openModal(AddScheduleModal, {closeModal});
  }

  const deleteSchedule = schedule => () => {
    openModal(DeleteConfirmModal, {closeModal, schedule});
  }

  return (
    <div id="schedule" className="col s12">
      <ul className="collection">
        {schedules.map((schedule) => 
          <li key={schedule.id} className="collection-item"> 
            <a href={"/schedule/planner?schedule_id=" + schedule.id} target="_blank">
              {schedule.name}
              <i
                className="material-icons orange-text text-accent-2" 
                style={{
                  "verticalAlign": "bottom",
                  "marginLeft": "0.2em"
                }}
              > open_in_new </i>
            </a>
            <a 
              href="#!" 
              className="secondary-content deep-orange-text text-accent-3"
              onClick={deleteSchedule(schedule)}
            >
              <i className="material-icons">delete</i>
             </a>
          </li>)}
        <a href="javascript:void(0)" className="collection-item" onClick={addSchedule}>Add schedule</a>
      </ul>
    </div>
  );
}

export default Schedule;
