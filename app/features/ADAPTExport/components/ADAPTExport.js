import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {showCreateExportRequest} from '../../shared/actions';
import {navigationGroups} from '../../shared/constants';
import {CreateExportRequestModal} from '../../shared/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';

/// Export using the old calculation engine
const ButtonAction = ({onClick}) => (
  <Button onClick={onClick} variant="outline-primary">
    <i className="fa fa-file-excel-o" />
  </Button>
);

class ADAPTExport extends Component {
  constructor(context, props) {
    super(context, props);
    autoBind(this);
  }

  handleExportRequest(exportRequestId) {
    window.location.href = `${process.env.API_BASE_URL}adapt-export/export-task/${exportRequestId}`;
  }

  handleExport() {
    this.props.showCreateExportRequest();
  }

  render() {
    return (
      <Page>
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Adapt Export</PageTitle>
          <PageHeaderActions align="right">
            <ButtonAction onClick={this.handleExport} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar
            selectedNavigationGroup={navigationGroups.OUTPUTS} />
          <MainContent loading={false} />
          <CreateExportRequestModal title="ADAPT Export" onExportRequestCreated={this.handleExportRequest} />
        </PageBody>
      </Page>
    );
  }
}

ADAPTExport.propTypes = {

  // actions
  showCreateExportRequest: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  {
    showCreateExportRequest,
  })(ADAPTExport)
);
