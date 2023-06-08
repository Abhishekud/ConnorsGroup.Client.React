import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditLaborCategoryModelProperty,
  updateLaborCategory,
  showDeleteLaborCategory,
  closeLaborCategoriesListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import CreateEditLaborCategoryForm from './CreateEditLaborCategoryForm';
import DeleteLaborCategoryModal from './DeleteLaborCategoryModal';
import {handleApiError} from '../../shared/services';
import {LABOR_CATEGORIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class LaborCategoriesListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditLaborCategoryModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateLaborCategory, model, loadSelectListOptions, closeLaborCategoriesListEditSidebar, router} = this.props;

    updateLaborCategory(model)
      .then(() => {
        closeLaborCategoriesListEditSidebar();
        loadSelectListOptions(LABOR_CATEGORIES);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Labor Category.'));
  }

  handleCancel() {
    this.props.closeLaborCategoriesListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteLaborCategory} = this.props;
    showDeleteLaborCategory(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      dirty,
      validationErrors,
      canManageStandardList,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="labor-categories-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          dirty={dirty}
          onCancel={this.handleCancel} onSave={this.handleSave}
          hasPermission={canManageStandardList}
          editActions={
            canManageStandardList && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="labor-category" title="Edit Labor Category" collapsible={false}>
            <CreateEditLaborCategoryForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canManageStandardList} />
          </SidebarSection>
          <DeleteLaborCategoryModal />
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
    dirty: dirtySelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditLaborCategoryModelProperty,
    updateLaborCategory,
    showDeleteLaborCategory,
    closeLaborCategoriesListEditSidebar,
    loadSelectListOptions,
  }
)(LaborCategoriesListEditSidebar));
