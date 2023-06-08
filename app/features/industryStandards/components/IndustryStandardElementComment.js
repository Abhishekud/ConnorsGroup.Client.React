import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class IndustryStandardElementComment extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }


  render() {
    const {
      comment,
      collapsed,
    } = this.props;

    if (collapsed) return null;


    return (
      <div className="comment">{comment}</div>
    );
  }
}

IndustryStandardElementComment.propTypes = {
  comment: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
};
