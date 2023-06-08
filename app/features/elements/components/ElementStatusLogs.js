import React from 'react';
import {PropTypes} from 'prop-types';
import ElementStatusLog from './ElementStatusLog';

export default function ElementStatusLogs({statusLogs, onClickComment}) {
  return (
    <div>
      {statusLogs.map(log =>
        <ElementStatusLog key={log.get('id')} statusLog={log} onClickComment={onClickComment} />)}
    </div>
  );
}

ElementStatusLogs.propTypes = {
  statusLogs: PropTypes.array.isRequired,
  onClickComment: PropTypes.func.isRequired,
};
