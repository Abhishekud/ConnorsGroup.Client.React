import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {handleApiError} from '../../../shared/services';
import {
  showSelector,
  modelSelector,
  dirtySelector,
  validationErrorsSelector,
  savingSelector,
} from '../selectors/sidebars/edit';
import {
  cancelEdit,
  saveEdit,
  setPropertyForEdit,
  showDeleteModal,
} from '../actions';
import {LaborDriverForm} from './';

class EditLaborDriverSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.cancelEdit();
  }

  handleSave(event) {
    event.preventDefault();

    const {saveEdit, model, router} = this.props;
    saveEdit(model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to save the Labor Driver.', 'error'));
  }

  handleDelete() {
    const {showDeleteModal, model} = this.props;
    showDeleteModal(model);
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForEdit(id, value);
  }

  handleNestedFieldChange(e) {
    const {id, value} = e.target;
    this.props.setDriverPropertyForEdit(id, value);
  }

  render() {
    const {show, saving, model, cancelEdit, dirty, validationErrors, canEdit} = this.props;

    if (!show) return null;

    return (
      <Sidebar className="classifications-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onCancel={cancelEdit} onSave={this.handleSave}
          disabled={!canEdit}
          editActions={
            <Button bsStyle="default" className="delete" bsSize="small" disabled={!canEdit || saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="kronos-labor-driver" title="Edit Labor Driver" collapsible={false} />
          <LaborDriverForm
            onFieldChange={this.handleFieldChange}
            onSubmit={this.handleSave}
            formValidationErrors={validationErrors}
            model={model}
            disabled={!canEdit} />
        </div>
      </Sidebar>
    );
  }
}

EditLaborDriverSidebar.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,

  cancelEdit: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
  setPropertyForEdit: PropTypes.func.isRequired,
};

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
  mapStateToProps, {
    cancelEdit,
    saveEdit,
    setPropertyForEdit,
    showDeleteModal,
  }
)(EditLaborDriverSidebar));
