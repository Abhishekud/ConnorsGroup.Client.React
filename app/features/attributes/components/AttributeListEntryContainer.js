import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import AttributeListEntry from './AttributeListEntry';
import AttributeListEntryEditor from './AttributeListEntryEditor';
import {
  editAttribute,
  cancelEditAttribute,
  setAttributeModelProperty,
  updateAttribute,
  showDeleteAttribute,
  loadAttributeSelectListOptions,
} from '../actions';
import {
  makeEditingAttributeSelector,
  makeSavingAttributeSelector,
  makeAttributeValidationErrorsSelector,
} from '../selectors/sidebars/attributes';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {DEPARTMENTS, ATTRIBUTES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_ATTRIBUTES_CREATE, PROFILING_ATTRIBUTES_UPDATE} from '../../authentication/constants/permissions';

class AttributeListEntryContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {attribute, editAttribute} = this.props;
    editAttribute(attribute.get('id'));
  }

  handleCancelEdit() {
    const {attribute, cancelEditAttribute} = this.props;

    cancelEditAttribute(attribute.get('id'));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    const {attribute, setAttributeModelProperty} = this.props;

    setAttributeModelProperty(attribute.get('id'), name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {attribute, loadSelectListOptions, loadAttributeSelectListOptions, updateAttribute, router} = this.props;
    updateAttribute(attribute)
      .then(() => {
        loadSelectListOptions(ATTRIBUTES);
        loadAttributeSelectListOptions();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the attribute.'));
  }

  handleDelete() {
    const {attribute, showDeleteAttribute} = this.props;

    showDeleteAttribute(attribute);
  }

  render() {
    const {
      attribute,
      departments,
      validationErrors,
      pristineAttribute,
      departmentName,
      canCreate,
      canUpdate,

      editing,
      saving,
    } = this.props;

    if (editing) {
      return (
        <AttributeListEntryEditor
          attribute={attribute}
          validationErrors={validationErrors}
          saving={saving}
          onFieldChange={this.handleFieldChange}
          canCreate={canCreate}
          canUpdate={canUpdate}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete}
          departmentName={departmentName}
          departments={departments} />
      );
    }

    return (
      <AttributeListEntry
        attribute={pristineAttribute}
        hasPermission={canUpdate || canCreate}
        onEdit={this.handleEdit} />
    );
  }
}

AttributeListEntryContainer.propTypes = {
  pristineAttribute: PropTypes.instanceOf(Map).isRequired,
  attribute: PropTypes.instanceOf(Map).isRequired,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingAttributeSelector();
  const savingSelector = makeSavingAttributeSelector();
  const validationErrorsSelector = makeAttributeValidationErrorsSelector();
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_ATTRIBUTES_CREATE);
  const canUpdateSelector = makeCurrentUserHasPermissionSelector(PROFILING_ATTRIBUTES_UPDATE);

  return (state, ownProps) => ({
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    departments: departmentsSelector(state),
    validationErrors: validationErrorsSelector(state, ownProps),
    departmentName: departmentNameSelector(state),
    canUpdate: canUpdateSelector(state),
    canCreate: canCreateSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    editAttribute,
    cancelEditAttribute,
    setAttributeModelProperty,
    updateAttribute,
    showDeleteAttribute,
    loadSelectListOptions,
    loadAttributeSelectListOptions,
  }
)(AttributeListEntryContainer));
