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

export default function NotFoundPage() {
  return (
    <Page pageClassName="not-found-page">
      <PageHeader>
        <PageHeaderActions>
          <Link to="/"><i className="fa fa-caret-left" /> Home</Link>
        </PageHeaderActions>
        <PageTitle>Not Found</PageTitle>
        <PageHeaderActions />
      </PageHeader>
      <PageBody>
        <MainContent>
          <h1 className="standalone">The requested resource was not found.</h1>
        </MainContent>
      </PageBody>
    </Page>
  );
}
