import moment from 'moment';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function FormattedDate({date, format}) {
  return <span>{date ? moment(date).format(format || 'YYYY-MM-DD hh:mm:ss A') : ''}</span>;
}

FormattedDate.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string,
};
