import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportCharacteristics,
  importCharacteristics,
  showImportCharacteristicsValidationErrors,
  loadCharacteristicSetSelectListOptions,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import {
  modelSelector as characteristicsFiltersSelector,
} from '../selectors/sidebars/filters';

class ImportCharacteristicsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount, backgroundedJob}) {
    if (backgroundedJob) {
      toastr.info('File too large to process immediately.  You will receive an email when it has completed.', 'Import Results');
      return;
    }
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Characteristic${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Characteristic${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importCharacteristics,
      reloadCharacteristics,
      showImportCharacteristicsValidationErrors,
      loadCharacteristicSetSelectListOptions,
    } = this.props;

    importCharacteristics(file[0])
      .then(response => {
        loadCharacteristicSetSelectListOptions();

        reloadCharacteristics();
        if (Object.keys(response.value.data.validationErrors).length > 0) showImportCharacteristicsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Characteristics XLSX file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Characteristics</h4>
        <p>
          Drop a Characteristics .XLSX file here or click to browse.
          Note: Only Characteristic Set values for existing Characteristics will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Characteristics'}
        faIcon="fa-calculator"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}

function mapStateToProps(state) {
  return {
    characteristicsFilters: characteristicsFiltersSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    show: showSelector(state),
    importing: importingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportCharacteristics,
    importCharacteristics,
    showImportCharacteristicsValidationErrors,
    loadCharacteristicSetSelectListOptions,
  }
)(ImportCharacteristicsModal));
