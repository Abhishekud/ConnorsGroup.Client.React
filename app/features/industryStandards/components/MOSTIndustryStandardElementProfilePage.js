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
  loadIndustryStandardMOSTElementDetails,
  toggleIndustryStandardMOSTElementProfile,
} from '../actions';
import {
  loadingSelector,
  nameSelector,
  timeSelector,
} from '../selectors/pages/mostIndustryStandardElementProfile';
import {AutoSizer} from 'react-virtualized';
import {
  MOSTStepsContainer,
} from '../../mostAnalysis/components';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {handleApiError, formatTMUs} from '../../shared/services';

class MOSTIndustryStandardElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.handleReload();
  }

  handleClose() {
    const {toggleIndustryStandardMOSTElementProfile} = this.props;
    toggleIndustryStandardMOSTElementProfile(null);
  }


  widthStyle(width) {
    return {
      width,
      paddingRight: '0',
    };
  }

  handleReload() {
    const {industrySourceId, industryStandardId, industryStandardElementId, loadIndustryStandardMOSTElementDetails, toggleIndustryStandardMOSTElementProfile, router} = this.props;

    loadIndustryStandardMOSTElementDetails(industrySourceId, industryStandardId, industryStandardElementId)
      .catch(error => {
        toggleIndustryStandardMOSTElementProfile();
        handleApiError(error, router, 'An error occurred while attempting to load the MOST Standard Element builder.', 'Error');
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
                  <MOSTStepsContainer disabledBulkEdit readOnly />
                </div>
              )}
            </AutoSizer>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

MOSTIndustryStandardElementProfilePage.propTypes = {
  industrySourceId: PropTypes.string.isRequired,
  industryStandardId: PropTypes.number.isRequired,
  industryStandardElementId: PropTypes.number.isRequired,
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
    loadIndustryStandardMOSTElementDetails,
    toggleIndustryStandardMOSTElementProfile,
  }
)(MOSTIndustryStandardElementProfilePage));
