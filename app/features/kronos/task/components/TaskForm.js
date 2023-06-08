import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  TextInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
  Select,
} from '../../../forms/components';

import {
  KRONOS_TIME_DEPENDENCY_SELECT_OPTIONS,
  KRONOS_TIME_DEPENDENCY_ENUM_INDEX,
} from '../../constants/KronosTimeDependencies';

function getTaskGroupsSelectOptions(taskGroupsList) {
  return taskGroupsList.map(taskGroup => ({value: taskGroup.get('id'), label: taskGroup.get('name')})).valueSeq().toArray();
}

class TaskForm extends PureComponent {
  render() {
    const {
      primaryInputRef,
      onFieldChange,

      model,
      onSubmit,
      formValidationErrors,

      taskGroupsList,
      isWfd,
      disabled,
    } = this.props;
    const displayCombinedDistribution = parseInt(model.get('timeDependency'), 10) === KRONOS_TIME_DEPENDENCY_ENUM_INDEX.TIME_DEPENDENT;
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <TextInput id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
          <TextInput id="genericDepartment"
            label="Generic Department"
            onChange={onFieldChange}
            value={model.get('genericDepartment')}
            formValidationErrors={formValidationErrors} />
          <Select id="timeDependency"
            label="Time Dependency/Labor Allocation"
            value={model.get('timeDependency')}
            onChange={onFieldChange}
            options={KRONOS_TIME_DEPENDENCY_SELECT_OPTIONS}
            formValidationErrors={formValidationErrors} />
          {displayCombinedDistribution &&
            <TextInput id="combinedDistribution"
              label="Combined Distribution"
              onChange={onFieldChange}
              value={model.get('combinedDistribution')}
              formValidationErrors={formValidationErrors} />
          }
          {displayCombinedDistribution && isWfd &&
            <div className="wfd-warning">WFD Integrations do not currently support Combined Distribution, however the value will be stored.</div>
          }
          <hr />
          <Select id="taskGroups" label="Task Groups"
            multiple value={(model.get('taskGroups') ? model.get('taskGroups').valueSeq().toArray() : [])} options={taskGroupsList ? getTaskGroupsSelectOptions(taskGroupsList) : []}
            onChange={onFieldChange}
            formValidationErrors={formValidationErrors} />
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

TaskForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,

  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(TaskForm);
