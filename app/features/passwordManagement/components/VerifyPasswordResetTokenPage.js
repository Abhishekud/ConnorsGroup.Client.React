import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import Spinner from 'react-tiny-spin';
import {verifyPasswordResetToken} from '../actions';
import {Link, withRouter} from 'react-router';
import {MainContent, Page, PageBody} from '../../layout/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class VerifyPasswordResetTokenPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {passwordResetToken} = this.props.params;

    this.props.verifyPasswordResetToken(passwordResetToken)
      .then(() => this.props.router.push(`/reset-password/${passwordResetToken}`));
  }

  render() {
    const {invalidToken} = this.props;

    return (
      <Page pageClassName="verify-password-reset-token-page">
        <PageBody>
          <MainContent>
            <div>
              {!invalidToken && <h1 className="standalone">Verifying your password reset request...<Spinner config={{left: '770px', top: '35px'}} /></h1>}
              {invalidToken && <h1 className="standalone">Sorry, but your link is either invalid or has expired. <Link to="/request-password-reset">Click here</Link> to request a new link.</h1>}
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

VerifyPasswordResetTokenPage.propTypes = {
  invalidToken: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  verifyPasswordResetToken: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {verifyPasswordResetToken} = state.features.passwordManagement.pages;

  return {
    invalidToken: verifyPasswordResetToken.get('invalidToken'),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    verifyPasswordResetToken,
  }
)(VerifyPasswordResetTokenPage));
