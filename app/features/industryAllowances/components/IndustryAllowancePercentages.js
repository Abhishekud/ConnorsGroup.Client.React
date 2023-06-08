import autoBind from 'react-autobind';
import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceModel} from '../models';
import IndustryAllowancePercentage from './IndustryAllowancePercentage';
import {allowanceDefinitions} from '../../allowances/constants';

export default class IndustryAllowancePercentages extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {allowance, collapsed, onToggle} = this.props;

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
              <div className="name">Allowance</div>
            </div>
          </div>

          {collapsed ? null : <IndustryAllowancePercentage
            name="Allowance Percent"
            definition={allowanceDefinitions.ALLOWANCE_PERCENT}
            percentage={allowance.allowancePercent} />}
          {collapsed ? null : <IndustryAllowancePercentage
            name="Calculated PR&D Allowance Factor"
            definition={allowanceDefinitions.ALLOWANCE_FACTOR}
            percentage={allowance.allowanceFactor} />}
          {collapsed ? null : <IndustryAllowancePercentage
            name="Incentive Opportunity Allowance"
            definition={allowanceDefinitions.INCENTIVE_OPPORTUNITY_ALLOWANCE}
            percentage={allowance.machineAllowancePercent} />}
        </div>
      </div>
    );
  }
}

IndustryAllowancePercentages.propTypes = {
  allowance: PropTypes.instanceOf(AllowanceModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
