import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportOrgHierarchyLevelOptions,
  importOrgHierarchyLevelOptions,
  loadOrgHierarchyLevelOptionsList,
  showImportOrgHierarchyLevelOptionsValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {selectedOrgHierarchyLevelIdSelector} from '../selectors/pages/list';

class ImportOrgHierarchyLevelOptionsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({successfulRecordCount, totalRecordCount}) {
    const processedMsg = (totalRecordCount === 1) ? 'record was' : 'records were';
    const locationMsg = (totalRecordCount === 1) ? 'Org Hierarchy Level Option has' : 'Org Hierarchy Level Options have';

    toastr.success(`${totalRecordCount} ${processedMsg} processed. ${successfulRecordCount} new ${locationMsg} been added.`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      orgHierarchyLevelId,
      router,
      importOrgHierarchyLevelOptions,
      loadOrgHierarchyLevelOptionsList,
      showImportOrgHierarchyLevelOptionsValidationErrors,
    } = this.props;

    importOrgHierarchyLevelOptions(orgHierarchyLevelId, file[0])
      .then(response => {
        loadOrgHierarchyLevelOptionsList(orgHierarchyLevelId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Org Hierarchy Level Options list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportOrgHierarchyLevelOptionsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Org Hierarchy Level Options CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Org Hierarchy Level Options</h4>
        <p>
          Drop an Org Hierarchy Level Options .CSV file here or click to browse.
          Only new Org Hierarchy Level Options will be created.
          Existing Org Hierarchy Level Option records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Org Hierarchy Level Options'}
        faIcon="fa-sitemap"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    importing: importingSelector(state),
    orgHierarchyLevelId: selectedOrgHierarchyLevelIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportOrgHierarchyLevelOptions,
    importOrgHierarchyLevelOptions,
    loadOrgHierarchyLevelOptionsList,
    showImportOrgHierarchyLevelOptionsValidationErrors,
  }
)(ImportOrgHierarchyLevelOptionsModal));
