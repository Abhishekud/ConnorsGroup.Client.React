import React, {Component} from 'react';
import {fromJS} from 'immutable';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import {AutoSizer} from 'react-virtualized';
import {GridColumn, GridNoRecords} from '@progress/kendo-react-grid';

import {CustomizableGrid} from '../../../customizableGrid/components';

import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {createExportRequest} from '../../../shared/actions';
import {layout, navigationGroups, exportFormatTypes, timeFormats, exportResponseText} from '../../../shared/constants';
import {handleApiError, toastr} from '../../../shared/services';

import {
  ImportAttributesModal,
  SubmitIntegrationRequestModal,
  OpenIntegrationModalButton,
  CreateAttributeModal,
  EditAttributeSidebar,
} from './';
import {
  bulkDeleteAttributes,
  showImportAttributesModal,
  showCreateAttributeIntegrationRequestModal,
  filterAttributes,
  sortAttributes,
  loadAttributes,
  selectAttribute,
  toggleSelectAllAttributes,
  openAttributeSidebar,
  closeAttributeSidebar,
  showCreateAttributeModal,
  createReflexisExportRequest,
} from '../actions';
import {
  loadingSelector,
  filterSelector,
  sortSelector,
  attributesSelector,
  numberOfSidebarsOpenSelector,
  allSelectedSelector,
  selectedSelector,
  selectedAttributeIdSelector,
} from '../selectors/pages/list';
import {REFLEXIS_EDIT, REFLEXIS_INTEGRATION_EDIT} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';

class AttributesPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadAttributes, router} = this.props;
    loadAttributes()
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis attributes.'));
  }

  handleReflexisExportRequest(format) {
    const ids = this.props.allSelected ? [] : this.props.selectedIds.keySeq();
    const filter = JSON.stringify(this.props.allSelected ? this.props.filter : null);
    this.props.createExportRequest({
      fileName: 'export-request.OM6',
      filters: filter,
      timeFormat: timeFormats.MINUTES,
      selectedIds: ids,
      exportFormat: format,
    })
      .then(response => {
        this.props.createReflexisExportRequest(response.value.data);
      })
      .then(() => {
        toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
      })
      .catch(error => {
        console.error(error);
        toastr.error(exportResponseText.FAILURE);
      });
  }

  handleCreateCSVExportRequest() {
    this.handleReflexisExportRequest(exportFormatTypes.CSV);
  }

  handleCreateJsonExportRequest() {
    this.handleReflexisExportRequest(exportFormatTypes.JSON);
  }

  handleExportRequest(exportRequestId) {
    window.location.href = `${process.env.API_BASE_URL}reflexis/attributes/export/om06/${exportRequestId}`;
  }

  handleSort({sort}) {
    this.props.sortAttributes(fromJS(sort));
  }

  handleFilter({filter}) {
    this.props.filterAttributes(fromJS(filter));
  }

  handleSelectAttribute({dataItem}) {
    if (this.props.selectedAttributeRow === null) {
      this.props.selectAttribute(dataItem.id);
    }
  }

  handleToggleSelectAll() {
    if (this.props.selectedAttributeRow === null) {
      this.props.toggleSelectAllAttributes();
    }
  }

  handleRowClick({dataItem}) {
    const {selectedAttributeRow, openAttributeSidebar, closeAttributeSidebar, attributes, selectedIds} = this.props;

    // You can either multi-select or open the sidebar, not both
    if (!selectedIds.isEmpty()) return;

    if (dataItem.id === selectedAttributeRow) closeAttributeSidebar();
    else {
      const selectedAttribute = attributes.find(attr => attr.get('id') === dataItem.id);
      openAttributeSidebar(selectedAttribute);
    }
  }

  handleCreateAttributeClick() {
    this.props.showCreateAttributeModal();
  }

  handleBulkDeleteClick() {
    const {bulkDeleteAttributes, attributes, loadAttributes} = this.props;
    // extract the ids directly from the data to simplify the server-side logic.
    const selectedIds = attributes.filter(a => a.get('selected')).map(a => a.get('id'));
    bulkDeleteAttributes(selectedIds)
      .then(loadAttributes)
      .catch(error => toastr.error(`Unable to delete attributes. ${error.response.data._[0]}`, 'Error', {timeout: 10000}));
  }

  handleTriggerIntegrationClick() {
    const {showCreateAttributeIntegrationRequestModal, selectedIds, allSelected, filter} = this.props;
    const attrIds = selectedIds.keySeq();
    showCreateAttributeIntegrationRequestModal(attrIds, allSelected, filter);
  }

  render() {
    const {
      loading,
      numberOfSidebarsShowing,
      attributes,
      sort,
      filter,
      canEdit,
      canPush,
      showImportAttributesModal,
      allSelected,
      selectedIds,
    } = this.props;

    const hasSelected = allSelected || !selectedIds.isEmpty();

    return (
      <Page pageClassName="reflexis-attributes-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Attributes</PageTitle>
          <PageHeaderActions>
            <Dropdown id="export" className="btn-default header-button" pullRight>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleCreateCSVExportRequest}>
                  Export OM06 file
                </MenuItem>
                <MenuItem eventKey="2" onClick={this.handleCreateJsonExportRequest}>
                  Export JSON file
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
            {canEdit &&
            <Dropdown id="add" className="btn-default header-button" pullRight disabled={false}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleCreateAttributeClick}>Add Attribute</MenuItem>
                <MenuItem eventKey="2" onClick={showImportAttributesModal}>
                  Synchronize Reflexis Attributes
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
            }
            {canEdit && hasSelected &&
              <Button title="Delete attributes" onClick={this.handleBulkDeleteClick}><i className="fa fa-trash-o" /></Button>
            }
            {canPush &&
              <OpenIntegrationModalButton isSubmitting={false} onClick={this.handleTriggerIntegrationClick} />
            }
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.REFLEXIS_MODULE} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={attributes}
                  style={{width: width + (numberOfSidebarsShowing * layout.SIDEBAR_WIDTH), height}}
                  sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter}
                  onRowClick={this.handleRowClick}
                  onSelectedChange={this.handleSelectAttribute} onHeaderSelectedChange={this.handleToggleSelectAll}>
                  <GridColumn field="selected" width={50} sortable={false} filterable={false} headerSelectionValue={allSelected} />
                  <GridColumn field="name" title="Name" />
                  <GridNoRecords>
                    There are no attributes configured.
                  </GridNoRecords>
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
          <ImportAttributesModal />
          <SubmitIntegrationRequestModal />
          <CreateAttributeModal />
          <EditAttributeSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_EDIT);
  const canPushSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_INTEGRATION_EDIT);

  return {
    loading: loadingSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsOpenSelector(state),
    attributes: attributesSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    allSelected: allSelectedSelector(state),
    selectedIds: selectedSelector(state),
    selectedAttributeRow: selectedAttributeIdSelector(state),

    canEdit: canEditSelector(state),
    canPush: canPushSelector(state),
  };
}

const actions = {
  showImportAttributesModal,
  createExportRequest,
  showCreateAttributeIntegrationRequestModal,
  filterAttributes,
  sortAttributes,
  loadAttributes,
  selectAttribute,
  toggleSelectAllAttributes,
  openAttributeSidebar,
  closeAttributeSidebar,
  showCreateAttributeModal,
  bulkDeleteAttributes,
  createReflexisExportRequest,
};

AttributesPage.propTypes = {
  loading: PropTypes.bool.isRequired,

  // Permissions
  canEdit: PropTypes.bool.isRequired,
  canPush: PropTypes.bool.isRequired,

  // handlers
  showImportAttributesModal: PropTypes.func.isRequired,
  createExportRequest: PropTypes.func.isRequired,

  filterAttributes: PropTypes.func.isRequired,
  sortAttributes: PropTypes.func.isRequired,
  loadAttributes: PropTypes.func.isRequired,

  openAttributeSidebar: PropTypes.func.isRequired,
  closeAttributeSidebar: PropTypes.func.isRequired,
  showCreateAttributeModal: PropTypes.func.isRequired,
  createReflexisExportRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(AttributesPage));
