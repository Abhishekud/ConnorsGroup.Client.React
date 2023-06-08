import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MOSTStepContainer from './MOSTStepContainer';
import DeleteMOSTStepModal from './DeleteMOSTStepModal';
import MoveMOSTStepToPositionModal from './MoveMOSTStepToPositionModal';
import ApplicationRulesSelectionModal from './ApplicationRulesSelectionModal';
import {
  parentTypeSelector,
  parentIdSelector,
  creatingSelector,
  mostStepsSortedByNumberSelector,
  mostTypeSelector,
} from '../selectors/containers/mostSteps';
import {
  createMOSTStep,
  editMOSTStep,
  registerMOSTStepScrollNode,
} from '../actions';
import {
  loadMOSTElementDetails,
} from '../../elements/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {parentTypes} from '../constants';

class MOSTStepsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCreate() {
    const {parentType, parentId, createMOSTStep, router, loadMOSTElementDetails} = this.props;
    createMOSTStep(parentType, parentId, 1)
      .then(response => {
        if (parentType === parentTypes.ELEMENT) loadMOSTElementDetails(parentId);
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add the MOST Step.'));
  }

  addScrollNode(node) {
    if (node) {
      this.props.registerMOSTStepScrollNode(node.id, node);
    }
  }

  render() {
    const {
      mostType,
      mostSteps,
      readOnly,
      creating,
      disabledBulkEdit,
    } = this.props;

    return (
      <div className="most-steps-container">
        {mostSteps.size === 0 && !readOnly
          ? <Button bsStyle="primary" bsSize="large" disabled={creating} onClick={this.handleCreate}>{creating ? 'Adding...' : 'Add a Step'}</Button>
          : null}
        {mostSteps.valueSeq().map(mostStep =>
          (<MOSTStepContainer
            key={mostStep.get('id')}
            readOnly={readOnly}
            disabledBulkEdit={disabledBulkEdit}
            mostType={mostType}
            mostStep={mostStep}
            mostStepsCount={mostSteps.size}
            addScrollNode={this.addScrollNode} />))}
        <DeleteMOSTStepModal />
        <MoveMOSTStepToPositionModal />
        <ApplicationRulesSelectionModal />
      </div>
    );
  }
}

MOSTStepsContainer.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  disabledBulkEdit: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    parentId: parentIdSelector(state),
    parentType: parentTypeSelector(state),
    creating: creatingSelector(state),
    mostSteps: mostStepsSortedByNumberSelector(state),
    mostType: mostTypeSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    createMOSTStep,
    editMOSTStep,
    registerMOSTStepScrollNode,
    loadMOSTElementDetails,
  },
)(MOSTStepsContainer));
