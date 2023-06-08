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
  loadPartFieldsList,
  sortPartFieldsList,
  showCreatePartField,
  filterPartFieldsList,
  selectPartField,
  clearSelectedPartField,
} from '../actions';
import {
  loadingSelector,
  sortedPartFieldsArraySelector,
  sortSelector,
  filterSelector,
  columnConfigurationSelector,
  dataSelector,
  selectedPartFieldIdSelector,
} from '../selectors/pages/list';
import {showSelector} from '../selectors/sidebars/edit';
import {partNameSelector} from '../../shared/selectors/components/settings';
import EditPartFieldSidebar from './EditPartFieldSidebar';
import CreatePartFieldModal from './CreatePartFieldModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {fromJS} from 'immutable';
import {CustomizableGrid} from '../../customizableGrid/components';
import {AutoSizer} from 'react-virtualized';

class PartFieldsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadPartFieldsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Part Fields list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortPartFieldsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterPartFieldsList(filter);
  }

  handleRowClick({dataItem}) {
    const {
      selectedPartFieldId,
      selectPartField,
      clearSelectedPartField,
    } = this.props;

    if (dataItem.id === selectedPartFieldId) clearSelectedPartField();
    else selectPartField(fromJS(dataItem));
  }

  render() {
    const {
      loading,
      sort,
      filter,
      data,
      handleShowCreatePartField,
      columns,
      partName,
    } = this.props;

    return (
      <Page pageClassName="part-fields-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{partName} Fields</PageTitle>
          <PageHeaderActions align="right">
            <Button onClick={handleShowCreatePartField}><i className="fa fa-plus" /></Button>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} selectedNavigationSubGroup={navigationGroups.PARTS} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={fromJS(data)}
                  style={{width, height}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  onRowClick={this.handleRowClick}
                  columns={columns} />
              )}
            </AutoSizer>
          </MainContent>
          <EditPartFieldSidebar />
        </PageBody>
        <CreatePartFieldModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    columns: columnConfigurationSelector(state),
    partFields: sortedPartFieldsArraySelector(state),
    sort: sortSelector(state),
    data: dataSelector(state),
    filter: filterSelector(state),
    selectedPartFieldId: selectedPartFieldIdSelector(state),
    sidebarShown: showSelector(state),
    partName: partNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadPartFieldsList,
    sortPartFieldsList,
    filterPartFieldsList,
    handleShowCreatePartField: showCreatePartField,
    selectPartField,
    clearSelectedPartField,
  }
)(PartFieldsListPage));
