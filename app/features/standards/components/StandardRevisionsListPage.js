import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {CustomizableGrid} from '../../customizableGrid/components';
import {withRouter} from 'react-router';
import {
  loadingSelector,
  sortedStandardsSelector,
  sortSelector,
  filterSelector,
  columnsSelector,
  selectedStandardRevisionsSelector,
} from '../selectors/pages/revisionsList';
import {
  loadStandardRevisionsList,
  sortStandardRevisionsList,
  toggleShowStandardRevisions,
  loadStandardRevision,
  filterStandardRevisionsList,
  toggleSelectStandardRevision,
  selectAllStandardRevisions,
  showConfirmDeleteStandardRevisions,
} from '../actions';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import React, {Component} from 'react';
import {handleApiError, toastr} from '../../shared/services';
import {TOOLTIP_OPEN_DELAY} from '../../shared/constants/tooltipOpenDelay';
import {DeleteButton} from '../../shared/components/buttons';
import DeleteStandardRevisionsModal from './DeleteStandardRevisionsModal';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_MANAGE_PRODUCTION} from '../../authentication/constants/permissions';

class StandardRevisionsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, standardId} = this.props;
    this.props.loadStandardRevisionsList(standardId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Standard revisions.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortStandardRevisionsList(sort);
  }
  handleFilter({filter}) {
    this.props.filterStandardRevisionsList(filter);
  }
  handleRowClick(e) {
    const {loadStandardRevision, toggleShowStandardRevisions, params, router} = this.props;
    loadStandardRevision(params.id, e.dataItem.revision)
      .then(() => toggleShowStandardRevisions())
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Standard builder.', 'Error'));
  }

  handleClose() {
    const {toggleShowStandardRevisions} = this.props;
    toggleShowStandardRevisions();
  }

  handleDelete() {
    const {selectedStandardRevisions, showConfirmDeleteStandardRevisions, standardId} = this.props;
    const isCurrentRevision = selectedStandardRevisions.find(c => c.get('isCurrentRevision'));
    if (selectedStandardRevisions.size === 0) {
      toastr.error('No Revision Selected');
    } else if (isCurrentRevision) {
      toastr.error('Current revision cannot be deleted. Please check selected revisions and try again.');
    } else {
      const revisions = selectedStandardRevisions.map(c => c.get('revision')).toJS();
      showConfirmDeleteStandardRevisions(revisions, standardId);
    }
  }

  handleSelectAll() {
    const {standards, selectedStandardRevisions, selectAllStandardRevisions} = this.props;
    selectAllStandardRevisions(standards.map(x => x.get('revision')), Boolean(selectedStandardRevisions.size === 0));
  }

  handleToggleSelect({dataItem}) {
    const {revision} = dataItem;
    this.props.toggleSelectStandardRevision(revision);
  }

  render() {
    const {
      loading,
      standards,
      sort,
      standardId,
      filter,
      columns,
      selectedStandardRevisions,
      canManageProduction,
    } = this.props;

    return (
      <Page pageClassName="standards-list-page">
        <PageHeader>
          <PageHeaderActions >
            <span onClick={this.handleClose} className="clickable"><i className="fa fa-close" /> Close</span>
          </PageHeaderActions>
          <PageTitle>Standard Revisions for {standardId}</PageTitle>
          <DeleteButton title={'Delete'} isVisible={canManageProduction} isOpen disabled={!selectedStandardRevisions.size} onClick={this.handleDelete} />
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={TOOLTIP_OPEN_DELAY} position="top" anchorElement="target">
                  <CustomizableGrid data={standards}
                    style={{width, height}}
                    onRowClick={this.handleRowClick}
                    sort={sort} onSort={this.handleSort}
                    filter={filter} onFilter={this.handleFilter}
                    onSelectedChange={canManageProduction ? this.handleToggleSelect : null}
                    onHeaderSelectedChange={canManageProduction ? this.handleSelectAll : null}
                    columns={columns} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <DeleteStandardRevisionsModal />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(STANDARDS_MANAGE_PRODUCTION);
  return {
    loading: loadingSelector(state),
    standards: sortedStandardsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    columns: columnsSelector(state),
    selectedStandardRevisions: selectedStandardRevisionsSelector(state),
    canManageProduction: canManageProductionSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandardRevisionsList,
    sortStandardRevisionsList,
    toggleShowStandardRevisions,
    loadStandardRevision,
    filterStandardRevisionsList,
    toggleSelectStandardRevision,
    selectAllStandardRevisions,
    showConfirmDeleteStandardRevisions,
  }
)(StandardRevisionsListPage));
