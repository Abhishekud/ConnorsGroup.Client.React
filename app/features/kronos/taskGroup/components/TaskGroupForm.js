import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {
  TextInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
  CheckBox,
  Select,
} from '../../../forms/components';
import {
  KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX,
  KRONOS_LABOR_HOUR_ALLOCATION_SELECT_OPTIONS,
} from '../../constants/LaborHourAllocations';

function getMinuteSelectOptions(max) {
  const ret = [
    {label: 'Minutes', value: ''},
  ];
  for (let i = 0; i <= max; i += 15) {
    ret.push({value: i, label: `${i}`});
  }
  return ret;
}

function LaborBreaks({model, formValidationErrors, onChange, onCheckboxChange}) {
  return (
    <Fragment>
      <CheckBox
        id="skipBreaksInLabor"
        checked={model.get('skipBreaksInLabor') || false}
        onChange={onCheckboxChange}
        label="Skip Breaks in Labor"
        formValidationErrors={formValidationErrors} />
      {model.get('skipBreaksInLabor') === true &&
        <Select id="maximumBreakDuration"
          label="Maximum Break Duration"
          value={model.get('maximumBreakDuration')}
          onChange={onChange}
          options={getMinuteSelectOptions(120)}
          formValidationErrors={formValidationErrors} />
      }
      {model.get('skipBreaksInLabor') === true &&
        <Select id="breakPlacementWindow"
          label="Break Placement Window"
          value={model.get('breakPlacementWindow')}
          onChange={onChange}
          options={getMinuteSelectOptions(360)}
          formValidationErrors={formValidationErrors} />
      }
    </Fragment>
  );
}

class TaskGroupForm extends PureComponent {

  render() {
    const {
      primaryInputRef,
      onFieldChange,

      model,
      onSubmit,
      formValidationErrors,

      onCheckboxChange,
      isWfd,
      disabled,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <TextInput id="name"
            inputRef={primaryInputRef} label="Name" onChange={onFieldChange}
            value={model.get('name')} formValidationErrors={formValidationErrors} />
          <TextInput id="genericDepartment"
            label="Generic Department"
            onChange={onFieldChange}
            value={model.get('genericDepartment')}
            formValidationErrors={formValidationErrors} />
          <TextInput id="combinedDistribution"
            label="Combined Distribution"
            onChange={onFieldChange}
            value={model.get('combinedDistribution')}
            formValidationErrors={formValidationErrors} />
          {isWfd && <div className="wfd-warning">WFD Integrations do not currently support Combined Distribution, however the value will be stored.</div>}
          <Select id="allocateLaborHours"
            label="Allocate Labor Hours"
            value={model.get('allocateLaborHours')}
            onChange={onFieldChange}
            options={KRONOS_LABOR_HOUR_ALLOCATION_SELECT_OPTIONS}
            formValidationErrors={formValidationErrors} />
          {(parseInt(model.get('allocateLaborHours'), 10) === KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.START ||
            parseInt(model.get('allocateLaborHours'), 10) === KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.END) &&
            <LaborBreaks model={model} onChange={onFieldChange}
              onCheckboxChange={onCheckboxChange} formValidationErrors={formValidationErrors} />}
          <hr />
          <TextInput id="jobName"
            label="Job Name" onChange={onFieldChange}
            value={model.get('jobName')} formValidationErrors={formValidationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

TaskGroupForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,

  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.boolean,
};

export default withAutoFocusOnEdit()(TaskGroupForm);
