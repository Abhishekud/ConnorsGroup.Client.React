import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {Component} from 'react';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageTitle,
} from '../../layout/components';
import {toggleNavigationSidebar} from '../../layout/actions';
import {navigationGroups} from '../../shared/constants';
import {
  bulkExportDownloadReportStatus,
} from '../actions';
import {
  bulkExportDownloadStatusSelector,
} from '../selectors/pages/list';
import axios from 'axios';

class DownloadBulkExport extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
    this.pollTimer = null;

  }

  componentDidMount() {
    const {params, router} = this.props;
    axios.get(
      `${process.env.API_BASE_URL}standards/export/standard-report/${params.id}`,
      {
        responseType: 'blob',
        withCredentials: process.env.NODE_ENV !== 'production',
      }
    )
      .then(response => {
        if (response.status === 200) {
          const blobData = [response.data];
          const blob = new Blob(blobData, {type: 'application/octet-stream'});
          let filename = 'standard-report.zip';
          if (response.headers['content-disposition'] !== 'undefined') {
            const headerLine = response.headers['content-disposition'];
            filename = headerLine.substring(headerLine.indexOf('"') + 1, headerLine.lastIndexOf('"'));
          }
          const blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
          const tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = blobURL;
          tempLink.setAttribute('download', filename);
          /// below code is for safari fixes
          if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
          }

          document.body.appendChild(tempLink);
          tempLink.click();

          // Fixes "webkit blob resource error 1"
          setTimeout(() => {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);

            router.push('/standards');
          }, 200);
        } else {
          this.setDownloadStatus(response.status);
        }
      }).catch(e => {
        console.log(e.response.status);
        this.setDownloadStatus(e.response.status);
      });
  }

  setDownloadStatus(status) {
    const {bulkExportDownloadReportStatus, toggleNavigationSidebar} = this.props;
    toggleNavigationSidebar();
    let message = 'Your download request is invalid.';
    if (status === 410) message = 'Your download request is expired.';
    else if (status === 401) message = 'Your download request is invalid.';
    else if (status === 404) message = 'Your download request is invalid.';
    bulkExportDownloadReportStatus(message);
  }


  render() {
    const {bulkExportDownloadStatus} = this.props;
    return (
      <Page pageClassName="standards-list-page">
        <PageHeader>
          <PageTitle>Download Standard Export Reports</PageTitle>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} />
          <MainContent >
            <div>
              <h3 className="text-center">{bulkExportDownloadStatus}</h3>
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}


function mapStateToProps(state) {
  return {
    bulkExportDownloadStatus: bulkExportDownloadStatusSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    bulkExportDownloadReportStatus,
    toggleNavigationSidebar,
  }
)(DownloadBulkExport));
