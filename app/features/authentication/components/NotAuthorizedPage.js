import {browserHistory} from 'react-router';
import React from 'react';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';

function handleBackClick() {
  browserHistory.goBack();
}

export default function NotAuthorizedPage() {
  return (
    <Page pageClassName="not-authorized-page">
      <PageHeader>
        <PageHeaderActions>
          <i className="fa fa-chevron-left back-button" onClick={handleBackClick} />
        </PageHeaderActions>
        <PageTitle>Not Authorized</PageTitle>
        <PageHeaderActions />
      </PageHeader>
      <PageBody>
        <MainContent>
          <h1 className="standalone">You are not authorized to access this resource.</h1>
        </MainContent>
      </PageBody>
    </Page>
  );
}
