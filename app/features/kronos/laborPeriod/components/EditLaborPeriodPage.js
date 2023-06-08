import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {handleApiError} from '../../../shared/services';
import makeCurrentUserHasPermissionSelector from '../../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {KRONOS_LABOR_PERIOD_EDIT} from '../../../authentication/constants/permissions';
import {
  modelSelector,
  dirtySelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import {
  cancelEdit,
  saveEdit,
  setPropertyForEdit,
  setAbsoluteHoursListItemPropertyForEdit,
  setOperationHoursListItemPropertyForEdit,
  setAfterOpenHoursListItemPropertyForEdit,
  setAfterCloseHoursListItemPropertyForEdit,
  addAbsoluteHoursListItemForEdit,
  addOperationHoursListItemForEdit,
  addAfterOpenHoursListItemForEdit,
  addAfterCloseHoursListItemForEdit,
  removeLaborPeriodListItemForEdit,
  showDeleteModal,
  loadLaborPeriod,
  clearModel,
} from '../actions';
import {LaborPeriodForm, DeleteLaborPeriodModal} from './';
import processLaborPeriodModelForSubmit from '../services/processLaborPeriodModelForSubmit';

class EditLaborPeriodPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadLaborPeriod, params, router} = this.props;
    loadLaborPeriod(params.id)
      .catch(
        error => handleApiError(error, router, 'An error occurred while attempting to load the Labor Period')
      );
  }

  handleCancel() {
    this.props.cancelEdit();
  }

  handleSave(event) {
    event.preventDefault();

    const {saveEdit, model, router, clearModel} = this.props;
    const retModel = processLaborPeriodModelForSubmit(model);
    saveEdit(retModel)
      .then(
        () => {
          clearModel();
          router.push('/kronos/laborperiods');
        },
        error => handleApiError(error, router, 'An error occurred while attempting to update this Labor Period.')
      );
  }

  handleDelete() {
    const {showDeleteModal, model} = this.props;
    showDeleteModal(model);
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForEdit(id, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setPropertyForEdit(id, checked);
  }

  handleAbsoluteHoursFieldChange(e) {
    const {id, value} = e.target;

    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setAbsoluteHoursListItemPropertyForEdit(index, retId, value);
  }

  handleOperationHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setOperationHoursListItemPropertyForEdit(index, retId, value);
  }

  handleAfterOpenHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setAfterOpenHoursListItemPropertyForEdit(index, retId, value);
  }

  handleAfterCloseHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setAfterCloseHoursListItemPropertyForEdit(index, retId, value);
  }

  handleAddAbsoluteHoursListItem() {
    this.props.addAbsoluteHoursListItemForEdit();
  }

  handleAddOperationHoursListItem() {
    this.props.addOperationHoursListItemForEdit();
  }

  handleAddAfterOpenHoursListItem() {
    this.props.addAfterOpenHoursListItemForEdit();
  }

  handleAddAfterCloseHoursListItem() {
    this.props.addAfterCloseHoursListItemForEdit();
  }

  handleRemoveLaborPeriodListItem(index) {
    this.props.removeLaborPeriodListItemForEdit(index);
  }

  render() {
    const {saving, model, dirty, canEdit} = this.props;
    const formValidationErrors = this.props.validationErrors;

    return (
      <Page pageClassName="edit-labor-period-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={'/kronos/laborperiods'}><i className="fa fa-caret-left" />Previous</Link>
          </PageHeaderActions>
          <PageTitle title="Edit Labor Period">Edit Labor Period</PageTitle>
          {canEdit && <PageHeaderActions>
            <Button bsStyle="default" className="Save" bsSize="small" disabled={!dirty} onClick={this.handleSave}>Save</Button>
            <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          </PageHeaderActions>}
        </PageHeader>
        <PageBody>
          <MainContent>
            <LaborPeriodForm
              onFieldChange={this.handleFieldChange}
              onLaborPeriodFieldChange={this.handleLaborPeriodFieldChange}
              onTrafficPatternFieldChange={this.handleTrafficPatternFieldChange}
              onLaborDistributionFieldChange={this.handleLaborDistributionFieldChange}
              onCheckboxChange={this.handleCheckboxChange}
              onAbsoluteHoursFieldChange={this.handleAbsoluteHoursFieldChange}
              onOperationHoursFieldChange={this.handleOperationHoursFieldChange}
              onAfterOpenHoursFieldChange={this.handleAfterOpenHoursFieldChange}
              onAfterCloseHoursFieldChange={this.handleAfterCloseHoursFieldChange}
              onAddAbsoluteHoursListItem={this.handleAddAbsoluteHoursListItem}
              onAddOperationHoursListItem={this.handleAddOperationHoursListItem}
              onAddAfterOpenHoursListItem={this.handleAddAfterOpenHoursListItem}
              onAddAfterCloseHoursListItem={this.handleAddAfterCloseHoursListItem}
              onRemoveLaborPeriodListItem={this.handleRemoveLaborPeriodListItem}
              onSubmit={this.handleSave}
              formValidationErrors={formValidationErrors}
              model={model}
              disabled={!canEdit} />
          </MainContent>
        </PageBody>
        <DeleteLaborPeriodModal />
      </Page>
    );
  }
}

EditLaborPeriodPage.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,

  cancelEdit: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,

  setPropertyForEdit: PropTypes.func.isRequired,

  setAbsoluteHoursListItemPropertyForEdit: PropTypes.func.isRequired,
  setOperationHoursListItemPropertyForEdit: PropTypes.func.isRequired,
  setAfterOpenHoursListItemPropertyForEdit: PropTypes.func.isRequired,
  setAfterCloseHoursListItemPropertyForEdit: PropTypes.func.isRequired,

  addAbsoluteHoursListItemForEdit: PropTypes.func.isRequired,
  addOperationHoursListItemForEdit: PropTypes.func.isRequired,
  addAfterOpenHoursListItemForEdit: PropTypes.func.isRequired,
  addAfterCloseHoursListItemForEdit: PropTypes.func.isRequired,
  removeLaborPeriodListItemForEdit: PropTypes.func.isRequired,

  canEdit: PropTypes.boolean,
};

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_PERIOD_EDIT);
  return {
    model: modelSelector(state),
    saving: false,
    dirty: dirtySelector(state),
    validationErrors: validationErrorsSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    cancelEdit,
    saveEdit,
    setPropertyForEdit,
    showDeleteModal,

    setAbsoluteHoursListItemPropertyForEdit,
    setOperationHoursListItemPropertyForEdit,
    setAfterOpenHoursListItemPropertyForEdit,
    setAfterCloseHoursListItemPropertyForEdit,

    addAbsoluteHoursListItemForEdit,
    addOperationHoursListItemForEdit,
    addAfterOpenHoursListItemForEdit,
    addAfterCloseHoursListItemForEdit,
    removeLaborPeriodListItemForEdit,

    loadLaborPeriod,
    clearModel,
  }
)(EditLaborPeriodPage));
