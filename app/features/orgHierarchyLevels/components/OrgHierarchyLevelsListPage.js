import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {handleApiError} from '../../shared/services';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {navigationGroups} from '../../shared/constants';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {
  createOrgHierarchyLevel,
  loadOrgHierarchyLevelsList,
  showImportHierarchyLevelsModal,
} from '../actions';
import {
  loadingSelector,
  creatingSelector,
  orgHierarchyLevelsSortedByNumberSelector,
  maxOrgHierarchyLevelNumberSelector,
  hasDataSelector,
} from '../selectors/pages/list';
import OrgHierarchyLevelContainer from './OrgHierarchyLevelContainer';
import DeleteOrgHierarchyLevelModal from './DeleteOrgHierarchyLevelModal';
import {withRouter} from 'react-router';
import {importingSelector} from '../selectors/modals/importHierarchyLevels';
import ImportHierarchyLevelsModal from './ImportHierarchyLevelsModal';
import ImportHierarchyLevelsValidationErrorsModal from './ImportHierarchyLevelsValidationErrorsModal';

class OrgHierarchyLevelsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadOrgHierarchyLevelsList, router} = this.props;
    loadOrgHierarchyLevelsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Hierarchy Levels list.'));
  }

  handleCreate() {
    const {router} = this.props;
    this.props.createOrgHierarchyLevel(1)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add a Hierarchy Level.'));
  }

  handleExportImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}org-hierarchy-levels/import/template`;
  }

  render() {
    const {
      loading,
      creating,
      orgHierarchyLevels,
      maxNumber,
      hasData,
      canManageList,
      showImportHierarchyLevelsModal,
      importing,
    } = this.props;

    return (
      <Page>
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Hierarchy Levels</PageTitle>
          <PageHeaderActions align="right">
            {canManageList && <div className="flyout-button">
              <Button className="btn-default"
                title="Download Hierarchy Levels Import Template"
                onClick={this.handleExportImportTemplate}>
                <i className="fa fa-file-excel-o" />
              </Button>
            </div>
            }
            {canManageList && orgHierarchyLevels.size === 0 && <div className="flyout-button">
              <Button className="btn-default"
                title="Import Hierarchy Levels"
                onClick={showImportHierarchyLevelsModal} disabled={importing}>
                <i className="fa fa-plus" />
              </Button>
            </div>
            }
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} selectedNavigationSubGroup={navigationGroups.PROFILING_LIST_MANAGEMENT} />
          <MainContent loading={loading}>
            <div className="org-hierarchy-levels-container">
              {canManageList && orgHierarchyLevels.size === 0
                ? <Button bsStyle="primary" bsSize="large" disabled={creating} onClick={this.handleCreate} >{creating ? 'Adding...' : 'Add a Hierarchy Level'}</Button>
                : null}
              {orgHierarchyLevels.valueSeq().map(ohl =>
                <OrgHierarchyLevelContainer key={ohl.get('id')} orgHierarchyLevel={ohl} maxNumber={maxNumber} hasData={hasData} />)}
            </div>
          </MainContent>
          <DeleteOrgHierarchyLevelModal />
          <ImportHierarchyLevelsModal />
          <ImportHierarchyLevelsValidationErrorsModal />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageListSelector = makeCurrentUserHasPermissionSelector(PROFILING_LIST_MANAGEMENT);

  return {
    loading: loadingSelector(state),
    creating: creatingSelector(state),
    orgHierarchyLevels: orgHierarchyLevelsSortedByNumberSelector(state),
    maxNumber: maxOrgHierarchyLevelNumberSelector(state),
    hasData: hasDataSelector(state),
    canManageList: canManageListSelector(state),
    importing: importingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    createOrgHierarchyLevel,
    loadOrgHierarchyLevelsList,
    showImportHierarchyLevelsModal,
  }
)(OrgHierarchyLevelsListPage));
