import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Dropdown, MenuItem} from 'react-bootstrap';

import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {navigationGroups} from '../../../shared/constants';

import {ImportStoreAttributesModal} from './';
import {showImportStoreAttributesModal} from '../actions';
import {REFLEXIS_EDIT} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';


class StoreAttributesPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {loading, canEdit, showImportStoreAttributesModal} = this.props;

    return (
      <Page pageClassName="reflexis-store-attributes-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Store Attributes</PageTitle>
          <PageHeaderActions>
            {canEdit && <Dropdown id="add" className="btn-default header-button" pullRight disabled={false}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={showImportStoreAttributesModal}>
                  Import Reflexis Store Attributes
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.REFLEXIS_MODULE} />
          <MainContent loading={loading} />
          <ImportStoreAttributesModal />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_EDIT);

  return {
    loading: false,
    canEdit: canEditSelector(state),
  };
}

const actions = {
  showImportStoreAttributesModal,
};

StoreAttributesPage.propTypes = {
  loading: PropTypes.bool.isRequired,

  // Permissions
  canEdit: PropTypes.bool.isRequired,

  // handlers
  showImportStoreAttributesModal: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(StoreAttributesPage));

