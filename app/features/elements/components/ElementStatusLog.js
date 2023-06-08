import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {Map} from 'immutable';

export default class ElementStatusLog extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClickComment() {
    const {statusLog, onClickComment} = this.props;
    onClickComment(statusLog.get('id'));
  }

  render() {
    const {statusLog} = this.props;

    const comment = statusLog.get('comment');
    const showComment = statusLog.get('showComment');

    let faClass = 'fa-comment-o';
    if (comment && showComment) {
      faClass = 'fa-commenting clickable';
    } else if (comment) {
      faClass = 'fa-commenting-o clickable';
    }

    return (
      <div>
        <div className="element-status-log">
          <div className="statuses">{`${statusLog.get('oldStatus')} to ${statusLog.get('newStatus')}`}</div>
          <div className="date">{statusLog.get('date')}</div>
          <div className="comment">
            <i onClick={comment ? this.handleClickComment : null} className={`fa ${faClass}`} />
          </div>
        </div>
        {showComment ? <div className="element-status-log-comment">{comment}</div> : null}
      </div>
    );
  }
}

ElementStatusLog.propTypes = {
  statusLog: PropTypes.instanceOf(Map).isRequired,
  onClickComment: PropTypes.func.isRequired,
};
