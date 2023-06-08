import {Select, TextArea} from '../../forms/components';
import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import StandardStatusLogs from './StandardStatusLogs';

export default function StandardStatusSettings({
  editing, model, validationErrors, statuses, statusLogs, onFieldChange, onClickComment, showComment, hideHeader, disabled,
}) {
  return (
    <div>
      {hideHeader ? null : <hr />}
      {hideHeader ? null : <h4>Status Settings</h4>}
      <Select
        id="status" label="Standard Status" value={model.get('status')}
        disabled={disabled}
        onChange={onFieldChange}
        options={statuses}
        formValidationErrors={validationErrors} />
      {(editing && showComment)
        ? <TextArea
          id="statusComment"
          label="Status Comment"
          value={model.get('statusComment')}
          disabled={disabled}
          maxLength={256}
          onChange={onFieldChange} />
        : <StandardStatusLogs statusLogs={statusLogs} onClickComment={onClickComment} />}
    </div>
  );
}

StandardStatusSettings.propTypes = {
  editing: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onClickComment: PropTypes.func,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  statuses: PropTypes.array.isRequired,
  statusLogs: PropTypes.array,
  showComment: PropTypes.bool.isRequired,
  hideHeader: PropTypes.bool,
};
