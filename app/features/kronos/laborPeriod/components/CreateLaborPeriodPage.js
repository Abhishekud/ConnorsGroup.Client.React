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
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createLaborPeriod';
import {
  hideCreateModal,
  setPropertyForCreate,
  create,
  selectLaborPeriod,
  setAbsoluteHoursListItemPropertyForCreate,
  setOperationHoursListItemPropertyForCreate,
  setAfterOpenHoursListItemPropertyForCreate,
  setAfterCloseHoursListItemPropertyForCreate,
  addAbsoluteHoursListItemForCreate,
  addOperationHoursListItemForCreate,
  addAfterOpenHoursListItemForCreate,
  addAfterCloseHoursListItemForCreate,
  removeLaborPeriodListItemForCreate,
} from '../actions';
import {LaborPeriodForm} from './';
import processLaborPeriodModelForSubmit from '../services/processLaborPeriodModelForSubmit';

class CreateLaborPeriodPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    const {router} = this.props;
    this.props.hideCreateModal();
    router.push('/kronos/laborperiods');
  }

  handleSave(event) {
    event.preventDefault();
    const {create, model, router} = this.props;
    const retModel = processLaborPeriodModelForSubmit(model);
    create(retModel)
      .then(
        () => router.push('/kronos/laborperiods'),
        error => handleApiError(error, router, 'An error occurred while attempting to add this Labor Period.')
      );
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForCreate(id, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setPropertyForCreate(id, checked);
  }

  handleAbsoluteHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setAbsoluteHoursListItemPropertyForCreate(index, retId, value);
  }

  handleOperationHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setOperationHoursListItemPropertyForCreate(index, retId, value);
  }

  handleAfterOpenHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setAfterOpenHoursListItemPropertyForCreate(index, retId, value);
  }

  handleAfterCloseHoursFieldChange(e) {
    const {id, value} = e.target;
    const res = id.split('_', 2);
    const retId = res[0];
    const index = parseInt(res[1], 10);

    this.props.setAfterCloseHoursListItemPropertyForCreate(index, retId, value);
  }

  handleAddAbsoluteHoursListItem() {
    this.props.addAbsoluteHoursListItemForCreate();
  }

  handleAddOperationHoursListItem() {
    this.props.addOperationHoursListItemForCreate();
  }

  handleAddAfterOpenHoursListItem() {
    this.props.addAfterOpenHoursListItemForCreate();
  }

  handleAddAfterCloseHoursListItem() {
    this.props.addAfterCloseHoursListItemForCreate();
  }

  handleRemoveLaborPeriodListItem(index) {
    this.props.removeLaborPeriodListItemForCreate(index);
  }

  render() {
    const {model, saving, validationErrors, canEdit} = this.props;
    return (
      <Page pageClassName="create-labor-period-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={'/kronos/laborperiods'}><i className="fa fa-caret-left" />Previous</Link>
          </PageHeaderActions>
          <PageTitle title="Create Labor Period">Create Labor Period</PageTitle>
          {canEdit &&
            <PageHeaderActions>
              <Button bsStyle="default" className="Save" bsSize="small" disabled={saving} onClick={this.handleSave}>Save</Button>
              <Button bsStyle="default" className="cancel" bsSize="small" disabled={saving} onClick={this.handleCancel}>Cancel</Button>
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
              formValidationErrors={validationErrors}
              onSubmit={this.handleSave}
              model={model}
              disabled={!canEdit} />
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

CreateLaborPeriodPage.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  setPropertyForCreate: PropTypes.func.isRequired,

  setAbsoluteHoursListItemPropertyForCreate: PropTypes.func.isRequired,
  setOperationHoursListItemPropertyForCreate: PropTypes.func.isRequired,
  setAfterOpenHoursListItemPropertyForCreate: PropTypes.func.isRequired,
  setAfterCloseHoursListItemPropertyForCreate: PropTypes.func.isRequired,

  addAbsoluteHoursListItemForCreate: PropTypes.func.isRequired,
  addOperationHoursListItemForCreate: PropTypes.func.isRequired,
  addAfterOpenHoursListItemForCreate: PropTypes.func.isRequired,
  addAfterCloseHoursListItemForCreate: PropTypes.func.isRequired,
  removeLaborPeriodListItemForCreate: PropTypes.func.isRequired,

  hideCreateModal: PropTypes.func.isRequired,
  canEdit: PropTypes.boolean,
};

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_PERIOD_EDIT);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    saving: false,
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    hideCreateModal,
    setPropertyForCreate,

    create,
    selectLaborPeriod,

    setAbsoluteHoursListItemPropertyForCreate,
    setOperationHoursListItemPropertyForCreate,
    setAfterOpenHoursListItemPropertyForCreate,
    setAfterCloseHoursListItemPropertyForCreate,

    addAbsoluteHoursListItemForCreate,
    addOperationHoursListItemForCreate,
    addAfterOpenHoursListItemForCreate,
    addAfterCloseHoursListItemForCreate,
    removeLaborPeriodListItemForCreate,
  }
)(CreateLaborPeriodPage));
