import React, {useState, useCallback, useEffect} from 'react';
import {ControlLabel, FormGroup, HelpBlock} from 'react-bootstrap';
import {filterBy} from '@progress/kendo-data-query';
import {DropDownList} from '@progress/kendo-react-dropdowns';
import {List, Map} from 'immutable';
import {PropTypes} from 'prop-types';
import {PAGE_SIZE} from '../../shared/constants/dropdownList';

export default function SelectDropdownWithFilter({id, name, label, options, optional, formValidationErrors, value, formGroupClassName, onChange, onFilterChange = null, scrollable = null, ...otherProps}) {
  const [data, setData] = useState(options.slice());
  const [filterValue, setFilterValue] = useState('');
  const [skip, setSkip] = useState(0);


  useEffect(() => {
    setData(options.slice());
  }, [options]);

  const controlName = name || id;
  const controlValidationErrors = (formValidationErrors && formValidationErrors.get(controlName)) || List();

  const filterChange = useCallback(event => {
    const data = options.slice();
    setFilterValue(event.filter.value);
    setData(filterBy(data, event.filter));
    setSkip(0);
    if (onFilterChange) onFilterChange(event);
  }, [options]);

  /**
   * DropDownList component does not clear its filter input value in any case so need to clear it mannualy.
   */
  const handleClose = useCallback(() => {
    filterChange({filter: {field: 'label', operator: 'contains', ignoreCase: true, value: ''}});
  });

  const handlePageChange = useCallback(event => {
    setSkip(event.page.skip);
  });

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
  function scrollableOptions(scrollable, skip, total) {
    if (scrollable) {
      return {
        virtual: {pageSize: PAGE_SIZE, skip, total},
      };
    }
    return {};
  }
  function getData(scrollable, data, skip) {
    return scrollable ? data.slice(skip, skip + PAGE_SIZE) : data;
  }
  const selectedValue = value && data.find(v => v.value === value);
  return (
    <FormGroup controlId={id} validationState={controlValidationErrors.size ? 'error' : null}
      className={formGroupClassName}>
      {label ? <ControlLabel>{label}{optional ? <small> (optional)</small> : null}</ControlLabel> : null}
      <DropDownList
        name={controlName}
        className="form-control"
        value={selectedValue}
        data={getData(scrollable, data, skip)}
        textField="label"
        dataItemKey="value"
        filterable
        filter={filterValue}
        onFilterChange={filterChange}
        onChange={handleChange}
        onClose={handleClose}
        onPageChange={handlePageChange}
        {...scrollableOptions(scrollable, skip, data.length)}
        {...otherProps} />

      {controlValidationErrors.size
        ? controlValidationErrors.map((error, index) =>
          (error === '__invalid__' ? null : <HelpBlock key={index} className="validation-error">{error}</HelpBlock>))
        : null}
    </FormGroup>
  );
}

SelectDropdownWithFilter.propTypes = {
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
