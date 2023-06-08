import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  toggleImportDepartments,
  importDepartments,
  loadDepartmentsList,
  toggleImportDepartmentsValidationErrors,
} from '../actions';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {PropTypes} from 'prop-types';

class ImportDepartmentsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, totalRecordCount, skippedRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Department${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Department${(skippedRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${skippedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importDepartments,
      loadDepartmentsList,
      loadSelectListOptions,
      toggleImportDepartmentsValidationErrors,
    } = this.props;

    importDepartments(file[0])
      .then(response => {

        loadSelectListOptions(DEPARTMENTS);
        loadDepartmentsList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Departments list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) toggleImportDepartmentsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Departments CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Departments</h4>
        <p>
          Drop a Departments .CSV file here or click to browse.
          Note: Only new Departments will be created. Existing Departments records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Departments'}
        faIcon="fa-calculator"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}
ImportDepartmentsModal.propTypes = {
  importing: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,

  // Actions
  handleCancel: PropTypes.func.isRequired,
  importDepartments: PropTypes.func.isRequired,
  toggleImportDepartmentsValidationErrors: PropTypes.func.isRequired,
  loadDepartmentsList: PropTypes.func.isRequired,
  loadSelectListOptions: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    show: showSelector(state),
    importing: importingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: toggleImportDepartments,
    importDepartments,
    loadDepartmentsList,
    loadSelectListOptions,
    toggleImportDepartmentsValidationErrors,
  }
)(ImportDepartmentsModal));
