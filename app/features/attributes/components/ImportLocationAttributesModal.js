import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportLocationAttributes,
  importLocationAttributes,
  loadLocationAttributesList,
  showImportLocationAttributesValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/importLocationAttributes';
import {selectedDepartmentIdSelector} from '../selectors/pages/list';
import {locationNameSelector} from '../../shared/selectors/components/settings';

class ImportLocationAttributesModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({updatedRecordCount, totalRecordCount, backgroundedJob}) {
    if (backgroundedJob) {
      toastr.info('File too large to process immediately.  You will receive an email when it has completed.', 'Import Results');
      return;
    }
    const {locationName} = this.props;

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? `${locationName} has` : `${pluralize(locationName)} have`} been updated.`;

    toastr.success(`${processedMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      locationName,
      departmentId,
      router,
      importLocationAttributes,
      loadLocationAttributesList,
      showImportLocationAttributesValidationErrors,
    } = this.props;

    importLocationAttributes(file[0], departmentId)
      .then(response => {
        loadLocationAttributesList(departmentId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Attributes list.`, 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportLocationAttributesValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to import the ${locationName} Attributes XLSX file.`, 'Error'));
  }

  render() {
    const {show, handleCancel, importing, locationName} = this.props;

    const modalBody =
      <div>
        <h4>Updated {locationName}-Attributes</h4>
        <p>
          Drop a {locationName}-Attributes .XLSX file here or click to browse.
          Existing {locationName}-Attribute mappings will be updated.
          New {pluralize(locationName)} will be created.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={`Import ${pluralize(locationName)}-Attributes`}
        faIcon="fa-check"
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
    handleCancel: cancelImportLocationAttributes,
    importLocationAttributes,
    loadLocationAttributesList,
    showImportLocationAttributesValidationErrors,
  }
)(ImportLocationAttributesModal));
