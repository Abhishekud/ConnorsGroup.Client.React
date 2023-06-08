import autoBind from 'react-autobind';
import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  MOVE_ORG_HIERARCHY_LEVEL_UP,
  MOVE_ORG_HIERARCHY_LEVEL_DOWN,
} from '../constants/moveOrgHierarchyLevelActionTypes';

export default class OrgHierarchyLevelMoveControls extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleMoveUp() {
    this.props.onMove(MOVE_ORG_HIERARCHY_LEVEL_UP);
  }

  handleMoveDown() {
    this.props.onMove(MOVE_ORG_HIERARCHY_LEVEL_DOWN);
  }

  render() {
    const {disabled, number, maxNumber, onDelete, hasData} = this.props;
    const isDisabled = disabled || hasData;

    const moveUpClassNames = classNames(
      'fa', 'fa-caret-up',
      {
        disabled: isDisabled || number === 1,
        clickable: !isDisabled && number !== 1,
      }
    );

    const moveDownClassNames = classNames(
      'fa', 'fa-caret-down',
      {
        disabled: isDisabled || number === maxNumber,
        clickable: !isDisabled && number !== maxNumber,
      }
    );

    const deleteClassNames = classNames(
      'fa', 'fa-trash',
      {
        disabled,
        clickable: !disabled,
      }
    );

    return (
      <div className="move-controls">
        <div className="move-arrows">
          <i className={moveUpClassNames} onClick={isDisabled || number === 1 ? null : this.handleMoveUp} />
          <i className={moveDownClassNames} onClick={isDisabled || number === maxNumber ? null : this.handleMoveDown} />
        </div>
        <div className="delete-container">
          <i title="Delete" className={deleteClassNames} onClick={disabled ? null : onDelete} />
        </div>
      </div>
    );
  }
}

OrgHierarchyLevelMoveControls.propTypes = {
  disabled: PropTypes.bool,
  number: PropTypes.number.isRequired,
  maxNumber: PropTypes.number.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
