import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {TimeFormatSelector} from '../../shared/components';
import MOSTElementProfileSidebar from './MOSTElementProfileSidebar';
import {
  loadMOSTElementDetails,
  toggleMOSTElementProfileSidebar,
  selectIndustryElement,
} from '../actions';
import {
  loadingSelector,
} from '../selectors/pages/mostElementProfile';
import {
  elementDetailsModelSelector,
  showSelector,
} from '../selectors/sidebars/mostElementProfile';
import {
  mostStepsSortedByNumberSelector,
} from '../../mostAnalysis/selectors/containers/mostSteps';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  MOSTStepsContainer,
} from '../../mostAnalysis/components';
import {AutoSizer} from 'react-virtualized';
import {layout} from '../../shared/constants';
import {handleApiError, formatTMUs} from '../../shared/services';
class MOSTElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {params, loadMOSTElementDetails, router, location} = this.props;
    loadMOSTElementDetails(params.id, location.query.elementId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the MOST Element profile.', 'Error'));
  }

  handleSidebarToggle() {
    this.props.toggleMOSTElementProfileSidebar();
  }

  handleAdd() {
    const {selectIndustryElement, location, router} = this.props;
    const elementId = Number.parseInt(location.query.elementId, 10);
    selectIndustryElement(elementId, true);
    router.push('/elements?return=true');
  }

  widthStyle(width, sidebarShown) {
    const sidebars = sidebarShown ? 1 : 0;
    return {
      width: width + (sidebarShown ? 30 : 0) + sidebars * layout.SIDEBAR_WIDTH,
      paddingRight: sidebarShown ? '30px' : '0',
    };
  }


  render() {
    const {
      showSidebar,
      loading,
      model,
      timeFormat,
      params,
      location,
    } = this.props;
    const standardId = location.query.standardId;

    return (
      <Page pageClassName="most-element-builder-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={standardId ? `/industry-standards/${params.id}?standardId=${standardId}` : '/elements?return=true'}><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle title={`${model.get('id') || ''} - ${model.get('name') || ''}`}>
            {`${model.get('id') || ''} - ${model.get('name') || ''}`}
          </PageTitle>
          <PageHeaderActions>
            <div className="element-time">{formatTMUs(model.get('measuredTimeMeasurementUnits'), timeFormat)}</div>
            {!standardId && <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>}
            <TimeFormatSelector />
            <div className="flyout-button">
              <Button className={showSidebar ? 'btn-wheat' : 'btn-default'} onClick={this.handleSidebarToggle}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="items-wrapper" style={this.widthStyle(width, showSidebar)}>
                  <MOSTStepsContainer mostType={model.get('mostType')} disabledBulkEdit
                    readOnly />
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <MOSTElementProfileSidebar />

        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    model: elementDetailsModelSelector(state),
    mostSteps: mostStepsSortedByNumberSelector(state),
    showSidebar: showSelector(state),
    timeFormat: timeFormatSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    toggleMOSTElementProfileSidebar,
    loadMOSTElementDetails,
    selectIndustryElement,
  }
)(MOSTElementProfilePage));
