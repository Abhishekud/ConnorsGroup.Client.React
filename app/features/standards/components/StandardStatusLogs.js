import React from 'react';
import {PropTypes} from 'prop-types';
import StandardStatusLog from './StandardStatusLog';

export default function StandardStatusLogs({statusLogs, onClickComment}) {
  return (
    <div>
      {statusLogs.map(log =>
        <StandardStatusLog key={log.get('id')} statusLog={log} onClickComment={onClickComment} />)}
    </div>
  );
}

StandardStatusLogs.propTypes = {
  statusLogs: PropTypes.array.isRequired,
  onClickComment: PropTypes.func.isRequired,
};
