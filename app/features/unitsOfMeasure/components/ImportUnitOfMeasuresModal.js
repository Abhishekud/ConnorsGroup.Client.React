import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  toggleImportUnitOfMeasures,
  importUnitOfMeasures,
  loadUnitOfMeasureSelectListOptions,
  loadUnitsOfMeasureList,
  toggleImportUnitOfMeasuresValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import {PropTypes} from 'prop-types';

class ImportUnitOfMeasuresModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, totalRecordCount, skippedRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Unit${(createdRecordCount === 1) ? '' : 's'} of Measure${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Unit${(skippedRecordCount === 1) ? '' : 's'} of Measure${(createdRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${skippedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      selectedDepartmentId,
      router,
      importUnitOfMeasures,
      loadUnitOfMeasureSelectListOptions,
      toggleImportUnitOfMeasuresValidationErrors,
      loadUnitsOfMeasureList,
    } = this.props;

    importUnitOfMeasures(file[0])
      .then(response => {
        loadUnitOfMeasureSelectListOptions();
        loadUnitsOfMeasureList(selectedDepartmentId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Units of Measures list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) toggleImportUnitOfMeasuresValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Units of Measures XLSX file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Units of Measure</h4>
        <p>
          Drop a Units of Measure .XLSX file here or click to browse.<br />
          Note: Only new Units of Measure will be created. Existing Units of Measure records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Units of Measure'}
        faIcon="fa-calculator"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}

ImportUnitOfMeasuresModal.propTypes = {
  importing: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  selectedDepartmentId: PropTypes.number,

  // Actions
  handleCancel: PropTypes.func.isRequired,
  importUnitOfMeasures: PropTypes.func.isRequired,
  toggleImportUnitOfMeasuresValidationErrors: PropTypes.func.isRequired,
  loadUnitOfMeasureSelectListOptions: PropTypes.func.isRequired,
  loadUnitsOfMeasureList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    show: showSelector(state),
    importing: importingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: toggleImportUnitOfMeasures,
    importUnitOfMeasures,
    loadUnitOfMeasureSelectListOptions,
    loadUnitsOfMeasureList,
    toggleImportUnitOfMeasuresValidationErrors,
  }
)(ImportUnitOfMeasuresModal));
