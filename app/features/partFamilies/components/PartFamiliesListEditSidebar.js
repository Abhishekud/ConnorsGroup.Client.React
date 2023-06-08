import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditPartFamilyModelProperty,
  updatePartFamily,
  showDeletePartFamily,
  closePartFamiliesListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import {partFamilyNameSelector} from '../../shared/selectors/components/settings';
import CreateEditPartFamilyForm from './CreateEditPartFamilyForm';
import DeletePartFamilyModal from './DeletePartFamilyModal';
import {handleApiError} from '../../shared/services';
import {PART_FAMILIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class PartFamiliesListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditPartFamilyModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updatePartFamily, model, loadSelectListOptions, closePartFamiliesListEditSidebar, router, partFamilyName} = this.props;

    updatePartFamily(model)
      .then(() => {
        loadSelectListOptions(PART_FAMILIES);
        closePartFamiliesListEditSidebar();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${partFamilyName}`));
  }

  handleCancelEdit() {
    this.props.closePartFamiliesListEditSidebar();
  }

  handleDelete() {
    const {model, showDeletePartFamily} = this.props;
    showDeletePartFamily(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      partFamilyName,
      canEdit,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="part-families-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onCancel={this.handleCancelEdit} onSave={this.handleSave}
          hasPermission={canEdit}
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="part-family" title={`Edit ${partFamilyName}`} collapsible={false}>
            <CreateEditPartFamilyForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave} disabled={!canEdit} />
          </SidebarSection>
          <DeletePartFamilyModal />
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
    partFamilyName: partFamilyNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditPartFamilyModelProperty,
    updatePartFamily,
    showDeletePartFamily,
    closePartFamiliesListEditSidebar,
    loadSelectListOptions,
  }
)(PartFamiliesListEditSidebar));
