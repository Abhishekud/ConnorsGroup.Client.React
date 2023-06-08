import autoBind from 'react-autobind';
import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {AllowanceTimeModel} from '../models';
import AllowanceTimeContainer from './AllowanceTimeContainer';
import numeral from 'numeral';
import {ListItemInsertBar} from '../../shared/components';

export default class AllowanceTimeGroup extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      name, definition, allowanceTimes, collapsed, allowAdd,
      onToggle, onAddTime, disabled,
    } = this.props;

    const collapserClassNames = classNames(
      'collapser', 'clickable', 'fa',
      {
        'fa-caret-right': collapsed,
        'fa-caret-down': !collapsed,
      });

    const allowanceTimesClassNames = classNames('allowance-time-group', {collapsed});

    const children = allowanceTimes.map(at =>
      <AllowanceTimeContainer key={at.id.toString()} allowanceTime={at} disabled={disabled} />);

    return (
      <div className="allowance-time-group-container">
        <div className={allowanceTimesClassNames}>
          <div className="content">
            <div className="header">
              {allowanceTimes.length
                ? <div className="collapser-container"><i className={collapserClassNames} onClick={onToggle} /></div>
                : null}
              <div className="name">{name}</div>
              <div className="time">
                <div />
                <div>{numeral(allowanceTimes.reduce((sum, at) => sum + Number(at.minutes), 0)).format('0,0.00')}m</div>
              </div>
            </div>
            {definition ? <div className="definition">{definition}</div> : null}
          </div>

          {collapsed ? null : children}
          {!allowAdd || collapsed || disabled ? null : <ListItemInsertBar insertAtIndex={1} onClick={onAddTime} />}
        </div>
      </div>
    );
  }
}

AllowanceTimeGroup.propTypes = {
  name: PropTypes.string.isRequired,
  definition: PropTypes.string,
  allowanceTimes: PropTypes.arrayOf(AllowanceTimeModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  allowAdd: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onAddTime: PropTypes.func,
};
