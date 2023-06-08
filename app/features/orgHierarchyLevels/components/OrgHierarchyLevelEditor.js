import autoBind from 'react-autobind';
import {Map} from 'immutable';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {TextInput} from '../../forms/components';
import OrgHierarchyLevelEditorActions from './OrgHierarchyLevelEditorActions';
import OrgHierarchyLevelMoveControls from './OrgHierarchyLevelMoveControls';
import {OrgHierarchyLevelModel} from '../models';

export default class OrgHierarchyLevelEditor extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 13:
        this.props.onSave();
        break;
      case 27:
        this.props.onCancel();
        break;
    }
  }

  render() {
    const {
      orgHierarchyLevel,
      disabled,
      maxNumber,
      validationErrors,
      onFieldChanged,
      onSave,
      onCancel,
      onMove,
      onDelete,
      hasData,
    } = this.props;

    return (
      <div className="org-hierarchy-level-editor">
        <span className="number">{orgHierarchyLevel.number}</span>
        <TextInput id="name" formGroupClassName="name" maxLength={256}
          disabled={disabled} autoFocus
          value={orgHierarchyLevel.name} onChange={onFieldChanged}
          onKeyUp={disabled ? null : this.handleKeyUp}
          formValidationErrors={validationErrors} />
        <OrgHierarchyLevelEditorActions disabled={disabled} onSave={onSave} onCancel={onCancel} />
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

OrgHierarchyLevelEditor.propTypes = {
  orgHierarchyLevel: PropTypes.instanceOf(OrgHierarchyLevelModel).isRequired,
  disabled: PropTypes.bool.isRequired,
  maxNumber: PropTypes.number.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChanged: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
