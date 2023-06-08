import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ImportFileModal} from '../../shared/components';
import {showSelector, importingSelector} from '../selectors/modals/import';
import {cancelImportUsers, importUsers, loadUsersList} from '../actions';
import {PropTypes} from 'prop-types';

class ImportUsersModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  showToasterImportMessage({createdRecordCount, totalRecordCount, skippedRecordCount}) {
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} new user${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const skippedMsg = `${skippedRecordCount} user${(skippedRecordCount === 1) ? ' has' : 's have'} been skipped.`;

    toastr.success(`${processedMsg} ${createdMsg} ${skippedMsg}`, 'Import Results');
  }

  handleFileSelected(file) {
    const {
      router,
      importUsers,
      loadUsersList,
    } = this.props;
    importUsers(file[0])
      .then(response => {
        if (Object.keys(response.value.data.validationErrors).length === 0) this.showToasterImportMessage(response.value.data);

        loadUsersList()
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of users.', 'Error'));
      })
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to import the Users CSV file.', 'Error');
      });
  }
  render() {
    const {show, handleCancel, importing} = this.props;
    const modalBody =
      <div>
        <h4>Add new Users</h4>
        <p>
          Drop an Users .CSV file here or click to browse.
          Only new Users will be created.
          Existing Users records will not be updated.
        </p>
      </div>;

    return (
      <ImportFileModal
        show={show}
        saving={importing}
        title="Import Users"
        faIcon="fa-users"
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
    handleCancel: cancelImportUsers,
    importUsers,
    loadUsersList,
  }
)(ImportUsersModal));

ImportUsersModal.propTypes = {
  show: PropTypes.bool.isRequired,
  importing: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  importUsers: PropTypes.func.isRequired,
  loadUsersList: PropTypes.func.isRequired,
};
