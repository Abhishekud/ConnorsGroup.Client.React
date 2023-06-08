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
  dataSelector,
} from '../selectors/pages/unitOfMeasureStandardsList';
import {
  loadUnitOfMeasureStandardsList,
  sortUnitOfMeasureStandardsList,
  filterUnitOfMeasureStandardsList,
  toggleUnitOfMeasureStandardsGridConfigurationSidebar,
  toggleUnitOfMeasureStandardsGridColumnVisibility,
  REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN,
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
import unitOfMeasureModelSelector from '../selectors/pages/unitOfMeasureStandardsList/unitOfMeasureModelSelector';

class UnitOfMeasureStandardsListPage extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    const {
      loadUnitOfMeasureStandardsList, router, params,
    } = this.props;
    loadUnitOfMeasureStandardsList(params.id)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Unit Of Measure where used.', 'Error'));
  }

  handleRowClick({dataItem}) {
    const {router, params} = this.props;
    router.push(`/standards/${dataItem.id}?return=uom-where-used/${params.id}%3Freturn=standards-list-management%3Freturn%3Dtrue`);
  }

  handleSort({sort}) {
    this.props.sortUnitOfMeasureStandardsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterUnitOfMeasureStandardsList(filter);
  }

  render() {

    const {
      loading,
      sort,
      filter,
      columnsConfiguration,
      unitOfMeasureStandards,
      toggleUnitOfMeasureStandardsGridColumnVisibility,
      toggleGridConfigurationSidebar,
      columns,
      showGridConfiguration,
      location,
      model,
    } = this.props;

    return (
      <Page pageClassName="unitOfMeasures-list-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={`/${location.query.return || 'standards-list-management'}`}><i className="fa fa-caret-left" /> Previous</Link>
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
                    data={unitOfMeasureStandards}
                    style={{width, height: height - 50}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    onRowClick={this.handleRowClick}
                    columns={columns} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN} columns={columnsConfiguration} show={showGridConfiguration} toggleColumnVisibility={toggleUnitOfMeasureStandardsGridColumnVisibility} />
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
    unitOfMeasureStandards: dataSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    columns: columnsSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    model: unitOfMeasureModelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadUnitOfMeasureStandardsList,
    toggleUnitOfMeasureStandardsGridColumnVisibility,
    toggleGridConfigurationSidebar: toggleUnitOfMeasureStandardsGridConfigurationSidebar,
    sortUnitOfMeasureStandardsList,
    filterUnitOfMeasureStandardsList,
  }
)(UnitOfMeasureStandardsListPage));

UnitOfMeasureStandardsListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object,
  unitOfMeasureStandards: PropTypes.object.isRequired,
  columnsConfiguration: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  showGridConfiguration: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,

  loadUnitOfMeasureStandardsList: PropTypes.func.isRequired,
  toggleUnitOfMeasureStandardsGridColumnVisibility: PropTypes.func.isRequired,
  toggleGridConfigurationSidebar: PropTypes.func.isRequired,
  sortUnitOfMeasureStandardsList: PropTypes.func.isRequired,
  filterUnitOfMeasureStandardsList: PropTypes.func.isRequired,
};
