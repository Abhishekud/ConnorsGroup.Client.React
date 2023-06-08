import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditUnitOfMeasureModelProperty,
  updateUnitOfMeasure,
  showDeleteUnitOfMeasure,
  closeUnitsOfMeasureListEditSidebar,
  loadUnitOfMeasureSelectListOptions,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import CreateEditUnitOfMeasureForm from './CreateEditUnitOfMeasureForm';
import DeleteUnitOfMeasureModal from './DeleteUnitOfMeasureModal';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {ACTIVE_STATUSES} from '../../selectListOptions/constants/selectListTypes';

class UnitsOfMeasureListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditUnitOfMeasureModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateUnitOfMeasure, model, loadUnitOfMeasureSelectListOptions, closeUnitsOfMeasureListEditSidebar, router} = this.props;

    updateUnitOfMeasure(model)
      .then(() => {
        loadUnitOfMeasureSelectListOptions();
        closeUnitsOfMeasureListEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Unit of Measure.'));
  }

  handleCancel() {
    this.props.closeUnitsOfMeasureListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteUnitOfMeasure} = this.props;
    showDeleteUnitOfMeasure(model);
  }

  handleUnitOfMeasureWhereUsed() {
    const {router, model} = this.props;
    if (model.get('standardsCount')) {
      router.push(`/uom-where-used/${model.get('id')}?return=standards-list-management%3Freturn%3Dtrue`);
    } else {
      toastr.error('Standards not found where unit of measure used.');
    }
  }
  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      activeStatuses,
      dirty,
      canManageStandardList,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="units-of-measure-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          dirty={dirty}
          onSave={this.handleSave} onCancel={this.handleCancel}
          hasPermission={canManageStandardList}
          editActions={
            canManageStandardList && <> <Button bsStyle="default" className="delete report-button" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button> <Button bsStyle="default" className="delete" bsSize="small" disabled={!model.get('standardsCount')} onClick={this.handleUnitOfMeasureWhereUsed}>
              <i className="fa fa-search" title="Where Used" />
            </Button>
            </>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection
            className="unit-of-measure" title="Edit UOM" collapsible={false}>
            <CreateEditUnitOfMeasureForm
              model={model}
              validationErrors={validationErrors}
              activeStatuses={activeStatuses}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canManageStandardList} />
          </SidebarSection>
          <DeleteUnitOfMeasureModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const activeStatusesSelector = makeSelectListOptionsArraySelector(ACTIVE_STATUSES);

  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    dirty: dirtySelector(state),
    validationErrors: validationErrorsSelector(state),
    activeStatuses: activeStatusesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditUnitOfMeasureModelProperty,
    updateUnitOfMeasure,
    showDeleteUnitOfMeasure,
    closeUnitsOfMeasureListEditSidebar,
    loadUnitOfMeasureSelectListOptions,
  }
)(UnitsOfMeasureListEditSidebar));
