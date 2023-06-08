import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {handleApiError} from '../../shared/services';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {configurationKronosVersion} from '../../shared/selectors/components/settings';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../kronos/constants/KronosVersions';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  loadTumbleweedLogs,
  sortLogsList,
  filterLogsList,
} from '../actions';
import {
  columnsConfigurationSelector,
  filterSelector,
  loadingSelector,
  sortedLogsArraySelector,
  sortSelector,
} from '../selectors/pages/logs';
import scheduleTypeToName from '../services/scheduleTypeToName';
import {fromJS} from 'immutable';

class TumbleweedLogsPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadTumbleweedLogs, kronosVersion, params} = this.props;
    if (kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED) {
      window.location.href = '/';
    }
    loadTumbleweedLogs(params.scheduleType)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the schedules.'));
  }

  handleSort({sort}) {
    this.props.sortLogsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterLogsList(filter);
  }

  render() {
    const {
      loading,
      logs,
      params,
      sort,
      filter,
      columnsConfiguration,
    } = this.props;
    const scheduleTypeName = scheduleTypeToName(params.scheduleType);
    return (
      <Page pageClassName="tumbleweed-scheduling-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to="/export-scheduler/scheduling"><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle>Export Scheduling Logs for {scheduleTypeName}</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            {!loading && (
              <AutoSizer>
                {({width, height}) => (
                  <CustomizableGrid
                    data={fromJS(logs)}
                    style={{width, height}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    columns={columnsConfiguration} />
                )}
              </AutoSizer>
            )}
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

TumbleweedLogsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    logs: sortedLogsArraySelector(state),
    kronosVersion: configurationKronosVersion(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadTumbleweedLogs,
    sortLogsList,
    filterLogsList,
  }
)(TumbleweedLogsPage));
