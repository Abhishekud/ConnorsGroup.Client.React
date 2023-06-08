import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../../shared/services';
import {ImportFileModal} from '../../../shared/components';
import {
  cancelImportTaskGroups,
  importTaskGroups,
  loadTaskGroupsList,
  showImportTaskGroupsValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportTaskGroupsModal extends Component {
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
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? 'Kronos Task Group has' : 'Kronos Task Groups have'} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? 'Kronos Task Group has' : 'Kronos Task Groups have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importTaskGroups,
      reloadList,
      showImportTaskGroupsValidationErrors,
    } = this.props;

    importTaskGroups(file[0])
      .then(response => {
        reloadList();
        if (Object.keys(response.action.payload.data.validationErrors).length > 0) showImportTaskGroupsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Task Groups CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Task Groups</h4>
        <p>
          Drop a Task Groups .CSV file here or click to browse.
          New Task Groups will be created.
          Existing Task Groups records will be updated.
        </p>
      </div>;
    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Task Groups'}
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
    handleCancel: cancelImportTaskGroups,
    importTaskGroups,
    loadTaskGroupsList,
    showImportTaskGroupsValidationErrors,
  }
)(ImportTaskGroupsModal));
