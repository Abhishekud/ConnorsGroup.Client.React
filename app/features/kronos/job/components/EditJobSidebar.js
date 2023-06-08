import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {Map} from 'immutable';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {
  showSelector,
  modelSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import {
  cancelEdit,
  saveEdit,
  setPropertyForEdit,
  showDeleteModal,
} from '../actions';
import {JobForm} from './';

class EditJobSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.cancelEdit();
  }

  handleSave(event) {
    event.preventDefault();

    const {saveEdit, model} = this.props;
    saveEdit(model);
  }

  handleDelete() {
    const {showDeleteModal, model} = this.props;
    showDeleteModal(model);
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForEdit(id, value);
  }

  render() {
    const {show, saving, model, cancelEdit, dirty} = this.props;
    const formValidationErrors = new Map();

    if (!show) return null;

    return (
      <Sidebar>
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onCancel={cancelEdit} onSave={this.handleSave}
          editActions={
            <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="kronos-labor-job" title="Edit Labor Period" collapsible={false} />
          <JobForm
            onFieldChange={this.handleFieldChange}
            onSubmit={this.handleSave}
            formValidationErrors={formValidationErrors}
            model={model} />
        </div>
      </Sidebar>
    );
  }
}

EditJobSidebar.propTypes = {
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
    saving: false,
    dirty: dirtySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    cancelEdit,
    saveEdit,
    setPropertyForEdit,
    showDeleteModal,
  }
)(EditJobSidebar));
