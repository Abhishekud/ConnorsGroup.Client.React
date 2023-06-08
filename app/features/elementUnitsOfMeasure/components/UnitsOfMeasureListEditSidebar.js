import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {
  mapSelectedOptionsToValues,
} from '../../forms/services';
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
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import CreateEditUnitOfMeasureForm from './CreateEditUnitOfMeasureForm';
import DeleteUnitOfMeasureModal from './DeleteUnitOfMeasureModal';
import {handleApiError} from '../../shared/services';
import {ELEMENT_UNITS_OF_MEASURE} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ELEMENTS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';

class UnitsOfMeasureListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {tagName, multiple} = event.target;

    if (tagName === 'SELECT' && multiple) {
      this.handleMultiSelectFieldChange(event);
    } else {
      this.handleInputFieldChange(event);
    }
  }

  handleMultiSelectFieldChange(event) {
    const {name, options} = event.target;
    this.props.setEditUnitOfMeasureModelProperty(name, List(mapSelectedOptionsToValues(options)));
  }

  handleInputFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditUnitOfMeasureModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      updateUnitOfMeasure,
      model,
      loadSelectListOptions,
      closeUnitsOfMeasureListEditSidebar,
      router,
    } = this.props;

    updateUnitOfMeasure(model)
      .then(() => {
        loadSelectListOptions(ELEMENT_UNITS_OF_MEASURE);
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

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      canEdit,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="units-of-measure-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onSave={this.handleSave} onCancel={this.handleCancel}
          hasPermission={canEdit}
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection
            className="unit-of-measure" title="Edit UOM" collapsible={false}>
            <CreateEditUnitOfMeasureForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canEdit} />
          </SidebarSection>
          <DeleteUnitOfMeasureModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_LIST_MANAGEMENT);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditUnitOfMeasureModelProperty,
    updateUnitOfMeasure,
    showDeleteUnitOfMeasure,
    closeUnitsOfMeasureListEditSidebar,
    loadSelectListOptions,
  }
)(UnitsOfMeasureListEditSidebar));
