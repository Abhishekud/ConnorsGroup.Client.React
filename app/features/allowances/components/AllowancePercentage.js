import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import numeral from 'numeral';

export default class AllowancePercentage extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {name, definition, percentage} = this.props;

    return (
      <div className="allowance-time">
        <div className="content">
          <div className="header">
            <div className="name-container">
              <div className="name">{name}</div>
            </div>
            <div className="time">
              <div />
              <div>{numeral(percentage).format('0,0.00')}%</div>
            </div>
          </div>
          {definition ? <div className="definition">{definition}</div> : null}
        </div>
      </div>
    );
  }
}

AllowancePercentage.propTypes = {
  name: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};
