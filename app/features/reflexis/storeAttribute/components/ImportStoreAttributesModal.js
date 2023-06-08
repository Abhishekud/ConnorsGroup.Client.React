import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
//import toastr from 'toastr';
import {handleApiError} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportStoreAttributes,
  importStoreAttributes,
} from '../actions';
import {
  showModalSelector,
  isImportingSelector,
} from '../selectors/modals/importStoreAttributes';

class ImportStoreAttributesModal extends Component {
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
      importStoreAttributes,
      //handleSuccess,
      //handleFailure,
    } = this.props;

    importStoreAttributes(file[0])
      //.then(response => {
      //  loadTasksList()
      //    .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Tasks list.', 'Error'));
      //  if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportTasksValidationErrors();
      //  else this.showToastrImportMessage(response.value.data);
      //})
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Reflexis Store Attributes CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Import Reflexis Store Attributes</h4>
        <p>
          Drop a Store Attributes .CSV file here or click to browse.
          New Attributes will be added.
          Matching Attribute will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Reflexis Store Attributes'}
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
  importStoreAttributes,
  handleCancel: cancelImportStoreAttributes,
  //handleFailure: handleImportStoreAttributesValidationErrors,
  //handleSuccess: handleImportStoreAttributeSuccess,
};

ImportStoreAttributesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  importing: PropTypes.bool.isRequired,

  // handlers
  importStoreAttributes: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  //handleFailure: PropTypes.func.isRequired,
  //handleSuccess: handleImportStoreAttributeSuccess,
};

export default withRouter(connect(mapStateToProps, actions)(ImportStoreAttributesModal));


