import React, {Component} from 'react';
import autoBind from 'react-autobind';
//import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {
  setEditAttributeProperty,
  closeAttributeSidebar,
  updateAttribute,
  loadAttributes,
  deleteAttribute,
} from '../actions';
import {
  showSelector,
  savingSelector,
  modelSelector,
  dirtySelector,
  formValidationErrorsSelector,
} from '../selectors/sidebars/edit';
import {CreateEditAttributeForm} from './';
import {REFLEXIS_EDIT} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';

class EditAttributeSidebar extends Component {

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleCancel() {
    this.props.closeAttributeSidebar();
  }

  handleSave() {
    event.preventDefault();

    const {updateAttribute, model, loadAttributes} = this.props;
    updateAttribute(model).then(loadAttributes);
  }

  handleFieldChange({target}) {
    const {id, value} = target;
    this.props.setEditAttributeProperty(id, value);
  }

  handleDelete() {
    const {deleteAttribute, model, loadAttributes} = this.props;
    deleteAttribute(model.get('id')).then(loadAttributes);
  }

  handleNavigationToStatuses() {
    const {router, model} = this.props;
    router.push(`/reflexis/attributes/${model.get('id')}/statuses`);
  }

  render() {
    const {
      show,
      saving,
      loading,
      model,
      canEdit,
      dirty,
      formValidationErrors,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="reflexis-attribute-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          dirty={dirty}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          hasPermission={canEdit}
          editActions={
            <>
              {canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
                <i className="fa fa-trash-o" title="Delete" />
              </Button>}
              <Button bsSize="small" bsStyle="link" disabled={saving} onClick={this.handleNavigationToStatuses}>
                Integration Status
              </Button>
            </>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="reflexis-attribute" title="Edit Reflexis Attribute" collapsible={false} />
          <CreateEditAttributeForm
            model={model}
            formValidationErrors={formValidationErrors}
            disabled={loading}
            create={false}
            onSubmit={this.handleSave}
            onFieldChange={this.handleFieldChange} />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const hasEditAccessSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_EDIT);
  return {
    show: showSelector(state),
    saving: savingSelector(state),
    model: modelSelector(state),
    dirty: dirtySelector(state),
    formValidationErrors: formValidationErrorsSelector(state),
    loading: false,

    canEdit: hasEditAccessSelector(state),
  };
}

const action = {
  setEditAttributeProperty,
  closeAttributeSidebar,
  updateAttribute,
  loadAttributes,
  deleteAttribute,
};

export default withRouter(connect(mapStateToProps, action)(EditAttributeSidebar));

