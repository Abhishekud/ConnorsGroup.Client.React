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
import {navigationGroups} from '../../shared/constants';
import {getDownload} from '../services';
import {
  updateDownloadStatus,
} from '../actions';
import {
  downloadStatusSelector,
} from '../selectors/pages/list';

class Downloads extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
    this.pollTimer = null;

  }

  componentDidMount() {
    const {params} = this.props;
    getDownload(params.id, this.setDownloadStatus);
  }

  setDownloadStatus(status) {
    const {updateDownloadStatus} = this.props;
    let message = 'Your download request is invalid.';
    if (status === 200) message = 'Your download request is completed.';
    else if (status === 410) message = 'Your download request is expired.';
    else if (status === 401) message = 'Your download request is invalid.';
    else if (status === 404) message = 'Your download request is invalid.';
    updateDownloadStatus(message);
  }


  render() {
    const {downloadStatusSelector} = this.props;
    let recalcStatus = null;
    if (!downloadStatusSelector) {
      recalcStatus = <i className="fa fa-spinner fa-spin" title="Downloading in progress...." />;
    }
    return (
      <Page pageClassName="Downloads-profile-page">
        <PageHeader>
          <PageTitle>Downloads </PageTitle>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.MY_ACCOUNT} selectedNavigationSubGroup={navigationGroups.DOWNLOADS} />
          <MainContent >
            {recalcStatus}
            <div>
              <h3 className="text-center">{downloadStatusSelector}</h3>
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}


function mapStateToProps(state) {
  return {
    downloadStatusSelector: downloadStatusSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    updateDownloadStatus,
  }
)(Downloads));
