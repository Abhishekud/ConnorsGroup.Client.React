import React from 'react';
import {PropTypes} from 'prop-types';

export default function ApplicationRuleItem({indexValue, description, onClick}) {
  return (
    <div className="application-rule-item clickable" onClick={onClick(indexValue)}>
      <div className="application-rule-value">{indexValue}</div>
      <div className="application-rule-description">{description || 'None'}</div>
    </div>
  );
}

ApplicationRuleItem.propTypes = {
  indexValue: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
