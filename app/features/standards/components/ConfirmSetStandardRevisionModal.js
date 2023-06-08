import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {ConfirmModal} from '../../shared/components';
import {
  loadStandard,
  setStandardRevision,
  cancelSetStandardRevision,
} from '../actions';
import {
  showSelector,
  processingSelector,
  standardIdSelector,
  revisionNumberSelector,
  validationErrorsSelector,
  hasInactiveCharacteristicsSelector,
  hasInactiveUnitsOfMeasureSelector,
} from '../selectors/modals/setStandardRevision';
import {loadUnitOfMeasureSelectListOptions} from '../../unitsOfMeasure/actions';
import {loadCharacteristicSetSelectListOptions} from '../../characteristics/actions';

class ConfirmSetStandardRevisionModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {standardId, revisionNumber, setStandardRevision, loadStandard, loadUnitOfMeasureSelectListOptions, loadCharacteristicSetSelectListOptions, router} = this.props;

    setStandardRevision(standardId, revisionNumber)
      .then(() => {
        loadUnitOfMeasureSelectListOptions();
        loadCharacteristicSetSelectListOptions();
        loadStandard(standardId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Standard builder.', 'Error'));
      })
      .catch(error => {
        const {validationErrors} = this.props;
        if (validationErrors) {
          toastr.error(validationErrors);
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to set the Standard Revision.', 'Error');
      });
  }

  render() {
    const {show, processing, handleCancel, hasInactiveCharacteristics, hasInactiveUnitsOfMeasure} = this.props;

    const message =
      <span>
        <p>This action will revert the Standard and all of its children back
          to the selected revision. Any outstanding changes to the Standard
          will be discarded. This action cannot be undone.</p>
        {hasInactiveCharacteristics && <p>
          <strong>NOTE:</strong> This revision contains Characteristics that are currently Inactive.
          Continuing will cause these Characteristics to become Active again.
        </p>}
        {hasInactiveUnitsOfMeasure && <p>
          <strong>NOTE:</strong> This revision contains Units of Measure that are currently Inactive.
          Continuing will cause these Units of Measure to become Active again.
        </p>}
        <p>Click Confirm to update the Standard to this revision, or Cancel
          to keep the current revision.</p>
      </span>;

    return (
      <ConfirmModal
        show={show}
        message={message}
        processing={processing}
        onCancel={handleCancel}
        onConfirm={this.handleConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    processing: processingSelector(state),
    standardId: standardIdSelector(state),
    revisionNumber: revisionNumberSelector(state),
    validationErrors: validationErrorsSelector(state),
    hasInactiveCharacteristics: hasInactiveCharacteristicsSelector(state),
    hasInactiveUnitsOfMeasure: hasInactiveUnitsOfMeasureSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandard,
    setStandardRevision,
    handleCancel: cancelSetStandardRevision,
    loadUnitOfMeasureSelectListOptions,
    loadCharacteristicSetSelectListOptions,
  }
)(ConfirmSetStandardRevisionModal));
