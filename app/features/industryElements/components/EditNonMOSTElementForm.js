import autoBind from 'react-autobind';
import {
  TextArea,
  TextInput,
  withAutoFocusOnEdit,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class EditNonMOSTElementForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model,
    } = this.props;

    return (
      <form className="edit-element-header-form">
        <fieldset disabled>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')} disabled />
          <TextInput
            id="elementUnitOfMeasureName" label="Unit Of Measure" value={model.get('elementUnitOfMeasureName')}
            disabled />
          <TextInput
            id="elementActivityName" label="Activity" value={model.get('elementActivityName')}
            disabled />
          <TextArea id="applicatorInstructions" label="Applicator Instructions" rows={5}
            value={model.get('applicatorInstructions')} disabled />
          <TextInput id="applicatorName" label="Applicator" disabled value={model.get('applicatorName')} />
          <TextInput id="lastEditorName" label="Editor" disabled value={model.get('lastEditorName')} />
        </fieldset>
      </form>
    );
  }
}

EditNonMOSTElementForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
};

export default withAutoFocusOnEdit()(EditNonMOSTElementForm);
