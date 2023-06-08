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
  loadAllowance,
  toggleAllowanceBuilderEditSidebar,
} from '../actions';
import {
  allowanceSelector,
  loadingSelector,
  paidTimeSelector,
  adjustedPaidTimeSelector,
  reliefTimeSelector,
  totalIncludedPaidTimeSelector,
} from '../selectors/pages/builder';
import {
  showSelector as showEditSidebarSelector,
} from '../selectors/sidebars/edit';
import AllowanceTimeGroupContainer from './AllowanceTimeGroupContainer';
import AllowanceTime from './AllowanceTime';
import AllowanceRestTimeContainer from './AllowanceRestTimeContainer';
import AllowanceDelayTimeGroupContainer from './AllowanceDelayTimeGroupContainer';
import AllowancePercentagesContainer from './AllowancePercentagesContainer';
import AllowanceBuilderEditSidebar from './AllowanceBuilderEditSidebar';
import CreateAllowanceTimeModal from './CreateAllowanceTimeModal';
import DeleteAllowanceTimeModal from './DeleteAllowanceTimeModal';
import DuplicateAllowanceModal from './DuplicateAllowanceModal';
import {handleApiError} from '../../shared/services';
import {
  UNPAID,
  EXCLUDED_PAID,
  INCLUDED_PAID_SCHEDULED,
  INCLUDED_PAID_UNSCHEDULED,
  INCLUDED_PAID_OTHER,
} from '../constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../constants';
import AllowanceDetailReport from './reports/AllowanceDetailReport';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ALLOWANCES_EDIT} from '../../authentication/constants/permissions';

class AllowanceBuilderPage extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadAllowance, router, params} = this.props;

    loadAllowance(params.id)
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to load the Allowance builder.', 'Error');
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

  render() {
    const {
      loading,
      sidebarShown,

      allowance,
      paidTime,
      adjustedPaidTime,
      reliefTime,
      totalIncludedPaidTime,
      canEdit,

      handleToggleAllowanceBuilderEditSidebar,
    } = this.props;

    const disabled = allowance.usedInProduction;

    return (
      <Page pageClassName="allowances-builder-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to="/allowances"><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle>{allowance.name || ''}</PageTitle>
          <PageHeaderActions>
            <div className="flyout-button">
              <AllowanceDetailReport />
            </div>
            <div className="flyout-button">
              <Button className={sidebarShown ? 'btn-wheat' : 'btn-default'}
                onClick={handleToggleAllowanceBuilderEditSidebar}>
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
                    <AllowanceTimeGroupContainer
                      name="Unpaid Time"
                      allowAdd={canEdit}
                      definition={allowanceDefinitions.UNPAID_TIME}
                      disabled={disabled}
                      allowanceId={allowance.id}
                      allowanceTimeType={UNPAID} />
                    <AllowanceTime allowanceTime={paidTime} disabled={disabled} />
                    <AllowanceTimeGroupContainer
                      name="Excluded Paid Time"
                      allowAdd={canEdit}
                      definition={allowanceDefinitions.EXCLUDED_PAID_TIME}
                      disabled={disabled}
                      allowanceId={allowance.id}
                      allowanceTimeType={EXCLUDED_PAID} />
                    <AllowanceTime allowanceTime={adjustedPaidTime} disabled={disabled} />
                    <AllowanceTime allowanceTime={reliefTime} disabled={disabled} />
                    <AllowanceTime allowanceTime={totalIncludedPaidTime} disabled={disabled} />
                    <AllowanceTimeGroupContainer
                      name="Included Paid Time - Scheduled"
                      allowAdd={canEdit}
                      disabled={disabled}
                      allowanceId={allowance.id}
                      allowanceTimeType={INCLUDED_PAID_SCHEDULED} />
                    <AllowanceTimeGroupContainer
                      name="Included Paid Time - Unscheduled"
                      allowAdd={canEdit}
                      disabled={disabled}
                      allowanceId={allowance.id}
                      allowanceTimeType={INCLUDED_PAID_UNSCHEDULED} />
                    <AllowanceTimeGroupContainer
                      name="Included Paid Time - Other Activities Not Included in Labor Standards"
                      allowAdd={canEdit}
                      disabled={disabled}
                      allowanceId={allowance.id}
                      allowanceTimeType={INCLUDED_PAID_OTHER} />
                    <AllowanceRestTimeContainer />
                    <AllowanceDelayTimeGroupContainer />
                    <AllowancePercentagesContainer />
                  </div>
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <AllowanceBuilderEditSidebar />
          <CreateAllowanceTimeModal />
          <DeleteAllowanceTimeModal />
          <DuplicateAllowanceModal />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ALLOWANCES_EDIT);
  return {
    loading: loadingSelector(state),
    sidebarShown: showEditSidebarSelector(state),
    allowance: allowanceSelector(state),
    paidTime: paidTimeSelector(state),
    adjustedPaidTime: adjustedPaidTimeSelector(state),
    reliefTime: reliefTimeSelector(state),
    totalIncludedPaidTime: totalIncludedPaidTimeSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadAllowance,
    handleToggleAllowanceBuilderEditSidebar: toggleAllowanceBuilderEditSidebar,
  }
)(AllowanceBuilderPage));
