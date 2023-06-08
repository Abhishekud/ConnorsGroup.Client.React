import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {CreateEditModal} from '../../shared/components';
import SkipScheduleForm from './SkipScheduleForm';
import {withRouter} from 'react-router';
import {
  modelSelector,
  scheduleSelector,
  validationErrorsSelector,
  savingSelector,
} from '../selectors/modals/skip';
import {
  cancelSkipTumbleweedExport,
  loadTumbleweedSchedules,
  setSkipTumbleweedExportModelProperty,
  saveSkipTumbleweedExport,
} from '../actions';
import scheduleTypeToName from '../services/scheduleTypeToName';
import moment from 'moment';

class SkipScheduleModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setFieldValue(name, value);
  }

  handleSave(event) {
    const {model, saveSkipTumbleweedExport, loadTumbleweedSchedules} = this.props;

    event.preventDefault();
    const schedule = model.toJS();
    const offset = new Date().getTimezoneOffset();
    const result = {
      ...schedule,
      pauseFrom: schedule.pauseFrom ? moment(schedule.pauseFrom).add(-offset, 'minutes') : schedule.pauseFrom,
      pauseUntil: schedule.pauseUntil ? moment(schedule.pauseUntil).add(-offset, 'minutes') : schedule.pauseUntil,
    };
    saveSkipTumbleweedExport(result)
      .then(() => loadTumbleweedSchedules());
  }

  handlePauseFromChanged(date) {
    this.props.setFieldValue('pauseFrom', date);
  }

  handlePauseUntilChanged(date) {
    this.props.setFieldValue('pauseUntil', date);
  }

  render() {
    const {
      show,
      saving,
      model,
      schedule,
      effectiveTimeZone,
      validationErrors,
      handleCancel,
    } = this.props;

    const form =
      <SkipScheduleForm
        saving={saving}
        model={model}
        schedule={schedule}
        effectiveTimeZone={effectiveTimeZone}
        validationErrors={validationErrors}
        onSubmit={this.handleSave}
        onPauseFromChanged={this.handlePauseFromChanged}
        onPauseUntilChanged={this.handlePauseUntilChanged} />;

    const name = scheduleTypeToName(schedule.get('scheduleType'));

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        form={form}
        title={`Skip ${name}`}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    saving: savingSelector(state),
    schedule: scheduleSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    saveSkipTumbleweedExport,
    setFieldValue: setSkipTumbleweedExportModelProperty,
    handleCancel: cancelSkipTumbleweedExport,
    loadTumbleweedSchedules,
  },
)(SkipScheduleModal));
