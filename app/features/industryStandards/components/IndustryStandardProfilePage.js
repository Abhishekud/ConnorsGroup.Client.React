import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {
  loadIndustryStandard,
  selectIndustryStandard,
  toggleIndustryStandardDetailsSidebar,
} from '../actions';
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
  idSelector,
  loadingSelector,
  nameSelector,
  topLevelIndustryStandardItemsSortedByIndexSelector,
  viewIndustryStandardMOSTElementIdSelector,
  viewIndustryStandardNonMOSTElementIdSelector,
} from '../selectors/pages/industryStandardProfile';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {AutoSizer} from 'react-virtualized';
import React, {Component} from 'react';
import IndustryStandardItemContainer from './IndustryStandardItemContainer';
import {handleApiError} from '../../shared/services';
import {IndustryStandardProfileSidebar, MOSTIndustryStandardElementProfilePage, NonMOSTIndustryStandardElementProfilePage} from './';
import {
  openSelector,
} from '../selectors/sidebars/industryStandardDetails';
class IndustryStandardProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadIndustryStandard, params, router, location} = this.props;
    loadIndustryStandard(params.id, location.query.standardId)
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to load the Industry Standard builder.', 'Error');
        router.push('/standards');
      });
  }
  handleAdd() {
    const {selectIndustryStandard, id, router} = this.props;
    selectIndustryStandard(id, true);
    router.push('/standards?return=true');
  }

  handleStandardDetailsButton() {
    this.props.toggleIndustryStandardDetailsSidebar();
  }
  render() {
    const {
      id,
      name,
      loading,
      standardItems,
      detailsOpen,
      viewIndustryStandardMOSTElementId,
      viewIndustryStandardNonMOSTElementId,
      params,
    } = this.props;
    if (viewIndustryStandardMOSTElementId) {
      return (
        <MOSTIndustryStandardElementProfilePage
          industryStandardId={id}
          industrySourceId={params.id}
          industryStandardElementId={viewIndustryStandardMOSTElementId} />
      );
    }
    if (viewIndustryStandardNonMOSTElementId) {
      return (
        <NonMOSTIndustryStandardElementProfilePage
          industryStandardId={id}
          industrySourceId={params.id}
          industryStandardElementId={viewIndustryStandardNonMOSTElementId} />
      );
    }
    return (
      <Page pageClassName="industry-standard-builder-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={'standards?return=true'}><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle title={`${id || ''} - ${name || ''}`}>{`${id || ''} - ${name || ''}`} </PageTitle>
          <PageHeaderActions>

            <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
            <TimeFormatSelector />

            <div className="flyout-button">
              <Button className={detailsOpen ? 'btn-wheat' : 'btn-default'} onClick={this.handleStandardDetailsButton}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="industry-standard-items-wrapper" style={{width}}>
                  <div className="industry-standard-items-container">
                    {standardItems.valueSeq().map(standardItem =>
                      (<IndustryStandardItemContainer
                        key={standardItem.get('id')}
                        standardItem={standardItem} />))}
                  </div>
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <IndustryStandardProfileSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    detailsOpen: openSelector(state),
    id: idSelector(state),
    name: nameSelector(state),
    standardItems: topLevelIndustryStandardItemsSortedByIndexSelector(state),
    timeFormat: timeFormatSelector(state),
    viewIndustryStandardMOSTElementId: viewIndustryStandardMOSTElementIdSelector(state),
    viewIndustryStandardNonMOSTElementId: viewIndustryStandardNonMOSTElementIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryStandard,
    selectIndustryStandard,
    toggleIndustryStandardDetailsSidebar,
  }
)(IndustryStandardProfilePage));
