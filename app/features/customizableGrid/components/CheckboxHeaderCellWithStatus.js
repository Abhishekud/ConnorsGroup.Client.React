import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';


export default class CheckboxHeaderCellWithStatus extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClick() {
    const {onClick, field, disabled} = this.props;
    if (onClick && !disabled) {
      onClick(field);
    }
  }

  render() {
    const {title, saving, partialSelected, allSelected, noneSelected, disabled} = this.props;

    const spanClassNames = classNames(
      'matrix-grid-header-checkbox',
      {disabled: disabled ?? saving, clickable: !saving});

    const iconClassNames = classNames(
      'fa',
      {
        'fa-square-o': noneSelected,
        'fa-check-square-o': allSelected,
        'fa-minus-square-o': partialSelected,
      }
    );

    return (
      <span
        title={title}
        onClick={this.handleClick}
        className={spanClassNames}>
        <i className={iconClassNames} /><span>{title}</span>
      </span>
    );
  }
}

CheckboxHeaderCellWithStatus.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  saving: PropTypes.bool,
  partialSelected: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
  noneSelected: PropTypes.bool.isRequired,
};

