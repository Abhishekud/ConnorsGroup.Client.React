import React, {useState, useCallback, useEffect} from 'react';
import {ControlLabel, FormGroup, HelpBlock} from 'react-bootstrap';
import {filterBy} from '@progress/kendo-data-query';
import {ComboBox} from '@progress/kendo-react-dropdowns';
import {List, Map} from 'immutable';
import {PropTypes} from 'prop-types';

export default function SelectWithAutoComplete({id, name, label, options, optional, formValidationErrors, value, formGroupClassName, onChange, onFilterChange = null, ...otherProps}) {
  const [data, setData] = useState(options.slice());

  useEffect(() => {
    setData(options.slice());
  }, [options]);

  const controlName = name || id;
  const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

  const filterChange = useCallback(event => {
    const data = options.slice();
    setData(filterBy(data, event.filter));
    if (onFilterChange) onFilterChange(event);
  }, [options]);

  const handleChange = useCallback(event => {
    const cleanedEvent = {
      ...event,
      target: {
        ...event.target,
        name: event.target.props.name,
        value: event.target.value && event.target.value.value,
      },
    };
    onChange(cleanedEvent);
  });
  const selectedValue = value && data.find(v => v.value === value);
  return (
    <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
      className={formGroupClassName}>
      {label ? <ControlLabel>{label}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
      <ComboBox
        name={controlName}
        className="form-control"
        value={selectedValue}
        data={data}
        textField="label"
        dataItemKey="value"
        filterable
        onFilterChange={filterChange}
        onChange={handleChange}
        {...otherProps} />

      {controlValidationErrors.size
        ? controlValidationErrors.map((error, index) =>
          (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
        : null}
    </FormGroup>
  );
}

SelectWithAutoComplete.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  readOnly: PropTypes.bool,
  optional: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  formValidationErrors: PropTypes.instanceOf(Map),
  formGroupClassName: PropTypes.string,
};
