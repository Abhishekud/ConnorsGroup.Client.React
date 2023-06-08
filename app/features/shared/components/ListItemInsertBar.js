import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class ListItemInsertBar extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClick() {
    const {onClick, insertAtIndex} = this.props;
    onClick(insertAtIndex);
  }

  render() {
    const {disabled} = this.props;

    return (
      <div className="list-item-inserter-container">
        <div className="list-item-inserter">
          <div className="plus-button-container">
            {disabled ? null : <i className="fa fa-plus" onClick={this.handleClick} />}
          </div>
          {disabled ? null : <div className="indicator-bar" />}
        </div>
      </div>
    );
  }
}

ListItemInsertBar.propTypes = {
  insertAtIndex: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
