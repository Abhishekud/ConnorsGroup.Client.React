import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import numeral from 'numeral';
import {AllowanceTimeModel} from '../models';
import {DECIMAL_TIME_FORMAT} from '../../allowances/constants/timeFormats';

export default class IndustryAllowanceTime extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {allowanceTime} = this.props;

    return (
      <div className="allowance-time">
        <div className="content">
          <div className="header">
            <div className="name-container">
              <div className="name">{allowanceTime.name}</div>
            </div>
            <div className="time">
              <div>{allowanceTime.percent === null ? null : `${numeral(allowanceTime.percent).format(DECIMAL_TIME_FORMAT)}%`}</div>
              <div>{numeral(allowanceTime.minutes).format(DECIMAL_TIME_FORMAT)}m</div>
            </div>
          </div>
          {allowanceTime.definition ? <div className="definition">{allowanceTime.definition}</div> : null}
        </div>
      </div>
    );
  }
}

IndustryAllowanceTime.propTypes = {
  allowanceTime: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
};
