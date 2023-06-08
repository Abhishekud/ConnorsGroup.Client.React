import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditClassificationModelProperty,
  updateClassification,
  showDeleteClassification,
  closeClassificationsListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import CreateEditClassificationForm from './CreateEditClassificationForm';
import DeleteClassificationModal from './DeleteClassificationModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {CLASSIFICATIONS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {Button} from 'react-bootstrap';

class ClassificationsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditClassificationModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateClassification, loadSelectListOptions, model, closeClassificationsListEditSidebar, router} = this.props;

    updateClassification(model)
      .then(() => {
        loadSelectListOptions(CLASSIFICATIONS);
        closeClassificationsListEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Classification.'));
  }

  handleCancelEdit() {
    this.props.closeClassificationsListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteClassification} = this.props;
    showDeleteClassification(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      dirty,
      canManageStandardList,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="classifications-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onCancel={this.handleCancelEdit} onSave={this.handleSave}
          hasPermission={canManageStandardList}
          editActions={
            canManageStandardList && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="classification" title="Edit Classification" collapsible={false} />
          <CreateEditClassificationForm
            model={model}
            validationErrors={validationErrors}
            saving={saving}
            onFieldChange={this.handleFieldChange}
            onSubmit={this.handleSave}
            disabled={!canManageStandardList} />
          <DeleteClassificationModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    dirty: dirtySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditClassificationModelProperty,
    updateClassification,
    showDeleteClassification,
    closeClassificationsListEditSidebar,
    loadSelectListOptions,
  }
)(ClassificationsListEditSidebar));
