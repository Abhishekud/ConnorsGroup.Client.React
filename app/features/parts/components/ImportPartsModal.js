import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportParts,
  importParts,
  loadPartsList,
  showImportPartsValidationErrors,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {selectedPartFamilyIdSelector} from '../selectors/pages/list';
import {partNameSelector} from '../../shared/selectors/components/settings';

class ImportPartsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, updatedRecordCount, totalRecordCount}) {
    const {partName} = this.props;

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} ${(createdRecordCount === 1) ? `${partName} has` : `${pluralize(partName)} have`} been added.`;
    const updatedMsg = `${updatedRecordCount} ${(updatedRecordCount === 1) ? `${partName} has` : `${pluralize(partName)} have`} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {partName, partFamilyId, router, importParts, loadPartsList, showImportPartsValidationErrors} = this.props;

    importParts(partFamilyId, file[0])
      .then(response => {
        loadPartsList(partFamilyId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(partName)} list.`, 'Error'));

        if (Object.keys(response.value.data.validationErrors).length > 0) showImportPartsValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to import the ${pluralize(partName)} CSV file.`, 'Error'));
  }

  render() {
    const {show, handleCancel, importing, partName} = this.props;

    const pluralPartName = pluralize(partName);

    const modalBody =
      <div>
        <h4>Add new {pluralPartName}</h4>
        <p>
          Drop a {pluralPartName} .CSV file here or click to browse.
          Existing {pluralPartName} will be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={`Import ${pluralPartName}`}
        faIcon="fa-cogs"
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
    partName: partNameSelector(state),
    partFamilyId: selectedPartFamilyIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelImportParts,
    importParts,
    loadPartsList,
    showImportPartsValidationErrors,
  }
)(ImportPartsModal));
