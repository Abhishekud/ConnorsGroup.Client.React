import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {HiddenSubmitButton, TextInput, Select} from '../../forms/components';

export default function CharacteristicsListFiltersForm({model, activeStatuses, applying, onFieldChange, onSubmit}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={applying}>
        <TextInput
          id="name" label="Name" maxLength={256} value={model.get('name')}
          onChange={onFieldChange} autoFocus />
        <TextInput
          id="description" label="Definition" maxLength={1024} value={model.get('description')}
          onChange={onFieldChange} />
        <Select id="status" label="Status" value={model.get('status')} options={activeStatuses} onChange={onFieldChange} />
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

CharacteristicsListFiltersForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  applying: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  activeStatuses: PropTypes.array.isRequired,
};
