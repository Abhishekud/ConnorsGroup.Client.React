import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import {
  cancelConfirmResumeExport,
  resumeTumbleweedSchedule,
  loadTumbleweedSchedules,
} from '../actions';
import {
  showSelector,
  scheduleSelector,
} from '../selectors/modals/confirmResume';
import scheduleTypeToName from '../services/scheduleTypeToName';

class ConfirmResumeExportSchedule extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {resumeTumbleweedSchedule, schedule, loadTumbleweedSchedules} = this.props;
    resumeTumbleweedSchedule(schedule.get('scheduleType'))
      .then(() => loadTumbleweedSchedules());
  }

  render() {
    const {show, schedule, cancelConfirmResumeExport} = this.props;

    const name = scheduleTypeToName(schedule.get('scheduleType'));
    const message = <span>Are you sure you wish to resume the exporting scheduled for {name}. Your next export would occur on {schedule.get('nextOccurrenceSansSkip')} </span>;

    return (
      <ConfirmModal
        show={show}
        message={message}
        confirmButtonStyle="danger"
        buttonText="Resume Schedule"
        onCancel={cancelConfirmResumeExport}
        processing={false}
        onConfirm={this.handleConfirm} />
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
    cancelConfirmResumeExport,
    resumeTumbleweedSchedule,
    loadTumbleweedSchedules,
  }
)(ConfirmResumeExportSchedule);
