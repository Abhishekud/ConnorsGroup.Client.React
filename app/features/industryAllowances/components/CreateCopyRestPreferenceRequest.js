import autoBind from 'react-autobind';
import {withAutoFocusOnEdit} from '../../forms/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Radio} from 'react-bootstrap';

class CreateCopyRestPreferenceRequest extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      saving,
      onSubmit,
      onFieldChange,
    } = this.props;

    const IGNORE_SOURCE_REST_CALC = 3;
    const OVERWRITE_TARGET_REST_CALC = 2;
    const COPY_SOURCE_REST_CALC = 1;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <div className="form-group copy-modal-labels">
            <label>
              <Radio value={IGNORE_SOURCE_REST_CALC} name="createCopyRestOptions" onChange={onFieldChange} />Ignore source rest calculation and use target rest calculation.
            </label>
          </div>
          <div className="form-group copy-modal-labels">
            <label>
              <Radio value={OVERWRITE_TARGET_REST_CALC} name="createCopyRestOptions" onChange={onFieldChange} />Overwrite target rest calculation with source rest calculation.
            </label>
          </div>
          <div className="form-group copy-modal-labels">
            <label>
              <Radio value={COPY_SOURCE_REST_CALC} name="createCopyRestOptions" onChange={onFieldChange} />Copy source rest calculation into target site as a new rest calculation.
            </label>
          </div>
        </fieldset>
      </form>
    );
  }
}

CreateCopyRestPreferenceRequest.propTypes = {
  saving: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default withAutoFocusOnEdit()(CreateCopyRestPreferenceRequest);
