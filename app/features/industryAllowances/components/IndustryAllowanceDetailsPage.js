import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {Button} from 'react-bootstrap';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {AutoSizer} from 'react-virtualized';
import {layout} from '../../shared/constants';
import {
  toggleIndustryAllowanceDetailsSidebar,
  loadIndustryTypicalAllowance,
  selectIndustryAllowance,
  loadIndustryAllowanceRest,
} from '../actions';
import {
  allowanceSelector,
  loadingSelector,
  paidTimeSelector,
  adjustedPaidTimeSelector,
  reliefTimeSelector,
  totalIncludedPaidTimeSelector,
} from '../selectors/pages/details';
import {
  showSelector,
  workingModelSelector,
} from '../selectors/sidebars/industryAllowanceDetails';
import {workingModelSelector as industryAllowanceRestModel} from '../selectors/sidebars/industryAllowanceRestDetails';
import {handleApiError} from '../../shared/services';
import {
  UNPAID,
  EXCLUDED_PAID,
  INCLUDED_PAID_SCHEDULED,
  INCLUDED_PAID_UNSCHEDULED,
  INCLUDED_PAID_OTHER,
} from '../../allowances/constants/allowanceTimeTypes';
import IndustryAllowanceTime from './IndustryAllowanceTime';
import {allowanceDefinitions} from '../../allowances/constants';
import IndustryAllowanceTimeGroupContainer from './IndustryAllowanceTimeGroupContainer';
import IndustryAllowanceRestTimeContainer from './IndustryAllowanceRestTimeContainer';
import IndustryAllowanceDelayTimeGroupContainer from './IndustryAllowanceDelayTimeGroupContainer';
import IndustryAllowancePercentagesContainer from './IndustryAllowancePercentagesContainer';
import IndustryAllowanceDetailsSidebar from './IndustryAllowanceDetailsSidebar';

class IndustryAllowanceDetailsPage extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadIndustryTypicalAllowance, router, params} = this.props;
    loadIndustryTypicalAllowance(params.selectedIndustrySourceId, params.id)
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to load the Industry Allowance builder.', 'Error');
        router.push('/allowances');
      });
  }

  widthStyle(width, sidebarShown) {
    const sidebars = sidebarShown ? 1 : 0;
    return {
      width: width + (sidebars * layout.SIDEBAR_WIDTH),
      paddingRight: sidebarShown ? '30px' : '0',
    };
  }

  handleAddIndustryAllowance() {
    const {selectIndustryAllowance, router, allowance} = this.props;
    selectIndustryAllowance(allowance.id, true);
    router.push('/allowances?return=true');
  }

  handleToggleSidebar() {
    const {handleToggleAllowanceDetailsSidebar, workingModel, model, params,
      loadIndustryAllowanceRest, router, show,
    } = this.props;
    handleToggleAllowanceDetailsSidebar();
    const allowanceRestId = workingModel.get('allowanceRestId');
    if (allowanceRestId && allowanceRestId !== model.get('id') && !show) {
      loadIndustryAllowanceRest(params.selectedIndustrySourceId, allowanceRestId)
        .catch(error => {
          handleApiError(error, router, 'An error occurred while attempting to load the Industry Allowance Rest Calculation Details.', 'Error');
          router.push('/allowances');
        });
    }
  }

  render() {
    const {
      loading,
      sidebarShown,
      allowance,
      paidTime,
      adjustedPaidTime,
      reliefTime,
      totalIncludedPaidTime,
    } = this.props;

    return (
      <Page pageClassName="allowances-builder-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to="/allowances?return=true"><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle>{allowance.name || ''}</PageTitle>
          <PageHeaderActions>
            <Button bsStyle="primary" onClick={this.handleAddIndustryAllowance}>Add</Button>
            <div className="flyout-button">
              <Button className={sidebarShown ? 'btn-wheat' : 'btn-default'}
                onClick={this.handleToggleSidebar}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="allowance-times-wrapper" style={this.widthStyle(width, sidebarShown)}>
                  <div className="allowance-times-container">
                    <IndustryAllowanceTimeGroupContainer
                      name="Unpaid Time"
                      definition={allowanceDefinitions.UNPAID_TIME}
                      allowanceId={allowance.id}
                      allowanceTimeType={UNPAID} />
                    <IndustryAllowanceTime allowanceTime={paidTime} />
                    <IndustryAllowanceTimeGroupContainer
                      name="Excluded Paid Time"
                      definition={allowanceDefinitions.EXCLUDED_PAID_TIME}
                      allowanceId={allowance.id}
                      allowanceTimeType={EXCLUDED_PAID} />
                    <IndustryAllowanceTime allowanceTime={adjustedPaidTime} />
                    <IndustryAllowanceTime allowanceTime={reliefTime} />
                    <IndustryAllowanceTime allowanceTime={totalIncludedPaidTime} />
                    <IndustryAllowanceTimeGroupContainer
                      name="Included Paid Time - Scheduled"
                      allowanceId={allowance.id}
                      allowanceTimeType={INCLUDED_PAID_SCHEDULED} />
                    <IndustryAllowanceTimeGroupContainer
                      name="Included Paid Time - Unscheduled"
                      allowanceId={allowance.id}
                      allowanceTimeType={INCLUDED_PAID_UNSCHEDULED} />
                    <IndustryAllowanceTimeGroupContainer
                      name="Included Paid Time - Other Activities Not Included in Labor Standards"
                      allowanceId={allowance.id}
                      allowanceTimeType={INCLUDED_PAID_OTHER} />
                    <IndustryAllowanceRestTimeContainer />
                    <IndustryAllowanceDelayTimeGroupContainer />
                    <IndustryAllowancePercentagesContainer />
                  </div>
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <IndustryAllowanceDetailsSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    allowance: allowanceSelector(state),
    paidTime: paidTimeSelector(state),
    adjustedPaidTime: adjustedPaidTimeSelector(state),
    reliefTime: reliefTimeSelector(state),
    totalIncludedPaidTime: totalIncludedPaidTimeSelector(state),
    workingModel: workingModelSelector(state),
    model: industryAllowanceRestModel(state),
    show: showSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryTypicalAllowance,
    selectIndustryAllowance,
    handleToggleAllowanceDetailsSidebar: toggleIndustryAllowanceDetailsSidebar,
    loadIndustryAllowanceRest,
  }
)(IndustryAllowanceDetailsPage));
