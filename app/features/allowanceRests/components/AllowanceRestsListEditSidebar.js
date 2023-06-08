import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditAllowanceRestModelProperty,
  updateAllowanceRest,
  showDeleteAllowanceRest,
  closeAllowanceRestsListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import CreateEditAllowanceRestForm from './CreateEditAllowanceRestForm';
import DeleteAllowanceRestModal from './DeleteAllowanceRestModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {ALLOWANCE_RESTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {Button} from 'react-bootstrap';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ALLOWANCES_EDIT} from '../../authentication/constants/permissions';

class AllowanceRestsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value, maxLength} = event.target;
    let message = '';
    if (maxLength && maxLength <= value.length) {
      message = 'You have exceeded the maximum number of characters allowed';
    }
    this.props.setEditAllowanceRestModelProperty(name, value, message);
  }

  setMuscularForce(force) {
    this.props.setEditAllowanceRestModelProperty('muscularForce', force);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateAllowanceRest, loadSelectListOptions, model, closeAllowanceRestsListEditSidebar, router} = this.props;

    updateAllowanceRest(model)
      .then(() => {
        loadSelectListOptions(ALLOWANCE_RESTS);
        closeAllowanceRestsListEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the AllowanceRest.'));
  }

  handleCancelEdit() {
    this.props.closeAllowanceRestsListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteAllowanceRest} = this.props;
    showDeleteAllowanceRest(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      canEdit,
      validationErrors,
    } = this.props;

    if (!show) return null;

    const disabled = (model.get('productionStandardsCount') > 0);

    return (
      <Sidebar className="allowanceRests-list-edit-sidebar">
        {disabled
          ? <div className="action-buttons">
            <Button bsSize="small" onClick={this.handleCancelEdit}>Close</Button>
            <div className="used-in-production">This Rest is used in Production Standards and cannot be changed.</div>
          </div>
          : <EditSidebarSectionHeaderActions
            workingModel={model}
            editing saving={saving} hasPermission={canEdit}
            onCancel={this.handleCancelEdit} onSave={this.handleSave}
            editActions={
              canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
                <i className="fa fa-trash-o" title="Delete" />
              </Button>
            } />}
        <div className="sidebar-scrollable">
          <SidebarSection className="allowanceRest" title="Edit Rest" collapsible={false} />
          <CreateEditAllowanceRestForm
            model={model}
            validationErrors={validationErrors}
            saving={saving || disabled || !canEdit}
            onFieldChange={this.handleFieldChange}
            setMuscularForce={this.setMuscularForce}
            onSubmit={this.handleSave} />
          <DeleteAllowanceRestModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ALLOWANCES_EDIT);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditAllowanceRestModelProperty,
    updateAllowanceRest,
    showDeleteAllowanceRest,
    closeAllowanceRestsListEditSidebar,
    loadSelectListOptions,
  }
)(AllowanceRestsListEditSidebar));
