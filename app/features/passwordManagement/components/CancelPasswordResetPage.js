import autoBind from 'react-autobind';
import {cancelPasswordReset} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Spinner from 'react-tiny-spin';
import {MainContent, Page, PageBody} from '../../layout/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CancelPasswordResetPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.cancelPasswordReset(this.props.params.passwordResetToken);
  }

  render() {
    const {invalidToken, passwordResetCanceled, submitting} = this.props;

    return (
      <Page pageClassName="cancel-password-reset-page">
        <PageBody>
          <MainContent>
            {submitting && <h1>Canceling your password reset request...<Spinner config={{left: '770px', top: '23px'}} /></h1>}
            {invalidToken && <h1>Sorry, but your link is either invalid or has expired. Please contact your administrator if further action is
              required. <Link to="/login">Click here</Link> to return to the login page.</h1>}
            {passwordResetCanceled && <h1><span>Your password reset request has been canceled. </span>
              <Link to="/login">Click here</Link> to return to the login page.</h1>}
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

CancelPasswordResetPage.propTypes = {
  cancelPasswordReset: PropTypes.func.isRequired,
  invalidToken: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  passwordResetCanceled: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {cancelPasswordReset} = state.features.passwordManagement.pages;

  return {
    invalidToken: cancelPasswordReset.get('invalidToken'),
    passwordResetCanceled: cancelPasswordReset.get('passwordResetCanceled'),
    submitting: cancelPasswordReset.get('submitting'),
  };
}

export default connect(
  mapStateToProps,
  {
    cancelPasswordReset,
  }
)(CancelPasswordResetPage);
