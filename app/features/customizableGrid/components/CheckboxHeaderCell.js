import deprecatedComponentWrapper from '../../shared/components/DeprecatedComponentWrapper';
import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';


class CheckboxHeaderCell extends PureComponent {
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
    const {field, title, data, saving, partialSelected, disabled} = this.props;

    const allSelected = data.every(l => l.get(field));
    const noneSelected = data.every(l => !l.get(field));

    const spanClassNames = classNames(
      'matrix-grid-header-checkbox',
      {disabled: disabled ?? saving, clickable: !saving});

    const iconClassNames = classNames(
      'fa',
      {
        'fa-square-o': noneSelected,
        'fa-check-square-o': allSelected,
        'fa-minus-square-o': (!allSelected && !noneSelected) || partialSelected,
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

CheckboxHeaderCell.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  saving: PropTypes.bool,
};

export default deprecatedComponentWrapper(CheckboxHeaderCell, 'Please use CheckboxHeaderCellWithStatus instead');
