import React from 'react';
import {PropTypes} from 'prop-types';
import {Map, List} from 'immutable';
import {CheckBoxWeekGroup, HiddenSubmitButton, Select, TextInput} from '../../forms/components';
import {ControlLabel, FormGroup, Grid, Row, Col} from 'react-bootstrap';

export default function ScheduleForm({
  saving,
  model,
  validationErrors,
  effectiveTimeZone,
  defaultFilePath,
  onSubmit,
  onFieldChange,
  onCheckboxChange,
}) {
  const crontabString = model.get('crontabString');
  const hasCrontabString = crontabString && crontabString.length > 0 || false;
  const crontabErrors = (validationErrors && validationErrors.get('crontabString')) || List();
  return (
    <div className="tumbleweed-scheduling-form">
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <Grid style={{width: '100%', padding: 0, marginTop: '24px'}}>
            <Row>
              <Col sm={3}>
                <Select id="hour" autoFocus value={model.get('hour')} label="Hour" disabled={hasCrontabString}
                  onChange={onFieldChange} formValidationErrors={validationErrors}>
                  <option />
                  {[...Array(24).keys()].map(
                    value => <option key={value} value={value}>{value}</option>)}
                </Select>
              </Col>
              <Col sm={3}>
                <Select id="minute" value={model.get('minute')} label="Minute" disabled={hasCrontabString}
                  onChange={onFieldChange} formValidationErrors={validationErrors}>
                  <option />
                  {[...Array(60).keys()].map(
                    value => <option key={value} value={value}>{value}</option>)}
                </Select>
              </Col>
            </Row>
          </Grid>
          <CheckBoxWeekGroup model={model} disabled={saving || hasCrontabString} onChange={onCheckboxChange} formValidationErrors={validationErrors} />
          <FormGroup controlId="crontabString" validationState={crontabErrors.size ? 'error' : null}>
            <ControlLabel>Crontab String</ControlLabel>
            <div className="note">For more precise scheduling enter a Crontab string</div>
            <TextInput
              id="crontabString"
              maxLength={50}
              placeholder={model.get('crontabString')}
              value={model.get('crontabString')}
              onChange={onFieldChange}
              disabled={saving}
              formValidationErrors={validationErrors} />
          </FormGroup>
          <FormGroup controlId="filePathOverride">
            <ControlLabel>File Path Override</ControlLabel>
            <div className="note">Default File Path: {defaultFilePath}</div>
            <TextInput
              id="filePathOverride"
              maxLength={250}
              placeholder={model.get('filePathOverride')}
              value={model.get('filePathOverride')}
              onChange={onFieldChange}
              disabled={saving}
              formValidationErrors={validationErrors} />
          </FormGroup>
          <div>
            <ControlLabel>Time Zone</ControlLabel>
            <div>{effectiveTimeZone}</div>
            <div className="note">Adjust this time zone under Admin / Admin Tools</div>
          </div>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    </div>
  );
}

ScheduleForm.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  effectiveTimeZone: PropTypes.string.isRequired,
  defaultFilePath: PropTypes.string.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};
