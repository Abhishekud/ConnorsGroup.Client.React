import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportLocations,
  importLocations,
  showImportLocationsValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {locationNameSelector} from '../../shared/selectors/components/settings';

class ImportLocationsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({backgroundedJob}) {
    if (backgroundedJob) {
      toastr.success(`The ${pluralize(this.props.locationName)} import job is running. You will receive an email with the results.`, 'Import Results');
      return;
    }
    toastr.error('An error occurred while attempting to submit your request. Please try again or contact support.');
  }

  handleFileSelected(file) {
    const {
      locationName,
      router,
      importLocations,
      showImportLocationsValidationErrors,
    } = this.props;

    importLocations(file[0])
      .then(response => {
        if (Object.keys(response.value.data.validationErrors).length > 0) showImportLocationsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to import the ${pluralize(locationName)} CSV file.`, 'Error'));
  }

  render() {
    const {show, handleCancel, importing, locationName} = this.props;

    const pluralLocationName = pluralize(locationName);

    const modalBody =
      <div>
        <h4>Add new {pluralLocationName}</h4>
        <p>
          Drop a {pluralLocationName} .CSV file here or click to browse.
          New {pluralLocationName} will be created.
          Existing {locationName} records will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={`Import ${pluralLocationName}`}
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
    locationName: locationNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportLocations,
    importLocations,
    showImportLocationsValidationErrors,
  }
)(ImportLocationsModal));
