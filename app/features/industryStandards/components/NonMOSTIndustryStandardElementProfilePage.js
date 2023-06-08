import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {TimeFormatSelector} from '../../shared/components';
import {
  loadIndustryStandardNonMOSTElementDetails,
  toggleIndustryStandardNonMOSTElementProfile,
} from '../actions';
import {
  loadingSelector,
  nameSelector,
  timeSelector,
} from '../selectors/pages/nonMOSTIndustryStandardElementProfile';
import {AutoSizer} from 'react-virtualized';
import {
  NonMOSTStepsContainer,
} from '../../nonMOSTAnalysis/components';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {handleApiError, formatTMUs} from '../../shared/services';

class NonMOSTIndustryStandardElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.handleReload();
  }

  handleClose() {
    const {toggleIndustryStandardNonMOSTElementProfile} = this.props;
    toggleIndustryStandardNonMOSTElementProfile(null);
  }

  widthStyle(width) {
    return {
      width,
      paddingRight: '0',
    };
  }

  handleReload() {
    const {industryStandardId, industryStandardElementId, loadIndustryStandardNonMOSTElementDetails,
      toggleIndustryStandardNonMOSTElementProfile, router, industrySourceId} = this.props;

    loadIndustryStandardNonMOSTElementDetails(industrySourceId, industryStandardId, industryStandardElementId)
      .catch(error => {
        toggleIndustryStandardNonMOSTElementProfile();
        handleApiError(error, router, 'An error occurred while attempting to load the Timed Standard Element builder.', 'Error');
      });
  }

  render() {
    const {
      loading,
      name,
      timeFormat,
      time,
    } = this.props;
    return (
      <Page>
        <PageHeader>
          <PageHeaderActions>
            <span onClick={this.handleClose} className="clickable"><i className="fa fa-close" /> Close</span>
          </PageHeaderActions>
          <PageTitle>{name}</PageTitle>
          <PageHeaderActions>
            <div className="element-time">{formatTMUs(time, timeFormat)}</div>
            <TimeFormatSelector />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="items-wrapper" style={this.widthStyle(width)}>
                  <NonMOSTStepsContainer disabledBulkEdit readOnly />
                </div>
              )}
            </AutoSizer>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

NonMOSTIndustryStandardElementProfilePage.propTypes = {
  industryStandardId: PropTypes.number.isRequired,
  industryStandardElementId: PropTypes.number.isRequired,
  industrySourceId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    name: nameSelector(state),
    timeFormat: timeFormatSelector(state),
    time: timeSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryStandardNonMOSTElementDetails,
    toggleIndustryStandardNonMOSTElementProfile,
  }
)(NonMOSTIndustryStandardElementProfilePage));
