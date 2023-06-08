import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {TextArea} from '../../forms/components';

export default class StandardElementComment extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {onFieldChange, standardElementId} = this.props;
    onFieldChange(standardElementId, event);
  }

  handleCreate() {
    const {standardElementId, comment, onCreate} = this.props;
    onCreate(standardElementId, comment);
  }

  handleCancel() {
    const {standardElementId, onCancel} = this.props;
    onCancel(standardElementId);
  }

  render() {
    const {
      comment,
      collapsed, disabled, editing,
      commentEntered,
    } = this.props;

    if (collapsed) return null;

    if (!commentEntered || editing) {
      const actions = (
        <div className="actions">
          <Button bsStyle="primary" disabled={disabled} onClick={this.handleCreate}>Add</Button>
          <Button bsStyle="default" disabled={disabled} onClick={this.handleCancel}>Cancel</Button>
        </div>
      );

      return (
        <div className="comment">
          <TextArea
            id="comment" rows={3} maxLength={2048} autoFocus={!editing}
            disabled={disabled} value={comment} onChange={this.handleFieldChange} />
          {editing ? null : actions}
        </div>
      );
    }

    return (
      <div className="comment">{comment}</div>
    );
  }
}

StandardElementComment.propTypes = {
  standardElementId: PropTypes.number.isRequired,
  comment: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  onFieldChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
};
