import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {
  cancelImportHierarchyLevels,
  importHierarchyLevels,
  loadOrgHierarchyLevelsList,
} from '../actions';
import {
  showSelector,
  importingSelector,
} from '../selectors/modals/importHierarchyLevels';
import {LOCATION_PARENTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class ImportHierarchyLevelsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  showToasterImportMessage({createdHierarchyRecordCount, createdHierarchyOptionRecordCount, totalRecordCount}) {
    const message = 'Hierarchy Level';
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdHierarchyLevelMsg = `${createdHierarchyRecordCount} new ${message}${(createdHierarchyRecordCount === 1) ? ' has' : 's have'} been added.`;
    const createdHierarchyLevelOptionMsg = createdHierarchyOptionRecordCount > 0 ? `${createdHierarchyOptionRecordCount} new ${message} Option${(createdHierarchyOptionRecordCount === 1) ? ' has' : 's have'} been added.` : '';

    toastr.success(`${processedMsg} ${createdHierarchyLevelMsg} ${createdHierarchyLevelOptionMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importHierarchyLevels,
      loadOrgHierarchyLevelsList,
      loadSelectListOptions,
    } = this.props;

    importHierarchyLevels(file[0])
      .then(response => {
        loadSelectListOptions(LOCATION_PARENTS);
        loadOrgHierarchyLevelsList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Hierarchy Levels list.', 'Error'));

        if (Object.keys(response.value.data.validationErrors).length === 0) this.showToasterImportMessage(response.value.data);
      })
      .catch(error => {
        if (error.response.status === 400) {
          toastr.error(error.response.data.file[0], 'Import Results');
        } else {
          handleApiError(error, router, 'An error occurred while attempting to import the Hierarchy Levels .csv file.', 'Error');
        }
      });
  }

  render() {
    const {show, handleCancel, importing} = this.props;

    const modalBody =
      <div>
        <h4>Add new Hierarchy Levels</h4>
        <p>
          Drop a Hierarchy Levels .CSV file here or click to browse.
          Only new Hierarchy Levels will be created.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Hierarchy Levels"
        faIcon="fa-sitemap"
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
    handleCancel: cancelImportHierarchyLevels,
    importHierarchyLevels,
    loadOrgHierarchyLevelsList,
    loadSelectListOptions,
  }
)(ImportHierarchyLevelsModal));

ImportHierarchyLevelsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  importing: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  importHierarchyLevels: PropTypes.func.isRequired,
  loadOrgHierarchyLevelsList: PropTypes.func.isRequired,
};
