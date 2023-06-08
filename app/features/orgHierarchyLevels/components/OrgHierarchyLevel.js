import {Button} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import OrgHierarchyLevelMoveControls from './OrgHierarchyLevelMoveControls';
import {OrgHierarchyLevelModel} from '../models';

export default class OrgHierarchyLevel extends PureComponent {
  render() {
    const {
      orgHierarchyLevel, disabled, maxNumber,
      onEdit, onDelete, onMove, hasData,
    } = this.props;

    return (
      <div className="org-hierarchy-level">
        <span className="number">{orgHierarchyLevel.number}</span>
        <span className="name">
          <span title={orgHierarchyLevel.get('name')}>{orgHierarchyLevel.get('name')}</span>
          <Button bsStyle="default" disabled={disabled} onClick={onEdit}>Edit</Button>
        </span>
        <OrgHierarchyLevelMoveControls
          disabled={disabled}
          number={orgHierarchyLevel.number}
          maxNumber={maxNumber}
          onMove={onMove}
          onDelete={onDelete}
          hasData={hasData} />
      </div>
    );
  }
}

OrgHierarchyLevel.propTypes = {
  orgHierarchyLevel: PropTypes.instanceOf(OrgHierarchyLevelModel).isRequired,
  disabled: PropTypes.bool.isRequired,
  maxNumber: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
