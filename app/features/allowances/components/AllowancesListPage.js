import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
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
import {
  loadAllowancesList,
  sortAllowancesList,
  filterAllowancesList,
  showCreateAllowance,
} from '../actions';
import {
  configurationIndustryAllowanceModuleSelector,
} from '../../shared/selectors/components/settings';
import {toggleIndustryAllowancesList} from '../../industryAllowances/actions';
import IndustryAllowancesListPage from '../../industryAllowances/components/IndustryAllowancesListPage';
import {showSelector as showIndustryAllowancesSelector} from '../../industryAllowances/selectors/pages/list';
import {
  loadingSelector,
  sortSelector,
  filterSelector,
  dataSelector,
  columnConfigurationSelector,
} from '../selectors/pages/list';
import CreateAllowanceModal from './CreateAllowanceModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {
  AutoSizer,
} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ALLOWANCES_EDIT} from '../../authentication/constants/permissions';

class AllowancesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadAllowancesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Allowances list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortAllowancesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterAllowancesList(filter);
  }

  handleRowClick({dataItem}) {
    const {router} = this.props;
    router.push(`allowances/${dataItem.id}`);
  }

  handleAddIndustryAllowances() {
    this.props.toggleIndustryAllowancesList();
  }

  render() {
    const {
      loading,
      sort,
      filter,
      data,
      canEdit,
      columnsConfiguration,
      handleShowCreateAllowance,
      showIndustryAllowancesList,
      showIndustryAllowance,
    } = this.props;

    if (showIndustryAllowancesList) {
      return <IndustryAllowancesListPage />;
    }

    return (
      <Page pageClassName="allowances-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Allowances</PageTitle>
          <PageHeaderActions>
            {canEdit && (
              <Dropdown id="createElement" pullRight className="header-button">
                <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {showIndustryAllowance && <MenuItem eventKey="1" onClick={this.handleAddIndustryAllowances}>Existing Industry Allowance</MenuItem>}
                  <MenuItem eventKey="2" onClick={handleShowCreateAllowance}>New Allowance</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} selectedNavigationSubGroup={navigationGroups.ALLOWANCES} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    style={{width, height}}
                    data={data}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    onRowClick={this.handleRowClick}
                    columns={columnsConfiguration} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
        </PageBody>
        <CreateAllowanceModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ALLOWANCES_EDIT);
  return {
    loading: loadingSelector(state),
    columnsConfiguration: columnConfigurationSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    canEdit: canEditSelector(state),
    showIndustryAllowancesList: showIndustryAllowancesSelector(state),
    showIndustryAllowance: configurationIndustryAllowanceModuleSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadAllowancesList,
    sortAllowancesList,
    filterAllowancesList,
    handleShowCreateAllowance: showCreateAllowance,
    toggleIndustryAllowancesList,
  }
)(AllowancesListPage));
