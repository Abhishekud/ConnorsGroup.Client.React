import {Link} from 'react-router';
import React from 'react';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';

export default function SystemErrorPage() {
  return (
    <Page pageClassName="not-found-page">
      <PageHeader>
        <PageHeaderActions>
          <Link to="/"><i className="fa fa-caret-left" /> Home</Link>
        </PageHeaderActions>
        <PageTitle>System Error</PageTitle>
        <PageHeaderActions />
      </PageHeader>
      <PageBody>
        <MainContent>
          <h1 className="standalone">An unexpected error occurred, and we were unable to process your request.</h1>
        </MainContent>
      </PageBody>
    </Page>
  );
}
