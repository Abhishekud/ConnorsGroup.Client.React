import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportLaborPeriods,
  importLaborPeriods,
  loadLaborPeriodsList,
  showImportLaborPeriodsValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportLaborPeriodsModal extends Component {
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
    const createdMsg = `${createdRecordCount} Labor Period${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Labor Period${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importLaborPeriods,
      reloadLaborPeriods,
      showImportLaborPeriodsValidationErrors,
    } = this.props;
    if (!file || file.length <= 0) {
      toastr.error('Please select correct file', 'Error');
      return;
    }
    importLaborPeriods(file[0])
      .then(response => {
        reloadLaborPeriods();

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportLaborPeriodsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Labor Periods CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Labor Periods</h4>
        <p>
          Drop a Labor Periods .CSV file here or click to browse.
          Existing Labor Periods will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Labor Periods"
        faIcon="fa-cubes"
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
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportLaborPeriods,
    importLaborPeriods,
    loadLaborPeriodsList,
    showImportLaborPeriodsValidationErrors,
  }
)(ImportLaborPeriodsModal));
