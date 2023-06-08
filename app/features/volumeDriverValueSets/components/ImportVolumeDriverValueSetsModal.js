import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  importVolumeDriverValueSets,
  loadVolumeDriverValueSetsList,
  toggleImportVolumeDriverValueSetsValidationErrors,
  toggleImportVolumeDriverValueSets,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';

class ImportVolumeDriverValueSetsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount, skippedRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Volume Driver Value Set${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Volume Driver Value Set${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;
    const skippedMsg = `${skippedRecordCount} Volume Driver Value Set${(skippedRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg} ${skippedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importVolumeDriverValueSets,
      loadVolumeDriverValueSetsList,
      toggleImportVolumeDriverValueSetsValidationErrors,
    } = this.props;

    importVolumeDriverValueSets(file[0])
      .then(response => {
        loadVolumeDriverValueSetsList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Value Sets list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) toggleImportVolumeDriverValueSetsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => {
        const {status, data} = error.response;
        if (status === 412) handleApiError(error, router, data.message);
        else handleApiError(error, router, 'An error occurred while attempting to import the Volume Driver Value Sets CSV file.', 'Error');
      });
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Volume Driver Value Sets</h4>
        <p>
          Drop a Volume Driver Value Sets .CSV file here or click to browse.
          Existing Volume Driver Value Sets will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Volume Driver Value Sets"
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
    handleCancel: toggleImportVolumeDriverValueSets,
    importVolumeDriverValueSets,
    loadVolumeDriverValueSetsList,
    toggleImportVolumeDriverValueSetsValidationErrors,
  }
)(ImportVolumeDriverValueSetsModal));
