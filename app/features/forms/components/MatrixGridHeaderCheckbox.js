import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';

export default class MatrixGridHeaderCheckbox extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClick() {
    const {onChange, columnId} = this.props;
    onChange(columnId);
  }

  render() {
    const {saving, label, rowCount, selectedCount} = this.props;

    const spanClassNames = classNames(
      'ReactVirtualized__Table__headerTruncatedText',
      'matrix-grid-header-checkbox',
      {disabled: saving, clickable: !saving});

    const iconClassNames = classNames(
      'fa',
      {
        'fa-square-o': rowCount === 0 || selectedCount === 0,
        'fa-check-square-o': rowCount > 0 && selectedCount === rowCount,
        'fa-minus-square-o': rowCount > 0 && selectedCount > 0 && selectedCount < rowCount,
      }
    );

    return (
      <span
        title={label}
        onClick={this.handleClick}
        className={spanClassNames}>
        <i className={iconClassNames} /><span>{label}</span>
      </span>
    );
  }
}

MatrixGridHeaderCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  columnId: PropTypes.number.isRequired,
  saving: PropTypes.bool,
  rowCount: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
};
