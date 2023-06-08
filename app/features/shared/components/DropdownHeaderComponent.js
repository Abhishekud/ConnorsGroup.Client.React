
import React from 'react';
import {PropTypes} from 'prop-types';

export default function DropdownHeaderComponent({onClick}) {
  return (<span onClick={onClick} className="text-info select-dropdown-option-header" role="button" ><i className="fa fa-plus" /> Add New</span>);
}

DropdownHeaderComponent.propTypes = {
  onClick: PropTypes.func,
};
