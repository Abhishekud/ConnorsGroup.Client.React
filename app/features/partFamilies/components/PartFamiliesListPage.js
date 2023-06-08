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
import {layout, navigationGroups} from '../../shared/constants';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {STANDARDS_PARTS_AND_FAMILIES_EDIT} from '../../authentication/constants/permissions';
import {
  loadPartFamiliesList,
  sortPartFamiliesList,
  filterPartFamiliesList,
  showCreatePartFamily,
  selectPartFamily,
  clearSelectedPartFamily,
} from '../actions';
import {
  loadingSelector,
  sortedPartFamiliesArraySelector,
  sortSelector,
  filterSelector,
  dataSelector,
  columnConfigurationSelector,
  selectedPartFamilyIdSelector,
} from '../selectors/pages/list';
import {partFamilyNameSelector} from '../../shared/selectors/components/settings';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import PartFamiliesListEditSidebar from './PartFamiliesListEditSidebar';
import CreatePartFamilyModal from './CreatePartFamilyModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {
  AutoSizer,
} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {fromJS} from 'immutable';

class PartFamiliesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, partFamilyName} = this.props;
    this.props.loadPartFamiliesList()
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${partFamilyName} list.`, 'Error'));
  }

  handleSort({sort}) {
    this.props.sortPartFamiliesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterPartFamiliesList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedPartFamilyId, selectPartFamily, clearSelectedPartFamily} = this.props;

    if (dataItem.id === selectedPartFamilyId) clearSelectedPartFamily();
    else selectPartFamily(fromJS(dataItem));
  }

  render() {
    const {
      loading,
      sort,
      filter,
      data,
      columnsConfiguration,
      handleShowCreatePartFamily,
      sidebarShown,
      partFamilyName,
      canEdit,
    } = this.props;

    return (
      <Page pageClassName="part-families-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{pluralize(partFamilyName)}</PageTitle>
          {canEdit && <PageHeaderActions align="right">
            <Button onClick={handleShowCreatePartFamily}><i className="fa fa-plus" /></Button>
          </PageHeaderActions>}
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} selectedNavigationSubGroup={navigationGroups.PARTS} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    style={{width: width + (sidebarShown * layout.SIDEBAR_WIDTH), height}}
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
          <PartFamiliesListEditSidebar canEdit={canEdit} />
        </PageBody>
        <CreatePartFamilyModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_PARTS_AND_FAMILIES_EDIT);

  return {
    loading: loadingSelector(state),
    partFamilies: sortedPartFamiliesArraySelector(state),
    sort: sortSelector(state),
    selectedPartFamilyId: selectedPartFamilyIdSelector(state),
    sidebarShown: showSelector(state),
    partFamilyName: partFamilyNameSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    columnsConfiguration: columnConfigurationSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadPartFamiliesList,
    sortPartFamiliesList,
    filterPartFamiliesList,
    handleShowCreatePartFamily: showCreatePartFamily,
    selectPartFamily,
    clearSelectedPartFamily,
  }
)(PartFamiliesListPage));
