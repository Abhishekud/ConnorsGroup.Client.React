import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
//import toastr from 'toastr';
import {handleApiError} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportAttributes,
  importAttributes,
} from '../actions';
import {
  showModalSelector,
  isImportingSelector,
} from '../selectors/modals/importAttributes';

class ImportAttributesModal extends Component {
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
      importAttributes,
      //handleSuccess,
      //handleFailure,
    } = this.props;

    importAttributes(file[0])
      //.then(response => {
      //  loadTasksList()
      //    .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Tasks list.', 'Error'));
      //  if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportTasksValidationErrors();
      //  else this.showToastrImportMessage(response.value.data);
      //})
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Reflexis Attributes CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Synchronize Reflexis Attributes</h4>
        <p>
          Drop an Attributes .CSV file here or click to browse.&nbsp;
          <span style={{fontWeight: 'bold'}}>Missing Attributes will be deleted.</span>&nbsp;
          New Attributes will be added.
          Matching Attribute will be left.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Reflexis Attributes'}
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
  importAttributes,
  handleCancel: cancelImportAttributes,
  //handleFailure: handleImportAttributesValidationErrors,
  //handleSuccess: handleImportAttributeSuccess,
};

ImportAttributesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  importing: PropTypes.bool.isRequired,

  // handlers
  importAttributes: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  //handleFailure: PropTypes.func.isRequired,
  //handleSuccess: handleImportAttributeSuccess,
};

export default withRouter(connect(mapStateToProps, actions)(ImportAttributesModal));

