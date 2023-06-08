import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import React, {Component} from 'react';
import {changeTimeFormat} from '../actions';
import {timeFormatSelector, timeFormatSelectorDisabledSelector} from '../selectors/components/timeFormatSelector';
import {timeFormats} from '../constants';

class TimeFormatSelector extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleTimeFormatChange(eventKey) {
    this.props.changeTimeFormat(eventKey);
  }

  render() {
    const {timeFormat, disabled} = this.props;

    return (
      <div className="time-format-selector">
        <DropdownButton id="timeFormat" className="btn-default" pullRight
          title={timeFormats.displayName(timeFormat)} disabled={disabled}>
          <MenuItem eventKey={timeFormats.TMUs} onSelect={this.handleTimeFormatChange}>
            {timeFormats.displayName(timeFormats.TMUs)}
          </MenuItem>
          <MenuItem eventKey={timeFormats.SECONDS} onSelect={this.handleTimeFormatChange}>
            {timeFormats.displayName(timeFormats.SECONDS)}
          </MenuItem>
          <MenuItem eventKey={timeFormats.MINUTES} onSelect={this.handleTimeFormatChange}>
            {timeFormats.displayName(timeFormats.MINUTES)}
          </MenuItem>
          <MenuItem eventKey={timeFormats.HOURS} onSelect={this.handleTimeFormatChange}>
            {timeFormats.displayName(timeFormats.HOURS)}
          </MenuItem>
        </DropdownButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeFormat: timeFormatSelector(state),
    disabled: timeFormatSelectorDisabledSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    changeTimeFormat,
  }
)(TimeFormatSelector);
