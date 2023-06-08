import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import numeral from 'numeral';
import {AllowanceTimeModel} from '../models';

export default class AllowanceTime extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {allowanceTime, onEdit, onDelete, disabled} = this.props;

    return (
      <div className="allowance-time">
        <div className="content">
          <div className="header">
            <div className="name-container">
              <div className="name">{allowanceTime.name}</div>
              {allowanceTime.editable && !disabled
                ? <div className="buttons">
                  <Button bsStyle="default" onClick={onEdit}>Edit</Button>
                  <Button bsStyle="default" onClick={onDelete}><i className="fa fa-trash-o" /></Button>
                </div>
                : null}
            </div>
            <div className="time">
              <div>{allowanceTime.percent === null ? null : `${numeral(allowanceTime.percent).format('0,0.00')}%`}</div>
              <div>{numeral(allowanceTime.minutes).format('0,0.00')}m</div>
            </div>
          </div>
          {allowanceTime.definition ? <div className="definition">{allowanceTime.definition}</div> : null}
        </div>
      </div>
    );
  }
}

AllowanceTime.propTypes = {
  allowanceTime: PropTypes.instanceOf(AllowanceTimeModel).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
