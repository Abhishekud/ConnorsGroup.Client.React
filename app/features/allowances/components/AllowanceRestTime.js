import autoBind from 'react-autobind';
import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceTimeModel} from '../models';
import AllowanceTimeContainer from './AllowanceTimeContainer';
import {allowanceDefinitions, timeFormats} from '../constants';
import numeral from 'numeral';

export default class AllowanceRestTime extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      totalRestTime, totalRestTimeAllowedMinutes, totalRestTimeAllowedPercent, includedPaidBreaksMinutes, excludedPaidBreaksMinutes, totalIncludedAndExcludedPaidBreaksMinutes, restOffsetMinutes, totalRestMinutes, collapsed,
      onToggle,
    } = this.props;

    const collapserClassNames = classNames(
      'collapser', 'clickable', 'fa',
      {
        'fa-caret-right': collapsed,
        'fa-caret-down': !collapsed,
      });

    const allowanceTimesClassNames = classNames('allowance-time-group', {collapsed});

    return (
      <div className="allowance-time-group-container">
        <div className={allowanceTimesClassNames}>
          <div className="content">
            <div className="header">
              <div className="collapser-container"><i className={collapserClassNames} onClick={onToggle} /></div>
              <div className="name">Rest Time Allowed</div>
              <div className="time">
                <div>{numeral(totalRestTimeAllowedPercent).format(timeFormats.DECIMAL_TIME_FORMAT)}%</div>
                <div>{numeral(totalRestTimeAllowedMinutes).format(timeFormats.DECIMAL_TIME_FORMAT)}m</div>
              </div>
            </div>
            <div className="definition">
              {allowanceDefinitions.REST_TIME}
            </div>
          </div>

          {!collapsed && <AllowanceTimeContainer allowanceTime={includedPaidBreaksMinutes} />}
          {!collapsed && <AllowanceTimeContainer allowanceTime={excludedPaidBreaksMinutes} />}
          {!collapsed && <AllowanceTimeContainer allowanceTime={totalIncludedAndExcludedPaidBreaksMinutes} />}
          {!collapsed && <AllowanceTimeContainer allowanceTime={restOffsetMinutes} />}
          {!collapsed && <AllowanceTimeContainer allowanceTime={totalRestMinutes} />}
          {!collapsed && <AllowanceTimeContainer allowanceTime={totalRestTime} />}
        </div>
      </div>
    );
  }
}

AllowanceRestTime.propTypes = {
  totalRestTime: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  includedPaidBreaksMinutes: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  excludedPaidBreaksMinutes: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  totalIncludedAndExcludedPaidBreaksMinutes: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  restOffsetMinutes: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  totalRestMinutes: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
