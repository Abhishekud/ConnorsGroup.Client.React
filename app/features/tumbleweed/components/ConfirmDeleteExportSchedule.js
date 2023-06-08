import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import {
  cancelDeleteTumbleweedSchedule,
  deleteTumbleweedSchedule,
  loadTumbleweedSchedules,
} from '../actions';
import {
  showSelector,
  scheduleSelector,
} from '../selectors/modals/delete';
import scheduleTypeToName from '../services/scheduleTypeToName';

class ConfirmDeleteExportSchedule extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleDelete() {
    const {deleteTumbleweedSchedule, schedule, loadTumbleweedSchedules} = this.props;
    deleteTumbleweedSchedule(schedule.get('scheduleType'))
      .then(() => loadTumbleweedSchedules());
  }

  render() {
    const {show, schedule, cancelDeleteTumbleweedSchedule} = this.props;

    const name = scheduleTypeToName(schedule.get('scheduleType'));
    const message = <span>Are you sure you wish to delete the {name} schedule?</span>;

    return (
      <ConfirmModal
        show={show}
        message={message}
        confirmButtonStyle="danger"
        buttonText="Delete"
        onCancel={cancelDeleteTumbleweedSchedule}
        processing={false}
        onConfirm={this.handleDelete} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    schedule: scheduleSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    cancelDeleteTumbleweedSchedule,
    deleteTumbleweedSchedule,
    loadTumbleweedSchedules,
  }
)(ConfirmDeleteExportSchedule);
