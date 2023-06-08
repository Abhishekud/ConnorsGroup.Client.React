import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {CheckBox} from '../../forms/components';
import Input from '../../forms/components/Input';

export default class TumbleweedEndpointForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  renderTextInput(name, label, maxLength, disabled, autoFocus, type) {
    const {tumbleweedEndpoint, onFieldChange, formValidationErrors} = this.props;
    return (
      <div className="field">
        <span className="field-name">
          {label}:
        </span>
        <span className="field-value">
          <Input
            id={name}
            maxLength={maxLength}
            value={tumbleweedEndpoint.get(name)}
            type={type || 'text'}
            autoFocus={autoFocus}
            onChange={onFieldChange(name)}
            disabled={disabled || !tumbleweedEndpoint.get('enabled')}
            formValidationErrors={formValidationErrors} />
        </span>
      </div>
    );
  }

  render() {
    const {onCancel, onSave, tumbleweedEndpoint, onCheckboxChange, disabled, isPristine, formValidationErrors} = this.props;
    const passwordDisabled = tumbleweedEndpoint.get('passwordSet') ? !tumbleweedEndpoint.get('updatePassword') : false;
    return (
      <div>
        <h2>Settings</h2>
        <div className="fields">
          <div className="field">
            <span className="field-name">
              Enabled:
            </span>
            <span className="field-value">
              <CheckBox
                id="enabled"
                checked={tumbleweedEndpoint.get('enabled') === true}
                onChange={onCheckboxChange('enabled')}
                disabled={disabled}
                formValidationErrors={formValidationErrors} />
            </span>
          </div>
          {this.renderTextInput('server', 'FTP Site', 50, disabled, true)}
          {this.renderTextInput('port', 'Port', 50, disabled, false, 'number')}
          {this.renderTextInput('userName', 'User Name', 100, disabled, false)}
          {tumbleweedEndpoint.get('passwordSet')
            ? (<div className="field">
              <span className="field-name">
                Update Password:
              </span>
              <span className="field-value">
                <CheckBox
                  id="updatePassword"
                  checked={tumbleweedEndpoint.get('updatePassword') === true}
                  onChange={onCheckboxChange('updatePassword')}
                  disabled={disabled}
                  formValidationErrors={formValidationErrors} />
              </span>
            </div>)
            : (null)}
          {this.renderTextInput('password', 'Password', 100, passwordDisabled || disabled, false, 'password')}
          {this.renderTextInput('filePath', 'Folder', 100, disabled, false)}
          {this.renderTextInput('clientFileNamePrefix', 'Client File Prefix', 10, disabled, false)}
          <div className="actions">
            <Button className="btn btn-default" onClick={onCancel} disabled={disabled || isPristine}>Cancel</Button>
            <Button className="btn btn-primary" onClick={onSave} disabled={disabled || isPristine}>Save Settings</Button>
          </div>
        </div>
      </div>
    );
  }
}

TumbleweedEndpointForm.propTypes = {
  tumbleweedEndpoint: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isPristine: PropTypes.bool.isRequired,
  formValidationErrors: PropTypes.instanceOf(Map),
};
