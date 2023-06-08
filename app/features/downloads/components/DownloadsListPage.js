import autoBind from 'react-autobind';
import classNames from 'classnames';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {GridColumn} from '@progress/kendo-react-grid';
import {withRouter} from 'react-router';
import _ from 'lodash';

import {
  handleApiError,
  toastr,
} from '../../shared/services';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  navigationGroups,
} from '../../shared/constants';
import {
  CHARACTERISTICS_EXPORTER,
  LOCATION_STANDARDS_EXPORTER,
  STANDARD_DETAILS_EXPORTER,
  KRONOS_LABOR_STANDARD_EXPORTER,
  KRONOS_LABOR_PERIOD_EXPORTER,
  VOLUME_DRIVER_VALUES_EXPORTER,
  LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER,
  STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_EXPORTER,
} from '../../shared/constants/backgroundJobs';
import {DEBOUNCE_TIMEOUT} from '../../shared/constants/debounceTimeout';
import {
  CustomizableGrid,
  DateTimeCell,
  DownloadsFileTypeFilterCell,
} from '../../customizableGrid/components';
import {
  Notifications,
} from '../../notifications/components';
import {
  clearFinishedJob,
} from '../../notifications/actions';

import {
  fileTypes,
} from '../constants';
import {
  getDownload,
} from '../services';
import {
  filterDownloads,
  linkVisited,
  loadDownloadsList,
  sortDownloads,
} from '../actions';
import {
  downloadsSelector,
  filterSelector,
  finishedJobSelector,
  linkHistorySelector,
  loadingSelector,
  sortSelector,
} from '../selectors/pages/downloadsList';

class DownloadsListPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
    };
    autoBind(this);

    this.getData = _.debounce(this.getData, DEBOUNCE_TIMEOUT);
    this.reloadDownloadsDebounce = _.debounce(this.reloadDownloads, DEBOUNCE_TIMEOUT);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const {clearFinishedJob, finishedJob} = this.props;
    if (finishedJob !== prevProps.finishedJob) {
      this.reloadDownloads();
      clearFinishedJob();
    }
  }

  getData() {
    if (this.requestingData) return;
    this.requestingData = true;
    const {filter, sort, loadDownloadsList, router} = this.props;

    loadDownloadsList(filter, sort)
      .then(() => {
        this.setState({loading: false}, () => this.notRequestingData());
      })
      .catch(error => {
        this.setState({loading: false});
        this.notRequestingData();
        handleApiError(error, router, 'An error occurred while attempting to load the Downloads list.', 'Error');
      });
  }

  notRequestingData() {
    this.requestingData = false;
  }

  reloadDownloads() {
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  handleFilter({filter}) {
    this.props.filterDownloads(filter);
    this.reloadDownloadsDebounce();
  }

  handleSort({sort}) {
    this.props.sortDownloads(sort);
    this.reloadDownloadsDebounce();
  }

  handleRowClick({dataItem, nativeEvent}) {
    if (!dataItem.id || dataItem.fileType === 0) return;

    const columnIndex = nativeEvent.srcElement.cellIndex;
    if (columnIndex === 0) {
      this.props.linkVisited(dataItem.id);
      getDownload(dataItem.id, this.setDownloadStatus);
    }
  }

  setDownloadStatus(status) {
    const genericErrorMessage = 'Your download request is invalid.';
    if (status === 200) return;
    else if (status === 410) toastr.error('Your download request is expired.');
    else if (status === 401) toastr.error(genericErrorMessage);
    else if (status === 404) toastr.error('Your download request is still processing. Please try again in a moment.');
    else toastr.error(genericErrorMessage);
  }

  constructLinkCell(props) {
    const {linkHistory} = this.props;
    const fileLoading = props.dataItem.fileType === 0;
    const linkVisited = linkHistory[props.dataItem.id];

    const linkClassName = classNames(
      {
        'file-link-loading': fileLoading,
        'file-link-visited': linkVisited,
        'file-link': !linkVisited,
      }
    );

    return (
      <td className={linkClassName}>
        {props.dataItem.fileName}
      </td>
    );
  }

  constructFileTypeCell(props) {
    const fileTypeCode = props.dataItem.fileType;
    const fileTypeName = fileTypes.displayText(fileTypeCode);
    return (
      <td>
        {fileTypeName}
      </td>
    );
  }

  render() {
    const {
      loading,
      downloads,
      filter,
      sort,
    } = this.props;

    return (
      <Page>
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Downloads</PageTitle>
          <Notifications
            backgroundJobTypes={[CHARACTERISTICS_EXPORTER, LOCATION_STANDARDS_EXPORTER, STANDARD_DETAILS_EXPORTER, KRONOS_LABOR_STANDARD_EXPORTER, KRONOS_LABOR_PERIOD_EXPORTER, LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER, VOLUME_DRIVER_VALUES_EXPORTER, STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_EXPORTER]} />
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.MY_ACCOUNT} selectedNavigationSubGroup={navigationGroups.DOWNLOADS} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={downloads}
                  noFromJs
                  onRowClick={this.handleRowClick}
                  onFilter={this.handleFilter}
                  filter={filter}
                  onSort={this.handleSort}
                  sort={sort}
                  style={{height, width}}>
                  <GridColumn title="File Name" field="fileName" cell={this.constructLinkCell} />
                  <GridColumn title="File Type" field="fileType" filterCell={DownloadsFileTypeFilterCell} sortable={false} cell={this.constructFileTypeCell} />
                  <GridColumn title="Requested Date" field="expirationDate" filterable={false} cell={DateTimeCell} />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {

  return {
    loading: loadingSelector(state),
    linkHistory: linkHistorySelector(state),
    downloads: downloadsSelector(state),
    finishedJob: finishedJobSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    clearFinishedJob,
    filterDownloads,
    linkVisited,
    loadDownloadsList,
    sortDownloads,
  }
)(DownloadsListPage));
