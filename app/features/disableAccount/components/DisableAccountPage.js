import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {disableAccount} from '../actions';
import {Link} from 'react-router';
import Spinner from 'react-tiny-spin';
import {MainContent, Page, PageBody} from '../../layout/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class DisableAccountPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.disableAccount(this.props.params.disableAccountToken);
  }

  render() {
    const {invalidToken, accountDisabled, submitting} = this.props;

    return (
      <Page pageClassName="disable-account-page">
        <PageBody>
          <MainContent>
            {submitting && <h1 className="standalone">Disabling your account...<Spinner config={{left: '500px', top: '23px'}} /></h1>}
            {invalidToken &&
            <h1 className="standalone">Sorry, but your link is either invalid or has expired. Please contact your administrator
              if further action is required. <Link to="/login">Click here</Link> to return to the login page.</h1>}
            {accountDisabled &&
            <h1 className="standalone">Your account has been disabled. Please contact your administrator to re-enable.</h1>}
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

DisableAccountPage.propTypes = {
  accountDisabled: PropTypes.bool.isRequired,
  disableAccount: PropTypes.func.isRequired,
  invalidToken: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {disableAccount} = state.features.disableAccount.pages;

  return {
    accountDisabled: disableAccount.get('accountDisabled'),
    invalidToken: disableAccount.get('invalidToken'),
    submitting: disableAccount.get('submitting'),
  };
}

export default connect(
  mapStateToProps,
  {
    disableAccount,
  }
)(DisableAccountPage);
