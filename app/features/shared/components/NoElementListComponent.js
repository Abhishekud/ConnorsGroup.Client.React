
import React from 'react';
import {PropTypes} from 'prop-types';

export default function NoElementListComponent({messageText}) {
  return <h5 className="text-danger select-dropdown-no-data-text"> {messageText ?? 'This option is not available in the list.'}</h5>;

}

NoElementListComponent.propTypes = {
  messageText: PropTypes.string,
};
