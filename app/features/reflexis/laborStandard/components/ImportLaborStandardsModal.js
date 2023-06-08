import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
//import toastr from 'toastr';
import {handleApiError} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportLaborStandards,
  importLaborStandards,
} from '../actions';
import {
  showModalSelector,
  isImportingSelector,
} from '../selectors/modals/importLaborStandards';

class ImportLaborStandardsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  //showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount}) {

  //  const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
  //  const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? 'Kronos Task has' : 'Kronos Tasks have'} been added.`;
  //  const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? 'Kronos Task has' : 'Kronos Tasks have'} been updated.`;

  //  toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  //}

  handleFileSelected(file) {
    const {
      router,
      importLaborStandards,
      //handleSuccess,
      //handleFailure,
    } = this.props;

    importLaborStandards(file[0])
      //.then(response => {
      //  loadTasksList()
      //    .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Tasks list.', 'Error'));
      //  if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportTasksValidationErrors();
      //  else this.showToastrImportMessage(response.value.data);
      //})
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Reflexis Labor Standards CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Import Reflexis Labor Standards</h4>
        <p>
          Drop a Labor Standards .CSV file here or click to browse.
          Matching Labor Standards will have their attribute mapping updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Reflexis Labor Standards'}
        faIcon="fa-building-o"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showModalSelector(state),
    importing: isImportingSelector(state),
  };
}

const actions = {
  importLaborStandards,
  handleCancel: cancelImportLaborStandards,
  //handleFailure: handleImportLaborStandardsValidationErrors,
  //handleSuccess: handleImportLaborStandardSuccess,
};

ImportLaborStandardsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  importing: PropTypes.bool.isRequired,

  // handlers
  importLaborStandards: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  //handleFailure: PropTypes.func.isRequired,
  //handleSuccess: handleImportLaborStandardSuccess,
};

export default withRouter(connect(mapStateToProps, actions)(ImportLaborStandardsModal));


