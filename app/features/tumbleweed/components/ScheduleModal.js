import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {CreateEditModal} from '../../shared/components';
import ScheduleForm from './ScheduleForm';
import {withRouter} from 'react-router';
import {
  modelSelector,
  validationErrorsSelector,
  savingSelector,
} from '../selectors/modals/edit';
import {
  defaultFilePathSelector,
  effectiveTimeZoneSelector,
} from '../selectors/pages/schedules';
import {
  cancelEditTumbleweedSchedule,
  loadTumbleweedSchedules,
  setEditTumbleweedScheduleModelProperty,
  saveTumbleweedSchedule,
} from '../actions';
import scheduleTypeToName from '../services/scheduleTypeToName';

class ScheduleModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setFieldValue(name, value);
  }

  handleSave(event) {
    const {model, saveTumbleweedSchedule, loadTumbleweedSchedules} = this.props;

    event.preventDefault();
    saveTumbleweedSchedule(model)
      .then(() => loadTumbleweedSchedules());
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setFieldValue(id, checked);
  }

  render() {
    const {
      show,
      saving,
      model,
      effectiveTimeZone,
      defaultFilePath,
      validationErrors,
      handleCancel,
    } = this.props;

    const name = `${scheduleTypeToName(model.get('scheduleType'))} Schedule`;
    const form =
      <ScheduleForm
        saving={saving}
        model={model}
        effectiveTimeZone={effectiveTimeZone}
        defaultFilePath={defaultFilePath}
        validationErrors={validationErrors}
        onSubmit={this.handleSave}
        onCheckboxChange={this.handleCheckboxChange}
        onFieldChange={this.handleFieldChange} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        form={form}
        title={name}
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
    effectiveTimeZone: effectiveTimeZoneSelector(state),
    defaultFilePath: defaultFilePathSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    saveTumbleweedSchedule,
    setFieldValue: setEditTumbleweedScheduleModelProperty,
    handleCancel: cancelEditTumbleweedSchedule,
    loadTumbleweedSchedules,
  },
)(ScheduleModal));
