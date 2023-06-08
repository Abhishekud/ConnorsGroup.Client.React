import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
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
  loadAllowanceRestsList,
  sortAllowanceRestsList,
  filterAllowanceRestList,
  showCreateAllowanceRest,
  selectAllowanceRest,
  clearSelectedAllowanceRest,
} from '../actions';
import {
  loadingSelector,
  sortedAllowanceRestsArraySelector,
  sortSelector,
  selectedAllowanceRestIdSelector,
  columnConfigurationSelector,
  filterSelector,
  dataSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import AllowanceRestsListEditSidebar from './AllowanceRestsListEditSidebar';
import CreateAllowanceRestModal from './CreateAllowanceRestModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {
  AutoSizer,
} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {fromJS} from 'immutable';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ALLOWANCES_EDIT} from '../../authentication/constants/permissions';

class AllowanceRestsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadAllowanceRestsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the AllowanceRests list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortAllowanceRestsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterAllowanceRestList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedAllowanceRestId, selectAllowanceRest, clearSelectedAllowanceRest} = this.props;

    if (dataItem.id === selectedAllowanceRestId) clearSelectedAllowanceRest();
    else selectAllowanceRest(fromJS(dataItem));
  }

  render() {
    const {
      loading,
      sort,
      handleShowCreateAllowanceRest,
      filter,
      data,
      columnsConfiguration,
      canEdit,
    } = this.props;
    return (
      <Page pageClassName="allowanceRests-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Rests</PageTitle>
          <PageHeaderActions>
            {canEdit && <Button onClick={handleShowCreateAllowanceRest}><i className="fa fa-plus" /></Button>}
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
          <AllowanceRestsListEditSidebar />
        </PageBody>
        <CreateAllowanceRestModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ALLOWANCES_EDIT);
  return {
    loading: loadingSelector(state),
    columnsConfiguration: columnConfigurationSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    allowanceRests: sortedAllowanceRestsArraySelector(state),
    sort: sortSelector(state),
    selectedAllowanceRestId: selectedAllowanceRestIdSelector(state),
    sidebarShown: showSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadAllowanceRestsList,
    sortAllowanceRestsList,
    filterAllowanceRestList,
    handleShowCreateAllowanceRest: showCreateAllowanceRest,
    selectAllowanceRest,
    clearSelectedAllowanceRest,
  }
)(AllowanceRestsListPage));
