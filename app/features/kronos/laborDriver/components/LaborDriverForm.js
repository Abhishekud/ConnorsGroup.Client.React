import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX, KRONOS_LABOR_DRIVER_TYPE_SELECT_OPTIONS} from '../../constants/KronosLaborDriverTypes';
import {KRONOS_INTERVAL_TYPE_SELECT_OPTIONS} from '../../constants/KronosIntervalTypes';
import {
  Select,
  TextInput,
  NumericInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
} from '../../../forms/components';

function VolumeDriver({model, formValidationErrors, onChange}) {
  return (
    <Fragment>
      <NumericInput id="number" label="Number" onChange={onChange} value={model.get('number')} formValidationErrors={formValidationErrors} min={0} />
      <NumericInput id="lookBackCount" label="Number of business days to look back for volume"
        onChange={onChange} value={model.get('lookBackCount')}
        formValidationErrors={formValidationErrors} min={0} max={3} />
      <TextInput id="driver" label="Driver" onChange={onChange} value={model.get('driver')} formValidationErrors={formValidationErrors} />
      <TextInput id="genericCategory" label="Generic Category" onChange={onChange} value={model.get('genericCategory')} formValidationErrors={formValidationErrors} />
    </Fragment>
  );
}

function CustomDriver({model, formValidationErrors, onChange}) {
  return (
    <Fragment>
      <NumericInput id="number" label="Number" onChange={onChange} value={model.get('number')} formValidationErrors={formValidationErrors} min={0} />
      <NumericInput id="lookBackCount" label="Number of calendar days to look back for volume"
        onChange={onChange} value={model.get('lookBackCount')}
        formValidationErrors={formValidationErrors} min={0} max={7} />
      <TextInput id="driver" label="Driver" onChange={onChange} value={model.get('driver')} formValidationErrors={formValidationErrors} />
    </Fragment>
  );
}

function FixedFrequency({model, formValidationErrors, onChange}) {
  return (
    <Fragment>
      <NumericInput id="numberPerInterval" label="Number of Times" onChange={onChange}
        value={model.get('numberPerInterval')} formValidationErrors={formValidationErrors} min={0} />
      <Select id="interval" label="Per Interval" onChange={onChange} value={model.get('interval')} options={KRONOS_INTERVAL_TYPE_SELECT_OPTIONS} formValidationErrors={formValidationErrors} />
    </Fragment>
  );
}

function FixedFrequencyDailyVolume({model, formValidationErrors, onChange}) {
  return (
    <Fragment>
      <NumericInput id="numberPerInterval" label="Number of Times per Week" onChange={onChange}
        value={model.get('numberPerInterval')} formValidationErrors={formValidationErrors} min={0} />
      <TextInput id="driver" label="Driver" onChange={onChange} value={model.get('driver')} formValidationErrors={formValidationErrors} />
      <TextInput id="genericCategory" label="Generic Category" onChange={onChange} value={model.get('genericCategory')} formValidationErrors={formValidationErrors} />
    </Fragment>
  );
}

function StaticDriver({model, formValidationErrors, onChange}) {
  return (
    <Fragment>
      <NumericInput id="numberPerInterval" label="Number of Times" onChange={onChange}
        value={model.get('numberPerInterval')} formValidationErrors={formValidationErrors} min={0} />
      <Select id="interval" label="Per Interval" onChange={onChange} value={model.get('interval')} options={KRONOS_INTERVAL_TYPE_SELECT_OPTIONS} formValidationErrors={formValidationErrors} />
      <NumericInput id="number" label="Number" onChange={onChange} value={model.get('number')} formValidationErrors={formValidationErrors} min={0} />
      <TextInput id="driver" label="Driver" onChange={onChange} value={model.get('driver')} formValidationErrors={formValidationErrors} />
    </Fragment>
  );
}

class LaborDriverForm extends PureComponent {
  render() {
    const {
      primaryInputRef,
      onFieldChange,
      model,
      onSubmit,
      formValidationErrors,
      disabled,
    } = this.props;
    const laborDriverTypeId = parseInt(model.get('laborDriverType'), 10);
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <TextInput id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
          <Select id="laborDriverType" label="Driver Type" options={KRONOS_LABOR_DRIVER_TYPE_SELECT_OPTIONS} onChange={onFieldChange} value={model.get('laborDriverType')} formValidationErrors={formValidationErrors} />
          {laborDriverTypeId === KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.VOLUME_DRIVER &&
            <VolumeDriver model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} />}
          {laborDriverTypeId === KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.CUSTOM_DRIVER &&
            <CustomDriver model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} />}
          {laborDriverTypeId === KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.FIXED_FREQUENCY &&
            <FixedFrequency model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} />}
          {laborDriverTypeId === KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.FIXED_FREQUENCY_DAILY_VOLUME &&
            <FixedFrequencyDailyVolume model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} />}
          {laborDriverTypeId === KRONOS_LABOR_DRIVER_TYPE_ENUM_INDEX.STATIC_DRIVER &&
            <StaticDriver model={model} formValidationErrors={formValidationErrors} onChange={onFieldChange} />}
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

LaborDriverForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default withAutoFocusOnEdit()(LaborDriverForm);
