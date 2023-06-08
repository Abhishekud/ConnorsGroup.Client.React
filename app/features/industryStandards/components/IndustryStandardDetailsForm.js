import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import moment from 'moment';
import {
  Select,
  TextArea,
  TextInput,
  Date,
  withAutoFocusOnEdit,
} from '../../forms/components';

class StandardDetailsForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, departmentName, partsEnabled, partFamilyName,
    } = this.props;
    const fixedVariable = model.get('fixed') ? model.get('fixed').toString() : '';
    return (
      <Fragment>
        <fieldset disabled>
          <TextInput id="name" label="Name" value={model.get('name')} readOnly />
          <TextInput id="departmentId" label={departmentName} value={model.get('departmentName')} readOnly />
          <Select id="fixed" label="Fixed/Variable" value={fixedVariable}
            readOnly options={[{value: 'true', label: 'Fixed'}, {value: 'false', label: 'Variable'}]} />
          <TextInput id="attributeId" label="Attribute" value={model.get('attributeName')} readOnly />
          <TextInput id="jobClassId" label="Job Class" value={model.get('jobClassName')} readOnly />
          <TextInput id="laborCategoryId" label="Labor Category" value={model.get('laborCategoryName')} readOnly />
          <TextInput id="classificationId" label="Classification" value={model.get('classificationName')} readOnly />
          <TextInput id="allowanceId" label="Allowances" value={model.get('allowanceName')} readOnly />

          <Date id="effectiveStartDate" label="Effective Start Date"
            value={model.get('effectiveStartDate') ? moment(model.get('effectiveStartDate')) : null}
            disabled />
          <Date id="effectiveEndDate" label="Effective End Date"
            value={model.get('effectiveEndDate') ? moment(model.get('effectiveEndDate')) : null}
            disabled />
          <TextArea id="applicatorInstructions" label="Applicator Instructions" rows={5}
            value={model.get('applicatorInstructions')} readOnly />
          <TextInput id="applicatorName" label="Applicator" disabled value={model.get('applicatorName')} readOnly />
          <TextInput id="lastEditorName" label="Editor" disabled value={model.get('lastEditorName')} readOnly />

          {partsEnabled &&
          <TextInput id="partFamilyName" label={partFamilyName} disabled value={model.get('partFamilyName')} readOnly />
          }

        </fieldset>
      </Fragment>
    );
  }
}

StandardDetailsForm.propTypes = {
  model: PropTypes.object.isRequired,

  departmentName: PropTypes.string.isRequired,
  partsEnabled: PropTypes.bool.isRequired,
  partFamilyName: PropTypes.string.isRequired,

};

export default withAutoFocusOnEdit()(StandardDetailsForm);
