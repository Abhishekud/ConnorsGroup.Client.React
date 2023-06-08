import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {
  mapSelectedOptionsToValues,
} from '../../forms/services';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  editAllowance,
  setEditAllowanceWorkingModelProperty,
  updateAllowance,
  cancelEditAllowance,
  showDeleteAllowance,
  showDuplicateAllowance,
} from '../actions';
import {
  showSelector,
  pristineModelSelector,
  workingModelSelector,
  editingSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import CreateEditAllowanceForm from './CreateEditAllowanceForm';
import DeleteAllowanceModal from './DeleteAllowanceModal';
import {handleApiError, toastr} from '../../shared/services';
import {
  ALLOWANCES,
  ALLOWANCE_RESTS,
} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ALLOWANCES_EDIT} from '../../authentication/constants/permissions';

class AllowancesListEditSidebar extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {tagName, multiple} = event.target;

    if (tagName === 'SELECT' && multiple) {
      this.handleMultiSelectFieldChange(event);
    } else {
      this.handleInputFieldChange(event);
    }
  }

  handleMultiSelectFieldChange(event) {
    const {name, options} = event.target;
    this.props.setEditAllowanceWorkingModelProperty(name, List(mapSelectedOptionsToValues(options)));
  }

  handleInputFieldChange(event) {
    const {name, type, maxLength} = event.target;
    let value = event.target.value;

    if (type === 'number') {
      value = value ? Number(value) : null;
    }

    let message = '';
    if (maxLength && maxLength <= value.length) {
      message = 'You have exceeded the maximum number of characters allowed';
    }


    this.props.setEditAllowanceWorkingModelProperty(name, value, message);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateAllowance, loadSelectListOptions, workingModel, router} = this.props;

    updateAllowance(workingModel)
      .then(() => loadSelectListOptions(ALLOWANCES))
      .catch(error => {
        const {status} = error.response || {};
        if (status === 400) {
          toastr.error(this.props.validationErrors.get('_').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to update the Allowance.');
      }
      );
  }

  handleCancel() {
    this.props.cancelEditAllowance();
  }

  handleDelete() {
    const {pristineModel, showDeleteAllowance} = this.props;
    showDeleteAllowance(pristineModel);
  }

  handleDuplicate() {
    const {id, pristineModel, showDuplicateAllowance} = this.props;

    let name = pristineModel.get('name');
    const maxNumberOfCharacters = 249;
    if (name.length > maxNumberOfCharacters) {
      name = name.substring(0, maxNumberOfCharacters);
    }

    showDuplicateAllowance(id, pristineModel.set('name', `${name} - Copy`));
  }

  render() {
    const {
      show,
      workingModel,
      editing,
      saving,
      canEdit,
      validationErrors,
      allowanceRestTimes,

      handleEdit,
    } = this.props;

    if (!show) return null;
    const disabled = workingModel.get('usedInProduction');

    return (
      <Sidebar className="allowances-list-edit-sidebar" closeable={false}>
        {disabled
          ? (
            <div className="action-buttons">
              {canEdit && <Button bsSize="small" disabled={saving} onClick={this.handleDuplicate}><i className="fa fa-files-o" title="Duplicate" /></Button>}
              <div className="warning">This Allowance is used in Production Standards or Standard Revisions and cannot be changed.</div>
            </div>
          )
          : (
            <EditSidebarSectionHeaderActions
              workingModel={workingModel}
              editing={editing} saving={saving} hasPermission={canEdit}
              onEdit={handleEdit} onCancel={this.handleCancel} onSave={this.handleSave}
              editActions={
                canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving || disabled} onClick={this.handleDelete}>
                  <i className="fa fa-trash-o" title="Delete" />
                </Button>
              }
              nonEditActions={
                canEdit && <Button bsSize="small" disabled={saving} onClick={this.handleDuplicate}>
                  <i className="fa fa-files-o" title="Duplicate" />
                </Button>
              } />
          )
        }
        <div className="sidebar-scrollable">
          <SidebarSection className="allowance" title="Edit Allowance" collapsible={false}>
            <CreateEditAllowanceForm
              model={workingModel}
              allowanceRestTimes={allowanceRestTimes}
              validationErrors={validationErrors}
              editing={editing}
              saving={saving}
              disabled={!canEdit}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave} />
          </SidebarSection>
          <DeleteAllowanceModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const allowanceRestTimesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCE_RESTS);
  const canEditSelector = makeCurrentUserHasPermissionSelector(ALLOWANCES_EDIT);

  return {
    show: showSelector(state),
    pristineModel: pristineModelSelector(state),
    workingModel: workingModelSelector(state),
    editing: editingSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    allowanceRestTimes: allowanceRestTimesSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleEdit: editAllowance,
    setEditAllowanceWorkingModelProperty,
    updateAllowance,
    cancelEditAllowance,
    showDeleteAllowance,
    loadSelectListOptions,
    showDuplicateAllowance,
  }
)(AllowancesListEditSidebar));
