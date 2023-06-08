import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {SketchPicker} from 'react-color';
import {Button} from 'react-bootstrap';

export default class AdminToolsColorPicker extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {disabled, color, onColorSelected, onCancel, onSave} = this.props;
    return (
      <div className="admin-tools-color-picker settings-column">
        <SketchPicker color={color} onChangeComplete={onColorSelected} disableAlpha presetColors={[]} />
        <h5>Select a company color<br />to display at login</h5>
        <div className="actions">
          <Button bsSize="xsmall" className="btn btn-default" onClick={onCancel} disabled={disabled}>Cancel</Button>
          <Button bsSize="xsmall" className="btn btn-primary" onClick={onSave} disabled={disabled}>Save Color</Button>
        </div>
      </div>
    );
  }
}

AdminToolsColorPicker.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onColorSelected: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
