import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportLocationProfiles,
  importLocationProfiles,
  showImportLocationProfilesValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/importLocationProfiles';
import {locationNameSelector} from '../../shared/selectors/components/settings';


class ImportLocationProfilesModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount}) {
    const {locationName} = this.props;

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} ${locationName} Profile${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} ${locationName} Profile${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      locationName,
      router,
      importLocationProfiles,
      showImportLocationProfilesValidationErrors,
      reloadLocationsList,
    } = this.props;

    importLocationProfiles(file[0])
      .then(response => {
        reloadLocationsList();

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportLocationProfilesValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to import the ${pluralize(locationName)} CSV file.`, 'Error'));
  }

  render() {
    const {show, handleCancel, importing, locationName} = this.props;

    const modalBody =
      <div>
        <h4>Add new {locationName} Profiles</h4>
        <p>
          Drop a {locationName} Profile .CSV file here or click to browse.
          Only new {locationName} Profiles will be created.
          Existing {locationName} Profile records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={`Import ${locationName} Profiles`}
        faIcon="fa-building"
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
    locationName: locationNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportLocationProfiles,
    importLocationProfiles,
    showImportLocationProfilesValidationErrors,
  }
)(ImportLocationProfilesModal));
