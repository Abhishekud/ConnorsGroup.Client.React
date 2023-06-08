import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  toggleImportLaborCategories,
  importLaborCategories,
  loadLaborCategoriesList,
  toggleImportLaborCategoriesValidationErrors,
} from '../actions';
import {LABOR_CATEGORIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/import';
import {PropTypes} from 'prop-types';

class ImportLaborCategoriesModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToastrImportMessage({createdRecordCount, totalRecordCount, skippedRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Labor Categor${(createdRecordCount === 1) ? 'y has' : 'ies have'} been added.`;
    const skippedMsg = `${skippedRecordCount} Labor Categor${(skippedRecordCount === 1) ? 'y has' : 'ies have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${skippedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importLaborCategories,
      loadLaborCategoriesList,
      loadSelectListOptions,
      toggleImportLaborCategoriesValidationErrors,
    } = this.props;

    importLaborCategories(file[0])
      .then(response => {

        loadSelectListOptions(LABOR_CATEGORIES);
        loadLaborCategoriesList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Labor Categories list.', 'Error'));
        if (Object.keys(response.value.data.validationErrors).length > 0) toggleImportLaborCategoriesValidationErrors();
        else this.showToastrImportMessage(response.value.data);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to import the Labor Categories CSV file.', 'Error'));
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Labor Categories</h4>
        <p>
          Drop a Labor Categories .CSV file here or click to browse.<br />
          Note: Only new Labor Categories will be created. Existing Labor Categories records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title={'Import Labor Categories'}
        faIcon="fa-calculator"
        body={modalBody}
        onCancel={handleCancel}
        onFileSelected={this.handleFileSelected} />
    );
  }
}

ImportLaborCategoriesModal.propTypes = {
  importing: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  // Actions
  handleCancel: PropTypes.func.isRequired,
  importLaborCategories: PropTypes.func.isRequired,
  toggleImportLaborCategoriesValidationErrors: PropTypes.func.isRequired,
  loadLaborCategoriesList: PropTypes.func.isRequired,
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
    handleCancel: toggleImportLaborCategories,
    importLaborCategories,
    loadLaborCategoriesList,
    loadSelectListOptions,
    toggleImportLaborCategoriesValidationErrors,
  }
)(ImportLaborCategoriesModal));
