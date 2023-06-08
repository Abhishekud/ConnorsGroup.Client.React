import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  toggleElementProfileBulkEditSidebar,
  setElementProfileBulkEditModelProperty,
  showDeleteSelectedElementSteps,
  selectAllElementStepsForBulkEdit,
  bulkUpdateElementSteps,
} from '../actions';
import {
  openSelector,
  modelSelector,
  savingSelector,
  selectedStepIdsSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/bulkEdit';
import ElementProfileBulkEditForm from './ElementProfileBulkEditForm';
import ConfirmDeleteSelectedElementStepsModal from './ConfirmDeleteSelectedElementStepsModal';
import {handleApiError, toastr} from '../../shared/services';

class ElementProfileBulkEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancelEdit() {
    this.props.toggleElementProfileBulkEditSidebar();
  }

  handleEdit() {
  }

  handleSave(e) {
    e.preventDefault();
    const {router, bulkUpdateElementSteps, id, model, onReload, toggleElementProfileBulkEditSidebar, isMOST, selectedSteps} = this.props;
    if (selectedSteps.size === 0) {
      toastr.error('No steps selected.', 'Error');
      return;
    }
    if (!model.get('updateSimo') && !model.get('updateFrequency')) {
      toastr.error('Nothing to update.', 'Error');
      return;
    }
    bulkUpdateElementSteps(id, model, isMOST)
      .then(() => {
        onReload();
        toggleElementProfileBulkEditSidebar();
      })
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to update the selected element elements.');
      });
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setElementProfileBulkEditModelProperty(name, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setElementProfileBulkEditModelProperty(id, checked);
  }

  handleDelete() {
    const {id, model, showDeleteSelectedElementSteps, isMOST} = this.props;

    showDeleteSelectedElementSteps(new Map({id, selectedStepIds: model.get('selectedStepIds'), isMOST}));
  }

  handleSelectAll() {
    const {selectAllElementStepsForBulkEdit, steps} = this.props;
    const ids = steps.map(x => x.get('id'));
    selectAllElementStepsForBulkEdit(ids);
  }

  render() {
    const {
      open,
      model,
      selectedSteps,

      saving,
      validationErrors,

      elementUnitsOfMeasure,
    } = this.props;

    if (!open || selectedSteps.size === 0) return null;

    const editActions = <Button className="btn btn-sm btn-default pull-right" disabled={saving} onClick={this.handleSelectAll}>Select All</Button>;
    return (
      <Sidebar className="element-profile">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onEdit={this.handleEdit} onCancel={this.handleCancelEdit} onSave={this.handleSave}
          editActions={editActions} />
        <div className="sidebar-scrollable">
          <SidebarSection
            className="element-details"
            title="Step Details"
            collapsible>
            <ElementProfileBulkEditForm
              model={model} validationErrors={validationErrors}
              creating={false} editing saving={saving}
              unitsOfMeasure={elementUnitsOfMeasure}
              onFieldChange={this.handleFieldChange}
              onCheckboxChange={this.handleCheckboxChange}
              onEditFormula={this.handleEditFormula}
              selectedSteps={selectedSteps}
              onSubmit={this.handleSave}
              onDelete={this.handleDelete} />
          </SidebarSection>
        </div>
        <ConfirmDeleteSelectedElementStepsModal />
      </Sidebar>
    );
  }
}

ElementProfileBulkEditSidebar.propTypes = {
  id: PropTypes.number.isRequired,
  steps: PropTypes.instanceOf(Map).isRequired,
  onReload: PropTypes.func.isRequired,
  isMOST: PropTypes.bool,
};

function makeMapStateToProps(state) {
  return {
    open: openSelector(state),

    model: modelSelector(state),
    selectedSteps: selectedStepIdsSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleElementProfileBulkEditSidebar,
    setElementProfileBulkEditModelProperty,
    showDeleteSelectedElementSteps,
    selectAllElementStepsForBulkEdit,
    bulkUpdateElementSteps,
  }
)(ElementProfileBulkEditSidebar));
