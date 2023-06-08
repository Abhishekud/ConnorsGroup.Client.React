import React from 'react';
import {PropTypes} from 'prop-types';
import {List} from 'immutable';
import {Select} from '../../../forms/components';

function KronosEndpointSelect({kronosEndpoints, selectedEndpoint, onChange}) {
  return (
    <Select id="selectedEndpoint" formGroupClassName="selected-endpoint-group" value={selectedEndpoint} options={kronosEndpoints.toJS()} onChange={onChange} />
  );
}

KronosEndpointSelect.propTypes = {
  kronosEndpoints: PropTypes.instanceOf(List).isRequired,
  selectedEndpoint: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default KronosEndpointSelect;
