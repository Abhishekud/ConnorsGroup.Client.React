import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {validationErrorsSelector} from '../selectors/pages/requestPasswordReset';
import {Map} from 'immutable';
import RequestPasswordResetForm from './RequestPasswordResetForm';
import {withRouter} from 'react-router';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  requestPasswordReset,
  resetRequestPasswordResetForm,
  setRequestPasswordResetFormField,
} from '../actions';
import {handleApiError, toastr} from '../../shared/services';

class RequestPasswordResetPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.resetRequestPasswordResetForm();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.handleFieldChange(name, value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {handleSubmit, model, router} = this.props;

    handleSubmit(model)
      .then(() => {
        toastr.success(`Password reset instructions sent to ${model.get('email')}.`,
          'Password Reset', {timeout: 10000});
        router.push('/login');
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to request a password reset.', 'Error'));
  }

  render() {
    const {model, submitting, validationErrors} = this.props;

    return (
      <Page pageClassName="request-password-reset-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Request Password Reset</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <MainContent>
            <RequestPasswordResetForm
              model={model}
              submitting={submitting}
              validationErrors={validationErrors}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSubmit} />
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

RequestPasswordResetPage.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  resetRequestPasswordResetForm: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};

function mapStateToProps(state) {
  const {requestPasswordReset} = state.features.passwordManagement.pages;

  return {
    model: requestPasswordReset.get('model'),
    submitting: requestPasswordReset.get('submitting'),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    resetRequestPasswordResetForm,
    handleFieldChange: setRequestPasswordResetFormField,
    handleSubmit: requestPasswordReset,
  }
)(RequestPasswordResetPage));
