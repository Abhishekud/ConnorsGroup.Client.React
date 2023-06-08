import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  TextInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
} from '../../../forms/components';

class IntegrationEndpointForm extends PureComponent {
  render() {
    const {
      model,
      primaryInputRef,
      formValidationErrors,
      disabled,
      onSubmit,
      onFieldChange,
      onAddEndpointProperty,
    } = this.props;

    return (
      <form onSubmit={onSubmit} autoComplete="off">
        <fieldset disabled={disabled}>
          <TextInput tooltip="Identify the endpoint for reference in drop downs." id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
          <TextInput tooltip="The URL of the Reflexis REST API." id="url" label="URL" onChange={onFieldChange} value={model.get('url')} formValidationErrors={formValidationErrors} />
          <TextInput tooltip="Must match the domain id of the Reflexis instance." id="domainId" label="Customer Domain" onChange={onFieldChange} value={model.get('domainId')} formValidationErrors={formValidationErrors} />
          <TextInput tooltip="Token must match the customer domain." id="siteToken" label="Site Token" onChange={onFieldChange} value={model.get('siteToken')} formValidationErrors={formValidationErrors} data-lpignore="true" />

          <fieldset>
            <legend>
              Authentication Properties
              <button type="button" className="btn btn-sm" onClick={onAddEndpointProperty}><i className="fa fa-plus" title="Add authentication property" /></button>
            </legend>
            {
              model.get('authProperties').map((parameter, index) =>
                (<div key={index}>
                  <TextInput
                    id={`authProperties[${index}].property`}
                    name={`authProperties[${index}].property`}
                    label="Parameter"
                    maxLength={256}
                    value={parameter.get('property')}
                    onChange={onFieldChange}
                    formValidationErrors={formValidationErrors} />
                  <TextInput
                    id={`authProperties[${index}].value`}
                    name={`authProperties[${index}].value`}
                    label="Value"
                    maxLength={1024}
                    value={parameter.get('value')}
                    onChange={onFieldChange}
                    formValidationErrors={formValidationErrors} />
                </div>)
              )
            }
          </fieldset>

          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

IntegrationEndpointForm.propTypes = {
  model: PropTypes.object.isRequired,
  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  //create: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,

  // handlers
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onAddEndpointProperty: PropTypes.func.isRequired,
};

export default withAutoFocusOnEdit()(IntegrationEndpointForm);
