import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class StandardItemMoveControlsArrows extends PureComponent {
  render() {
    const {disabled, onMoveUp, onMoveDown} = this.props;

    const upArrowClasses = classNames('fa', 'fa-caret-up', {disabled, clickable: !disabled});
    const downArrowClasses = classNames('fa', 'fa-caret-down', {disabled, clickable: !disabled});

    return (
      <div className="move-arrows">
        <i className={upArrowClasses} onClick={disabled ? null : onMoveUp} />
        <i className={downArrowClasses} onClick={disabled ? null : onMoveDown} />
      </div>
    );
  }
}

StandardItemMoveControlsArrows.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
};
