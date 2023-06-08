import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {navigationGroups} from '../../shared/constants';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {Terms} from './';
import {loadingSelector} from '../../users/selectors/pages/list';

const TermsReviewPage = ({loading}) =>
  (<Page pageClassName="terms-page">
    <PageHeader>
      <PageHeaderActions />
      <PageTitle>SOFTWARE AND SERVICES AGREEMENT</PageTitle>
    </PageHeader>
    <PageBody>
      <NavigationSidebar selectedNavigationGroup={navigationGroups.MY_ACCOUNT} />
      <MainContent loading={loading}>
        <div className="terms">
          <Terms />
        </div>
      </MainContent>
    </PageBody>
  </Page>);

TermsReviewPage.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {}
)(TermsReviewPage));
