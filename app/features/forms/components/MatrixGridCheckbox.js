import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';

export default class MatrixGridCheckbox extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClick(event) {
    event.stopPropagation();

    const {onChange, rowId, columnId} = this.props;
    onChange(rowId, columnId);
  }

  render() {
    const {saving, checked} = this.props;
    const iconClasses = classNames('fa', {'fa-check-square-o': checked, 'fa-square-o': !checked});
    const divClasses = classNames('matrix-grid-checkbox', {disabled: saving, clickable: !saving});

    return (
      <div className={divClasses} onClick={this.handleClick}>
        <i className={iconClasses} />
      </div>
    );
  }
}

MatrixGridCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  rowId: PropTypes.number.isRequired,
  columnId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  saving: PropTypes.bool,
  checked: PropTypes.bool,
};
