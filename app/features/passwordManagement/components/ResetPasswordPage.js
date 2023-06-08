import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {validationErrorsSelector} from '../selectors/pages/resetPassword';
import {List} from 'immutable';
import ResetPasswordForm from './ResetPasswordForm';
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
  resetPassword,
  resetResetPasswordForm,
  setResetPasswordFormField,
} from '../actions';
import {handleApiError, toastr} from '../../shared/services';

class ResetPasswordPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.resetResetPasswordForm(this.props.params.passwordResetToken);
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
        toastr.success('Password successfully reset.', 'Password Reset', 10000);
        router.push('/login');
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to reset your password.', 'Error'));
  }

  render() {
    const {model, submitting, validationErrors} = this.props;

    return (
      <Page pageClassName="reset-password-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Reset Password</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <MainContent>
            <ResetPasswordForm
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

ResetPasswordPage.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  resetResetPasswordForm: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(List).isRequired,
};

function mapStateToProps(state) {
  const {resetPassword} = state.features.passwordManagement.pages;

  return {
    model: resetPassword.get('model'),
    submitting: resetPassword.get('submitting'),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    resetResetPasswordForm,
    handleFieldChange: setResetPasswordFormField,
    handleSubmit: resetPassword,
  }
)(ResetPasswordPage));
