import autoBind from 'react-autobind';
import ChangePasswordForm from './ChangePasswordForm';
import {connect} from 'react-redux';
import {validationErrorsSelector} from '../selectors/pages/changePassword';
import {List} from 'immutable';
import {withRouter} from 'react-router';
import {navigationGroups} from '../../shared/constants';
import {
  changePassword,
  resetChangePasswordForm,
  setChangePasswordFormField,
} from '../actions';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError, toastr} from '../../shared/services';

class ChangePasswordPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.resetChangePasswordForm();
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
        toastr.success('Password successfully changed.', 'Password Changed', 10000);
        router.goBack();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to change your password.', 'Error'));
  }

  render() {
    const {model, submitting, validationErrors} = this.props;

    return (
      <Page pageClassName="change-password-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Change Password</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.MY_ACCOUNT} />
          <MainContent>
            <ChangePasswordForm
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

ChangePasswordPage.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  resetChangePasswordForm: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(List).isRequired,
};

function mapStateToProps(state) {
  const {changePassword} = state.features.passwordManagement.pages;

  return {
    model: changePassword.get('model'),
    submitting: changePassword.get('submitting'),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    resetChangePasswordForm,
    handleFieldChange: setChangePasswordFormField,
    handleSubmit: changePassword,
  }
)(ChangePasswordPage));
