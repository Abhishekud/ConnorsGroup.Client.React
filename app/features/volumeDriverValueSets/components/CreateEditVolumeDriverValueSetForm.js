import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, withAutoFocusOnEdit, TextArea, ToggleSwitch} from '../../forms/components';
import {Map, List} from 'immutable';
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {PropTypes} from 'prop-types';
import {HelpBlock} from 'react-bootstrap';

class CreateEditVolumeDriverValueSetForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      saving,
      onFieldChange,
      onSubmit,
      primaryInputRef,
      disabled,
      editing,
      createEditVolumeDriverValueSetFormRef,
      isDefaultDisabled,
    } = this.props;

    const modalBody =
      <div>
        <h4>Add new Volume Driver Values for Set</h4>
        <p>
          Drop a Volume Driver Values of set .CSV file here or click to browse.
          This will reset all Volume Driver Values within this set.
        </p>
      </div>;

    const controlValidationErrors = (validationErrors && validationErrors.get('fileContents')) || List();

    return (
      <form onSubmit={onSubmit} ref={createEditVolumeDriverValueSetFormRef} className="create-edit-volume-driver-value-set-form">
        <fieldset disabled={disabled || saving}>
          {(!saving || editing) && <>
            <TextInput
              id="name" label="Name" maxLength={256} value={model.get('name')}
              onChange={onFieldChange}
              inputRef={primaryInputRef}
              formValidationErrors={validationErrors} />
            <TextArea
              id="description" label="Description" maxLength={1024} value={model.get('description')}
              onChange={onFieldChange} rows={5}
              formValidationErrors={validationErrors} />
            <ToggleSwitch id="isDefault" label="Make the default"
              onChange={onFieldChange} checked={model.get('isDefault')} disabled={isDefaultDisabled || saving} />
            {!editing && <div className={controlValidationErrors.size > 0 ? 'has-error' : ''}>
              <h5><b>Import Volume Driver Values for Set</b></h5>
              <Dropzone multiple={false} disabled={saving}>
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()} className="file-dropzone">
                    <input id="file" {...getInputProps()} />
                    <i className={'fa fa-cubes fa-lg side'} /><i className={'fa fa-cubes fa-3x'} /><i className={'fa fa-cubes fa-lg side'} />
                    {modalBody}
                  </div>
                )}
              </Dropzone>
              {controlValidationErrors.size
                ? controlValidationErrors.map((error, index) =>
                  (error === '__invalid__' ? null : <HelpBlock key={index} className="help-block">{error}</HelpBlock>))
                : null}
            </div>}
          </>}
          {saving && !editing && <div>
            <i className="fa fa-spinner fa-spin" title="Processing" />&nbsp;Please wait.  This operation could take some time to complete...
          </div>}
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditVolumeDriverValueSetForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditVolumeDriverValueSetForm);
