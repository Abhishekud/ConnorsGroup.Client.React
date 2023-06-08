import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportAttributes,
  importAttributes,
  loadLocationAttributesList,
  loadAttributesList,
  showImportAttributesValidationErrors,
  loadAttributeSelectListOptions,
} from '../actions';
import {ATTRIBUTES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {selectedDepartmentIdSelector} from '../selectors/pages/list';
import {locationNameSelector} from '../../shared/selectors/components/settings';

class ImportAttributesModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({successfulRecordCount, totalRecordCount}) {
    const processedMsg = (totalRecordCount === 1) ? 'record was' : 'records were';
    const locationMsg = (totalRecordCount === 1) ? 'Attribute has' : 'Attributes have';

    toastr.success(`${totalRecordCount} ${processedMsg} processed. ${successfulRecordCount} new ${locationMsg} been added.`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      locationName,
      departmentId,
      router,
      importAttributes,
      loadLocationAttributesList,
      loadAttributesList,
      showImportAttributesValidationErrors,
      loadSelectListOptions,
      loadAttributeSelectListOptions,
    } = this.props;

    importAttributes(file[0])
      .then(response => {
        loadLocationAttributesList(departmentId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Attributes list.`, 'Error'));

        loadAttributesList(departmentId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Attributes list.', 'Error'));

        loadSelectListOptions(ATTRIBUTES);
        loadAttributeSelectListOptions();

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportAttributesValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Attributes CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Attributes</h4>
        <p>
          Drop an Attributes .CSV file here or click to browse.
          Only new Attributes will be created.
          Existing Attribute records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Attributes"
        faIcon="fa-tags"
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
    departmentId: selectedDepartmentIdSelector(state),
    locationName: locationNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportAttributes,
    importAttributes,
    loadLocationAttributesList,
    loadAttributesList,
    showImportAttributesValidationErrors,
    loadSelectListOptions,
    loadAttributeSelectListOptions,
  }
)(ImportAttributesModal));
