import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {TextInput, Select, CheckBox} from '../../forms/components';
import {daysOfTheWeek} from '../../shared/constants';
import {DAY_OF_WEEK, BOOLEAN, UNIT_OF_TIME} from '../constants/settingTypes';
import {displayName, TIME_FORMATS} from '../../shared/constants/timeFormats';

const DAYS_OF_THE_WEEK = daysOfTheWeek.ALL.map(day => ({value: day, label: day}));
const TIME_FORMAT_LIST = TIME_FORMATS.map(timeFormat => ({label: displayName(timeFormat), value: timeFormat}));

export default class AdminToolsFields extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  renderInputControl(field) {
    const {onFieldChange, onCheckboxChange, disabled, formValidationErrors} = this.props;

    switch (field.get('settingValueType')) {
      case DAY_OF_WEEK:
        return (
          <Select
            id={field.get('id').toString()}
            value={field.get('value')}
            options={DAYS_OF_THE_WEEK}
            onChange={onFieldChange(field.get('id'))}
            disabled={disabled}
            formValidationErrors={formValidationErrors} />
        );

      case BOOLEAN:
        return (
          <CheckBox
            id={field.get('id').toString()}
            checked={(field.get('value') === 'true')}
            onChange={onCheckboxChange(field.get('id'))}
            disabled={disabled}
            formValidationErrors={formValidationErrors} />
        );

      case UNIT_OF_TIME:
        return (
          <Select
            id={field.get('id').toString()}
            value={field.get('value')}
            options={TIME_FORMAT_LIST}
            onChange={onFieldChange(field.get('id'))}
            disabled={disabled}
            formValidationErrors={formValidationErrors} />
        );

      default:
        return (
          <TextInput
            id={field.get('id').toString()}
            maxLength={30}
            placeholder={field.get('value')}
            value={field.get('value')}
            autoFocus
            onChange={onFieldChange(field.get('id'))}
            disabled={disabled}
            formValidationErrors={formValidationErrors} />
        );
    }
  }

  render() {
    const {onCancel, onSave, fields, disabled, isPrestine} = this.props;
    return (
      <div className="fields">
        <hr />
        <h2>Settings</h2>
        {fields.valueSeq().map(x =>
          (<div key={x.get('id')} className="field">
            <span className="field-name">{x.get('name')}:</span>
            <span className="field-value">{this.renderInputControl(x)}</span>
          </div>))}
        <div className="actions">
          <Button className="btn btn-default" onClick={onCancel} disabled={disabled || isPrestine}>Cancel</Button>
          <Button className="btn btn-primary" onClick={onSave} disabled={disabled || isPrestine}>Save Settings</Button>
        </div>
      </div>
    );
  }
}

AdminToolsFields.propTypes = {
  fields: PropTypes.instanceOf(Map).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isPrestine: PropTypes.bool.isRequired,
  formValidationErrors: PropTypes.instanceOf(Map),
};
