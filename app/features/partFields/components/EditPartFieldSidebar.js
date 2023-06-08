import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditPartFieldModelProperty,
  updatePartField,
  showDeletePartField,
  closeEditPartFieldSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import {partNameSelector} from '../../shared/selectors/components/settings';
import CreateEditPartFieldForm from './CreateEditPartFieldForm';
import DeletePartFieldModal from './DeletePartFieldModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {PART_FIELDS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class EditPartFieldSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    let {value} = event.target;
    const {name, type, checked} = event.target;
    if (type === 'checkbox') value = checked;
    this.props.setEditPartFieldModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updatePartField, model, loadSelectListOptions, closeEditPartFieldSidebar, router, partName} = this.props;

    updatePartField(model)
      .then(() => {
        loadSelectListOptions(PART_FIELDS);
        closeEditPartFieldSidebar();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${partName} Field.`));
  }

  handleCancel() {
    this.props.closeEditPartFieldSidebar();
  }

  handleDelete() {
    const {model, showDeletePartField} = this.props;
    showDeletePartField(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      partName,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="edit-part-field-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onCancel={this.handleCancel} onSave={this.handleSave}
          editActions={
            <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="partField" title={`Edit ${partName} Field`} collapsible={false}>
            <CreateEditPartFieldForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave} />
          </SidebarSection>
          <DeletePartFieldModal />
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
    partName: partNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditPartFieldModelProperty,
    updatePartField,
    showDeletePartField,
    closeEditPartFieldSidebar,
    loadSelectListOptions,
  }
)(EditPartFieldSidebar));
