import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportLaborDrivers,
  importLaborDrivers,
  loadLaborDriversList,
  showImportLaborDriversValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportLaborDriversModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount}) {

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Kronos Labor Driver${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Kronos Labor Driver${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importLaborDrivers,
      loadLaborDriversList,
      showImportLaborDriversValidationErrors,
    } = this.props;

    importLaborDrivers(file[0])
      .then(response => {
        loadLaborDriversList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Labor Drivers list.', 'Error'));
        if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportLaborDriversValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Labor Drivers CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;
    const modalBody =
      <div>
        <h4>Add new Labor Drivers</h4>
        <p>
          Drop a Labor Drivers .CSV file here or click to browse.
          New Labor Drivers will be created.
          Existing Labor Drivers records will be updated.
        </p>
      </div>;
    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Labor Drivers'}
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
    handleCancel: cancelImportLaborDrivers,
    importLaborDrivers,
    loadLaborDriversList,
    showImportLaborDriversValidationErrors,
  }
)(ImportLaborDriversModal));
