import autoBind from 'react-autobind';
import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceTimeModel} from '../models';
import IndustryAllowanceTimeContainer from './IndustryAllowanceTimeContainer';
import numeral from 'numeral';
import {DECIMAL_TIME_FORMAT} from '../../allowances/constants/timeFormats';

export default class IndustryAllowanceDelayTimeGroup extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      name, definition, totalDelayTimePercent, totalDelayTimeMinutes, allowanceTimes, collapsed,
      onToggle,
    } = this.props;

    const collapserClassNames = classNames(
      'collapser', 'clickable', 'fa',
      {
        'fa-caret-right': collapsed,
        'fa-caret-down': !collapsed,
      });

    const allowanceTimesClassNames = classNames('allowance-time-group', {collapsed});

    const children = allowanceTimes.map(at =>
      <IndustryAllowanceTimeContainer key={at.id.toString()} allowanceTime={at} />);

    return (
      <div className="allowance-time-group-container">
        <div className={allowanceTimesClassNames}>
          <div className="content">
            <div className="header">
              <div className="collapser-container"><i className={collapserClassNames} onClick={onToggle} /></div>
              <div className="name">{name}</div>
              <div className="time">
                <div>{numeral(totalDelayTimePercent).format(DECIMAL_TIME_FORMAT)}%</div>
                <div>{numeral(totalDelayTimeMinutes).format(DECIMAL_TIME_FORMAT)}m</div>
              </div>
            </div>
            <div className="definition">{definition}</div>
          </div>

          {collapsed ? null : children}
        </div>
      </div>
    );
  }
}

IndustryAllowanceDelayTimeGroup.propTypes = {
  name: PropTypes.string.isRequired,
  definition: PropTypes.string,
  totalDelayTimePercent: PropTypes.number.isRequired,
  totalDelayTimeMinutes: PropTypes.number.isRequired,
  allowanceTimes: PropTypes.arrayOf(AllowanceTimeModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
