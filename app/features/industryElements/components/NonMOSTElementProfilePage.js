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
import NonMOSTElementProfileSidebar from './NonMOSTElementProfileSidebar';
import {
  nonMOSTStepsSortedByNumberSelector,
} from '../../nonMOSTAnalysis/selectors/containers/nonMOSTSteps';
import {
  loadNonMOSTElementDetails,
  toggleNonMOSTElementProfileSidebar,
  selectIndustryElement,
} from '../actions';
import {
  loadingSelector,
} from '../selectors/pages/nonMOSTElementProfile';
import {
  elementDetailsModelSelector,
  showSelector,
} from '../selectors/sidebars/nonMOSTElementProfile';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  NonMOSTStepsContainer,
} from '../../nonMOSTAnalysis/components';
import {AutoSizer} from 'react-virtualized';
import {layout} from '../../shared/constants';
import {handleApiError, formatTMUs} from '../../shared/services';

class NonMOSTElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {params, loadNonMOSTElementDetails, router, location} = this.props;
    loadNonMOSTElementDetails(params.id, location.query.elementId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Timed Element builder.', 'Error'));
  }

  handleSidebarToggle() {
    this.props.toggleNonMOSTElementProfileSidebar();
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
      <Page pageClassName="timed-element-builder-page">
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
                  <NonMOSTStepsContainer readOnly disabledBulkEdit />
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <NonMOSTElementProfileSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    model: elementDetailsModelSelector(state),
    nonMOSTSteps: nonMOSTStepsSortedByNumberSelector(state),
    showSidebar: showSelector(state),
    timeFormat: timeFormatSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    toggleNonMOSTElementProfileSidebar,
    loadNonMOSTElementDetails,
    selectIndustryElement,
  }
)(NonMOSTElementProfilePage));
