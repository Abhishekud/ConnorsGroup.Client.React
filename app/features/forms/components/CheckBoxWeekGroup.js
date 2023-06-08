import {List, Map} from 'immutable';
import {ControlLabel, HelpBlock, FormGroup, Checkbox} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class CheckBoxWeekGroup extends PureComponent {
  render() {
    const {
      model, disabled, formValidationErrors, onChange, formGroupClassName, labelTitle,
    } = this.props;

    const controlValidationErrors = (formValidationErrors && formValidationErrors.get('day')) || List();
    const labelProps = labelTitle ? {title: 'Day'} : null;

    return (
      <FormGroup controlId={'day'} validationState={controlValidationErrors.size ? 'error' : null}
        className={formGroupClassName}>
        <ControlLabel {...labelProps}>Day</ControlLabel>
        <Checkbox id="monday" disabled={disabled} checked={model.get('monday')} onChange={onChange}>
          <strong>Monday</strong>
        </Checkbox>
        <Checkbox id="tuesday" disabled={disabled} checked={model.get('tuesday')} onChange={onChange}>
          <strong>Tuesday</strong>
        </Checkbox>
        <Checkbox id="wednesday" disabled={disabled} checked={model.get('wednesday')} onChange={onChange}>
          <strong>Wednesday</strong>
        </Checkbox>
        <Checkbox id="thursday" disabled={disabled} checked={model.get('thursday')} onChange={onChange}>
          <strong>Thursday</strong>
        </Checkbox>
        <Checkbox id="friday" disabled={disabled} checked={model.get('friday')} onChange={onChange}>
          <strong>Friday</strong>
        </Checkbox>
        <Checkbox id="saturday" disabled={disabled} checked={model.get('saturday')} onChange={onChange}>
          <strong>Saturday</strong>
        </Checkbox>
        <Checkbox id="sunday" disabled={disabled} checked={model.get('sunday')} onChange={onChange}>
          <strong>Sunday</strong>
        </Checkbox>
        {controlValidationErrors.size
          ? controlValidationErrors.map((error, index) =>
            (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
          : null}
      </FormGroup>
    );
  }
}

CheckBoxWeekGroup.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.bool,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formGroupClassName: PropTypes.string,
  labelTitle: PropTypes.bool,
  model: PropTypes.instanceOf(Map),
  formValidationErrors: PropTypes.instanceOf(Map),
};
