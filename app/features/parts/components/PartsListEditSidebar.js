import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditPartFieldValueModelProperty,
  setEditPartModelProperty,
  updatePart,
  showDeletePart,
  closePartsListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import {partNameSelector} from '../../shared/selectors/components/settings';
import {selectedPartFamilyIdSelector} from '../selectors/pages/list';
import CreateEditPartForm from './CreateEditPartForm';
import DeletePartModal from './DeletePartModal';
import {PART_FIELDS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class PartsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditPartModelProperty(name, value);
  }

  handlePartFieldChange(event) {
    const {id, value} = event.target;
    this.props.setEditPartFieldValueModelProperty(id, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updatePart, closePartsListEditSidebar, selectedPartFamilyId, model, router, partName} = this.props;

    updatePart(selectedPartFamilyId, model)
      .then(() => closePartsListEditSidebar())
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${partName}`));
  }

  handleCancelEdit() {
    this.props.closePartsListEditSidebar();
  }

  handleDelete() {
    const {model, showDeletePart} = this.props;
    showDeletePart(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      partFields,
      partName,
      canEdit,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="parts-list-edit-sidebar">
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
          <SidebarSection className="part" title={`Edit ${partName}`} collapsible={false}>
            <CreateEditPartForm
              model={model}
              partFields={partFields}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onPartFieldChange={this.handlePartFieldChange}
              onSubmit={this.handleSave} disabled={!canEdit} />
          </SidebarSection>
          <DeletePartModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const partFieldsSelector = makeSelectListOptionsArraySelector(PART_FIELDS);

  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    partFields: partFieldsSelector(state),
    selectedPartFamilyId: selectedPartFamilyIdSelector(state),
    partName: partNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditPartFieldValueModelProperty,
    setEditPartModelProperty,
    updatePart,
    showDeletePart,
    closePartsListEditSidebar,
  }
)(PartsListEditSidebar));
