import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {AutoSizer} from 'react-virtualized';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import _ from 'lodash';

import {PAGE_SIZE} from '../../../shared/constants/virtualPaging';
import {showCreateExportRequest} from '../../../shared/actions';
import {CreateExportRequestModal} from '../../../shared/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {layout, navigationGroups} from '../../../shared/constants';

import {CustomizableGrid} from '../../../customizableGrid/components';
import {
  BulkEditLaborStandardSidebar,
  ImportLaborStandardsModal,
} from './';
import {
  showImportLaborStandardsModal,
  loadLaborStandardsList,
  showBulkEditLaborStandardSidebar,
  selectLaborStandard,
  toggleSelectAllLaborStandards,
  filterLaborStandards,
  sortLaborStandards,
} from '../actions';
import {
  columnsSelector,
  numberOfSidebarsOpenSelector,
  selectedLaborStandardIdsSelector,
  allLaborStandardsSelectedSelector,
  hasLaborStandardSelectedSelector,
  filterSelector,
  sortSelector,
} from '../selectors/pages/list';
import {REFLEXIS_EDIT} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';

class LaborStandardsPage extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);

    this.state = {data: [], skip: 0, total: 0};
    this.getData = _.debounce(this.getData, 800);
    this.updateData = _.debounce(this.getData, 1500);
  }


  componentDidMount() {
    this.requestData();
  }

  handleExport() {
    this.props.showCreateExportRequest();
  }

  handleExportRequest(exportRequestId) {
    window.location.href = `${process.env.API_BASE_URL}reflexis/labor-standards/export/${exportRequestId}`;
  }

  requestData() {
    const {skip, data} = this.state;
    if (data.length === 0 || data.slice(skip, skip + PAGE_SIZE).some(x => typeof x.id === 'undefined')) {
      this.getData();
    }
  }

  getData() {
    if (this.requestingData) return;
    this.requestingData = true;
    const {data} = this.state;
    const {filter, sort} = this.props;
    const skip = Math.max(0, this.state.skip - PAGE_SIZE);

    this.props
      .loadLaborStandardsList(filter, sort, skip, 100)
      .then(response => {
        const {laborStandards, total} = response.value.data;
        const standards =
          data.length === total
            ? data
            : new Array(total).fill().map((e, i) => ({index: i})); // Have a slot for every labor standard to fill

        laborStandards.forEach((std, i) => {
          standards[i + skip] = {index: i, ...std};
        });

        this.setState({data: standards, total});
        this.requestingData = false;
        this.requestData();
      })
      .catch(error => console.error(error));
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.setState({skip});
    this.requestData();
  }

  /* checkbox on the grid is clicked */
  handleSelectionClick({dataItem}) {
    this.props.selectLaborStandard(dataItem.id);
  }

  /* row in the grid is clicked */
  handleRowClick(e) {
    this.handleSelectionClick(e);
  }

  /* Checkbox in the grid header is clicked */
  handleSelectAllClick() {
    this.props.toggleSelectAllLaborStandards();
  }

  handleFilter({filter}) {
    this.props.filterLaborStandards(filter);
    this.setState({data: [], skip: 0});
    this.updateData();
  }

  handleSort({sort}) {
    this.props.sortLaborStandards(sort);
    this.setState({data: [], skip: 0});
    this.updateData();
  }

  handleOpenBulkEditSidebar() {
    this.props.showBulkEditLaborStandardSidebar();
  }

  handleBulkEdit() {
    this.setState({data: []});
    this.getData();
  }

  /* close the bulk edit sidebar */
  handleBulkEditCancel() {

  }

  render() {
    const {
      loading,
      canEdit,
      showImportLaborStandardsModal,
      columns,
      hasLaborStandardSelected,

      numberOfSidebarsOpen,
      filter,
      sort,
      selectedLaborStandardIds,
      allLaborStandardsSelected,
    } = this.props;

    const {
      data,
      skip,
      total,
    } = this.state;

    const page =
      data.slice(skip, skip + PAGE_SIZE)
        .map(x => {
          x.selected = allLaborStandardsSelected || selectedLaborStandardIds.has(x.id);
          return x;
        });

    return (
      <Page pageClassName="reflexis-labor-standards-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Standards</PageTitle>
          <PageHeaderActions>
            <Button onClick={this.handleExport} variant="outline-primary">
              <i className="fa fa-file-excel-o" />
            </Button>
            {hasLaborStandardSelected && <Button onClick={this.handleOpenBulkEditSidebar}>
              <i className="fa fa-pencil" />
            </Button>}
            {canEdit && <Dropdown id="add" className="btn-default header-button" pullRight disabled={false}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={showImportLaborStandardsModal}>
                  Import mappings between Reflexis Labor Standards and Attributes
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.REFLEXIS_MODULE} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({height, width}) => (
                <CustomizableGrid
                  data={page}
                  noFromJs

                  /* Paging */
                  skip={skip}
                  total={total}
                  pageSize={PAGE_SIZE}
                  scrollable={'virtual'}
                  onPageChange={this.handlePageChange}

                  /* Selecting */
                  selectedField={'selected'}
                  onSelectedChange={this.handleSelectionClick}
                  onHeaderSelectedChange={this.handleSelectAllClick}
                  onRowClick={this.handleRowClick}

                  /* Filtering */
                  onFilter={this.handleFilter}
                  filter={filter}

                  /* Sorting */
                  onSort={this.handleSort}
                  sort={sort}

                  /* Styles */
                  style={{height, width: width + numberOfSidebarsOpen * layout.SIDEBAR_WIDTH}}
                  rowHeight={40}
                  columns={columns} />
              )}
            </AutoSizer>
          </MainContent>
          <ImportLaborStandardsModal />
          <CreateExportRequestModal title="Labor Standard Export" onExportRequestCreated={this.handleExportRequest} />
          <BulkEditLaborStandardSidebar onBulkEdit={this.handleBulkEdit} />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_EDIT);

  return {
    loading: false,
    canEdit: canEditSelector(state),
    columns: columnsSelector(state),
    numberOfSidebarsOpen: numberOfSidebarsOpenSelector(state),
    selectedLaborStandardIds: selectedLaborStandardIdsSelector(state),
    allLaborStandardsSelected: allLaborStandardsSelectedSelector(state),
    hasLaborStandardSelected: hasLaborStandardSelectedSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
  };
}

const actions = {
  showImportLaborStandardsModal,
  showCreateExportRequest,
  loadLaborStandardsList,
  showBulkEditLaborStandardSidebar,
  selectLaborStandard,
  toggleSelectAllLaborStandards,
  filterLaborStandards,
  sortLaborStandards,
};

LaborStandardsPage.propTypes = {
  loading: PropTypes.bool.isRequired,

  // Permissions
  canEdit: PropTypes.bool.isRequired,

  // handlers
  showImportLaborStandardsModal: PropTypes.func.isRequired,
  showCreateExportRequest: PropTypes.func.isRequired,
  showBulkEditLaborStandardSidebar: PropTypes.func.isRequired,
  selectLaborStandard: PropTypes.func.isRequired,
  toggleSelectAllLaborStandards: PropTypes.func.isRequired,
  filterLaborStandards: PropTypes.func.isRequired,
  sortLaborStandards: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(LaborStandardsPage));

