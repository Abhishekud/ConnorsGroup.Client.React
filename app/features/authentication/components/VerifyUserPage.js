import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {returnPathSelector} from '../selectors/pages/verifyUser';
import {loadSelectListsOptions} from '../../selectListOptions/actions';
import {
  loadAttributeSelectListOptions,
} from '../../attributes/actions';
import {loadCharacteristicSetSelectListOptions} from '../../characteristics/actions';
import {loadVolumeDriverSelectListOptions} from '../../volumeDrivers/actions';
import {loadVolumeDriverMappingSetSelectListOptions} from '../../volumeDriverMappings/actions';
import {loadUnitOfMeasureSelectListOptions} from '../../unitsOfMeasure/actions';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {selectListTypes} from '../../selectListOptions/constants';
import Spin from 'react-tiny-spin';
import {withRouter} from 'react-router';
import {loadIdentity, setReturnPath} from '../actions';
import {MainContent, Page, PageBody} from '../../layout/components';
import React, {Component} from 'react';
import {loadSettings, loadConfiguration, changeTimeFormat} from '../../shared/actions';
import {setTimeFormat} from '../../shared/services';

class VerifyUserPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {
      loadIdentity,
      setReturnPath,
      loadSelectListsOptions,
      loadAttributeSelectListOptions,
      loadCharacteristicSetSelectListOptions,
      loadVolumeDriverSelectListOptions,
      loadVolumeDriverMappingSetSelectListOptions,
      loadUnitOfMeasureSelectListOptions,
      loadSettings,
      loadConfiguration,
      returnPath,
      router,
      loadOrgHierarchyLevelsList,
      changeTimeFormat,
    } = this.props;

    loadIdentity()
      .then(() => {
        setReturnPath('');
        loadSettings().then(result => {
          setTimeFormat(result.value.data, changeTimeFormat);
        });
        loadSelectListsOptions(...selectListTypes.ALL);
        loadAttributeSelectListOptions();
        loadCharacteristicSetSelectListOptions();
        loadVolumeDriverSelectListOptions();
        loadVolumeDriverMappingSetSelectListOptions();
        loadUnitOfMeasureSelectListOptions();
        loadOrgHierarchyLevelsList();
        loadConfiguration().then(() => router.push(returnPath || '/'));
      })
      .catch(() => router.push('/log-in'));
  }

  render() {
    return (
      <Page pageClassName="verifying-user-page">
        <PageBody>
          <MainContent>
            <h1 style={{marginTop: '15px', paddingLeft: '15px'}}>Loading...<Spin config={{left: '260px', top: '65px'}} /></h1>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    returnPath: returnPathSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIdentity,
    setReturnPath,
    loadSelectListsOptions,
    loadAttributeSelectListOptions,
    loadCharacteristicSetSelectListOptions,
    loadVolumeDriverSelectListOptions,
    loadVolumeDriverMappingSetSelectListOptions,
    loadUnitOfMeasureSelectListOptions,
    loadSettings,
    loadConfiguration,
    loadOrgHierarchyLevelsList,
    changeTimeFormat,
  }
)(VerifyUserPage));
