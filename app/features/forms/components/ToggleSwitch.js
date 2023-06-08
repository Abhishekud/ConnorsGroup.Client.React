import autoBind from 'react-autobind';
import {ControlLabel, FormGroup} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class ToggleSwitch extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClick() {
    const {onChange, id, name, checked} = this.props;
    onChange({target: {name: name || id, value: !checked}});
  }

  render() {
    const {
      id, name, label,
      disabled, checked,
      formGroupClassName,
    } = this.props;

    let toggleIconClasses = checked ? 'fa fa-toggle-on' : 'fa fa-toggle-off';
    toggleIconClasses += disabled ? ' disabled' : ' clickable';

    return (
      <FormGroup className={`toggle-switch ${formGroupClassName || ''}`} controlId={id}>
        <ControlLabel onClick={disabled ? null : this.handleClick}>{label}</ControlLabel>
        <i id={id} name={name || id} value={checked} className={toggleIconClasses}
          onClick={disabled ? null : this.handleClick} />
      </FormGroup>
    );
  }
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  formGroupClassName: PropTypes.string,
  onChange: PropTypes.func,
};

