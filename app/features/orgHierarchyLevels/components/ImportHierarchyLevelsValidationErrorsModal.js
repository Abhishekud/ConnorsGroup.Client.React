import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {closeImportHierarchyLevelsValidationErrorsModal} from '../actions';
import {
  createdHierarchyOptionRecordCountSelector,
  createdHierarchyRecordCountSelector,
  showSelector, totalRecordCountSelector, validationErrorsSelector,
} from '../selectors/modals/importHierarchyLevelsValidationErrors';
import {toastr} from '../../shared/services';
import ImportFileValidationErrorsModal from '../../shared/components/ImportFileValidationErrorsModal';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';

class ImportHierarchyLevelsValidationErrorsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {totalRecordCount, createdHierarchyRecordCount, createdHierarchyOptionRecordCount
      , closeImportHierarchyLevelsValidationErrorsModal} = this.props;

    const message = 'Hierarchy Level';
    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdHierarchyLevelMsg = `${createdHierarchyRecordCount} new ${message}${(createdHierarchyRecordCount === 1) ? ' has' : 's have'} been added.`;
    const createdHierarchyLevelOptionMsg = createdHierarchyOptionRecordCount > 0 ? `${createdHierarchyOptionRecordCount} new ${message} Option${(createdHierarchyOptionRecordCount === 1) ? ' has' : 's have'} been added.` : '';

    toastr.success(`${processedMsg} ${createdHierarchyLevelMsg} ${createdHierarchyLevelOptionMsg}`, 'Import Results');
    closeImportHierarchyLevelsValidationErrorsModal();
  }

  render() {
    const {show, validationErrors} = this.props;

    return (
      <ImportFileValidationErrorsModal
        show={show}
        validationErrors={validationErrors}
        onConfirm={this.handleConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    createdHierarchyRecordCount: createdHierarchyRecordCountSelector(state),
    createdHierarchyOptionRecordCount: createdHierarchyOptionRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeImportHierarchyLevelsValidationErrorsModal,
  }
)(ImportHierarchyLevelsValidationErrorsModal);

ImportHierarchyLevelsValidationErrorsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  totalRecordCount: PropTypes.number.isRequired,
  createdHierarchyRecordCount: PropTypes.number.isRequired,
  createdHierarchyOptionRecordCount: PropTypes.number.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  closeImportHierarchyLevelsValidationErrorsModal: PropTypes.func.isRequired,
};
