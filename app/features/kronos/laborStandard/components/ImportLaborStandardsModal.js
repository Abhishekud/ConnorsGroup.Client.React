import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportLaborStandards,
  importLaborStandards,
  showImportLaborStandardsValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportLaborStandardsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage() {
    toastr.success('The Kronos Labor Standards import job is running. You will receive an email with the results.', 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importLaborStandards,
      showImportLaborStandardsValidationErrors,
    } = this.props;

    importLaborStandards(file[0])
      .then(response => {
        if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportLaborStandardsValidationErrors();
        else this.showToastrImportMessage();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Labor Standards CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;
    const modalBody =
      <div>
        <h4>Update Labor Standards</h4>
        <p>
          Drop a Labor Drivers .CSV file here or click to browse.
          New Labor Drivers will NOT be created.
          Existing Labor Drivers records will be updated.
        </p>
      </div>;
    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Labor Standards'}
        faIcon="fa-building-o"
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
    handleCancel: cancelImportLaborStandards,
    importLaborStandards,
    showImportLaborStandardsValidationErrors,
  }
)(ImportLaborStandardsModal));
