import {Map} from 'immutable';
import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceTimeModel} from '../models';
import {TextInput, NumericInput, TextArea} from '../../forms/components';

export default class AllowanceTimeEditor extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      allowanceTime, disabled, validationErrors,
      onFieldChange, onSave, onCancel,
    } = this.props;

    return (
      <div className="allowance-time-editor">
        <div className="content">
          <div className="header">
            <div className="name">
              <TextInput
                id="name" maxLength={256} disabled={disabled} autoFocus
                value={allowanceTime.name} formValidationErrors={validationErrors}
                onChange={onFieldChange} />
            </div>
            <div className="time">
              <div />
              <NumericInput
                id="minutes" disabled={disabled}
                value={allowanceTime.minutes} formValidationErrors={validationErrors}
                onChange={onFieldChange} />
            </div>
            <div className="buttons">
              <Button bsStyle="primary" disabled={disabled} onClick={onSave}>Save</Button>
              <Button bsStyle="default" disabled={disabled} onClick={onCancel}>Cancel</Button>
            </div>
          </div>
          <div className="definition">
            <TextArea
              id="definition" maxLength={256} rows={5} disabled={disabled}
              value={allowanceTime.definition} formValidationErrors={validationErrors}
              onChange={onFieldChange} />
          </div>
        </div>
      </div>
    );
  }
}

AllowanceTimeEditor.propTypes = {
  allowanceTime: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
