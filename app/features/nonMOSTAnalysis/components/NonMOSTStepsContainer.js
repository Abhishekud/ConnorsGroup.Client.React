import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import NonMOSTStepContainer from './NonMOSTStepContainer';
import DeleteNonMOSTStepModal from './DeleteNonMOSTStepModal';
import MoveNonMOSTStepToPositionModal from './MoveNonMOSTStepToPositionModal';
import {
  parentTypeSelector,
  parentIdSelector,
  creatingSelector,
  nonMOSTStepsSortedByNumberSelector,
} from '../selectors/containers/nonMOSTSteps';
import {
  createNonMOSTStep,
  editNonMOSTStep,
  registerNonMOSTStepScrollNode,
} from '../actions';
import {
  loadNonMOSTElementDetails,
} from '../../elements/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {parentTypes} from '../constants';

class NonMOSTStepsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCreate() {
    const {parentType, parentId, createNonMOSTStep, router, loadNonMOSTElementDetails} = this.props;
    createNonMOSTStep(parentType, parentId, 1)
      .then(response => {
        if (parentType === parentTypes.ELEMENT) loadNonMOSTElementDetails(parentId);
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add the Non MOST Step.'));
  }

  addScrollNode(node) {
    if (node) {
      this.props.registerNonMOSTStepScrollNode(node.id, node);
    }
  }

  render() {
    const {
      readOnly,
      disabledBulkEdit,
      nonMOSTSteps,
      creating,
    } = this.props;

    return (
      <div className="non-most-steps-container">
        {nonMOSTSteps.size === 0 && !readOnly
          ? <Button bsStyle="primary" bsSize="large" disabled={creating} onClick={this.handleCreate}>{creating ? 'Adding...' : 'Add a Step'}</Button>
          : null}
        {nonMOSTSteps.valueSeq().map(nonMOSTStep =>
          (<NonMOSTStepContainer
            key={nonMOSTStep.get('id')}
            readOnly={readOnly}
            disabledBulkEdit={disabledBulkEdit}
            nonMOSTStep={nonMOSTStep}
            nonMOSTStepsCount={nonMOSTSteps.size}
            addScrollNode={this.addScrollNode} />))}
        <DeleteNonMOSTStepModal />
        <MoveNonMOSTStepToPositionModal />
      </div>
    );
  }
}

NonMOSTStepsContainer.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  disabledBulkEdit: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    parentId: parentIdSelector(state),
    parentType: parentTypeSelector(state),
    creating: creatingSelector(state),
    nonMOSTSteps: nonMOSTStepsSortedByNumberSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    createNonMOSTStep,
    editNonMOSTStep,
    registerNonMOSTStepScrollNode,
    loadNonMOSTElementDetails,
  },
)(NonMOSTStepsContainer));
