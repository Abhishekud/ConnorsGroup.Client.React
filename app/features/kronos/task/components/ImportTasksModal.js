import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportTasks,
  importTasks,
  loadTasksList,
  showImportTasksValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportTasksModal extends Component {
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
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? 'Kronos Task has' : 'Kronos Tasks have'} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? 'Kronos Task has' : 'Kronos Tasks have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importTasks,
      reloadTasks,
      showImportTasksValidationErrors,
    } = this.props;

    importTasks(file[0])
      .then(response => {
        reloadTasks();
        if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportTasksValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Task Groups CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Tasks</h4>
        <p>
          Drop a Tasks .CSV file here or click to browse.
          New Tasks will be created.
          Existing Tasks records will be updated.
        </p>
      </div>;
    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Tasks'}
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
    handleCancel: cancelImportTasks,
    importTasks,
    loadTasksList,
    showImportTasksValidationErrors,
  }
)(ImportTasksModal));
