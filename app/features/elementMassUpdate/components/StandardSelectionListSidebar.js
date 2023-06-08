import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  openElementSearch,
  setEditMassUpdateElementWorkingModelProperty,
  toggleShowMassUpdate,
  massUpdateReplaceElement,
} from '../actions';
import {
  loadMOSTElement,
  loadNonMOSTElement,
} from '../../elements/actions';
import {
  EditSidebarSectionHeaderActions,
  Sidebar,
  SidebarSection,
} from '../../layout/components';
import {
  savingSelector,
  validationErrorsSelector,
  workingModelSelector,
} from '../selectors/sidebars/standardListSelection';
import {
  standardsSelector,
  elementTypeSelector,
} from '../selectors/pages/selectStandards';
import StandardSelectionListForm from './StandardSelectionListForm';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {PRODUCTION} from '../../standards/constants/standardStatuses';
import {MOST} from '../../elements/constants/elementTypes';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_MANAGE_PRODUCTION} from '../../authentication/constants/permissions';

class StandardSelectionListSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditMassUpdateElementWorkingModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {massUpdateReplaceElement, toggleShowMassUpdate, workingModel, router, params, elementType, loadMOSTElement, loadNonMOSTElement} = this.props;

    if (workingModel.get('standardIds').size === 0) {
      toastr.error('No Standards selected.');
      return;
    }

    massUpdateReplaceElement(params.id, workingModel)
      .then(() => {
        toggleShowMassUpdate();
        if (elementType === MOST) {
          loadMOSTElement(params.id);
        } else {
          loadNonMOSTElement(params.id);
        }
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Element.'));
  }

  handleCancel() {
    this.props.toggleShowMassUpdate();
  }

  handleEdit() {}

  handleSearch() {
    const {openElementSearch} = this.props;
    openElementSearch();
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setEditMassUpdateElementWorkingModelProperty(id, checked);
  }

  render() {
    const {
      workingModel,
      saving,
      validationErrors,
      standards,
      canManageProduction,
    } = this.props;

    const standardIds = workingModel.get('standardIds');
    const hasProductionStandards = standards.some(s => standardIds.includes(s.get('id')) && s.get('status') === PRODUCTION);
    return (
      <Sidebar closeable={false}>
        <EditSidebarSectionHeaderActions
          workingModel={workingModel} disabled={false}
          hasPermission={canManageProduction}
          editing saving={saving} saveText="Update" savingText="Updating..."
          onEdit={this.handleEdit} onSave={this.handleSave} onCancel={this.handleCancel} />
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Mass Update" collapsible={false}>
            <StandardSelectionListForm
              model={workingModel}
              canManageProduction={canManageProduction}
              validationErrors={validationErrors}
              editing onSearch={this.handleSearch}
              saving={saving}
              hasProductionStandards={hasProductionStandards}
              onFieldChange={this.handleFieldChange}
              onCheckboxChange={this.handleCheckboxChange}
              onSubmit={this.handleSave} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(STANDARDS_MANAGE_PRODUCTION);
  return state => ({
    workingModel: workingModelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    standards: standardsSelector(state),
    elementType: elementTypeSelector(state),
    canManageProduction: canManageProductionSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleShowMassUpdate,
    setEditMassUpdateElementWorkingModelProperty,
    openElementSearch,
    massUpdateReplaceElement,
    loadMOSTElement,
    loadNonMOSTElement,
  }
)(StandardSelectionListSidebar));
