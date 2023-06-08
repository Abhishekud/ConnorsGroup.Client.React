import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  toggleImportJobClasses,
  importJobClasses,
  loadJobClassesList,
  toggleImportJobClassesValidationErrors,
} from '../actions';
import {JOB_CLASSES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {PropTypes} from 'prop-types';

class ImportJobClassesModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, totalRecordCount, skippedRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Job Class${(createdRecordCount === 1) ? ' has' : 'es have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Job Class${(skippedRecordCount === 1) ? ' has' : 'es have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${skippedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importJobClasses,
      loadSelectListOptions,
      loadJobClassesList,
      toggleImportJobClassesValidationErrors,
    } = this.props;

    importJobClasses(file[0])
      .then(response => {

        loadSelectListOptions(JOB_CLASSES);
        loadJobClassesList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Job Classess list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) toggleImportJobClassesValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Job Classess CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Job Classes</h4>
        <p>
          Drop a Job Classes .CSV file here or click to browse.
          Note: Only new Job Classes will be created. Existing Job Classes records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Job Classes'}
        faIcon="fa-calculator"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}
ImportJobClassesModal.propTypes = {
  importing: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,

  // Actions
  handleCancel: PropTypes.func.isRequired,
  importJobClasses: PropTypes.func.isRequired,
  toggleImportJobClassesValidationErrors: PropTypes.func.isRequired,
  loadSelectListOptions: PropTypes.func.isRequired,
  loadJobClassesList: PropTypes.func.isRequired,
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
    handleCancel: toggleImportJobClasses,
    importJobClasses,
    loadSelectListOptions,
    loadJobClassesList,
    toggleImportJobClassesValidationErrors,
  }
)(ImportJobClassesModal));
