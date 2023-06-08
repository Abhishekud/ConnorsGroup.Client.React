import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid, GridConfigurationButton, GridConfigurationSidebar} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {withRouter, Link} from 'react-router';
import {PropTypes} from 'prop-types';
import {
  sortSelector,
  filterSelector,
  columnsConfigurationSelector,
  loadingSelector,
  columnsSelector,
  showGridConfigurationSelector,
  totalCharacteristicStandardsSelector,
  skipSelector,
  takeSelector,
  tableDataSelector,
} from '../selectors/pages/characteristicStandardsList';
import {
  loadCharacteristicStandardsList,
  sortCharacteristicStandardsList,
  filterCharacteristicStandardsList,
  toggleCharacteristicStandardsGridConfigurationSidebar,
  toggleCharacteristicStandardsGridColumnVisibility,
  pageCharacteristicStandardsList,
  REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN,
} from '../actions';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import characteristicModelSelector from '../selectors/pages/characteristicStandardsList/characteristicModelSelector';

class CharacteristicStandardsListPage extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    const {
      loadCharacteristicStandardsList, router, params,
    } = this.props;
    loadCharacteristicStandardsList(params.id)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Characteristic where used.', 'Error'));
  }

  handleRowClick({dataItem}) {
    const {router, params} = this.props;
    router.push(`/standards/${dataItem.id}?return=characteristics-where-used/${params.id}%3Freturn=characteristics%3Freturn%3Dtrue`);
  }

  handlePageChange(event) {
    this.props.pageCharacteristicStandardsList(event.page.skip);
  }

  handleSort({sort}) {
    this.props.sortCharacteristicStandardsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterCharacteristicStandardsList(filter);
  }

  render() {

    const {
      loading,
      sort,
      filter,
      columnsConfiguration,
      pageOfCharacteristicStandards,
      toggleCharacteristicStandardsGridColumnVisibility,
      toggleGridConfigurationSidebar,
      columns,
      showGridConfiguration,
      totalCharacteristicStandards,
      skip,
      take,
      location,
      model,
    } = this.props;

    return (
      <Page pageClassName="characteristics-list-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={`/${location.query.return || 'characteristics'}`}><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle title={`${model.get('departmentName')} Standards Containing ${model.get('name')}`}>{model.get('departmentName')} <br /> <span className="title-subtext">Standards Containing <b>{model.get('name')}</b> </span> </PageTitle>
          <PageHeaderActions>
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    data={pageOfCharacteristicStandards}
                    style={{width, height: height - 50}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    onRowClick={this.handleRowClick}
                    onPageChange={this.handlePageChange}
                    total={totalCharacteristicStandards}
                    skip={skip} take={take}
                    columns={columns} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN} columns={columnsConfiguration} show={showGridConfiguration} toggleColumnVisibility={toggleCharacteristicStandardsGridColumnVisibility} />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    pageOfCharacteristicStandards: tableDataSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    columns: columnsSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    totalCharacteristicStandards: totalCharacteristicStandardsSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    model: characteristicModelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadCharacteristicStandardsList,
    toggleCharacteristicStandardsGridColumnVisibility,
    toggleGridConfigurationSidebar: toggleCharacteristicStandardsGridConfigurationSidebar,
    sortCharacteristicStandardsList,
    filterCharacteristicStandardsList,
    pageCharacteristicStandardsList,
  }
)(CharacteristicStandardsListPage));

CharacteristicStandardsListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object,
  pageOfCharacteristicStandards: PropTypes.object.isRequired,
  columnsConfiguration: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  showGridConfiguration: PropTypes.bool.isRequired,
  totalCharacteristicStandards: PropTypes.number,
  skip: PropTypes.number,
  take: PropTypes.number,
  model: PropTypes.object.isRequired,

  loadCharacteristicStandardsList: PropTypes.func.isRequired,
  toggleCharacteristicStandardsGridColumnVisibility: PropTypes.func.isRequired,
  toggleGridConfigurationSidebar: PropTypes.func.isRequired,
  sortCharacteristicStandardsList: PropTypes.func.isRequired,
  filterCharacteristicStandardsList: PropTypes.func.isRequired,
  pageCharacteristicStandardsList: PropTypes.func.isRequired,
};
