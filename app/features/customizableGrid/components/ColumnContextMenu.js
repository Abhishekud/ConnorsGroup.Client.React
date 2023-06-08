import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {GridColumnMenuSort, GridColumnMenuItemGroup, GridColumnMenuItemContent} from '@progress/kendo-react-grid';
import {classNames} from '@progress/kendo-react-common';
export class ColumnContextMenu extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleColumnToggle() {
    const {onColumnLockToggle, onCloseMenu, column, locked} = this.props;
    onColumnLockToggle(column.field || '', !locked);
    onCloseMenu();
  }

  handleColumnDisabled() {
    const {onColumnDisableToggle, onCloseMenu, column} = this.props;
    onColumnDisableToggle(column.field || '', false);
    onCloseMenu();
  }

  render() {
    return (<div>
      {this.props.isSortable ? <GridColumnMenuSort {...this.props} /> : ''}
      <GridColumnMenuItemGroup>
        <GridColumnMenuItemContent show>
          <div className={'k-column-list-wrapper'}>
            <div className={'k-column-list'}>
              <div className={classNames('k-column-list-item', {
                'k-state-disabled': this.props.locked || !this.props.lockable,
              })} onClick={this.handleColumnToggle}>
                <span className="k-icon k-i-lock" /> Lock Column
              </div>
              <div className={classNames('k-column-list-item', {
                'k-state-disabled': !this.props.locked,
              })} onClick={this.handleColumnToggle}>
                <span className="k-icon k-i-unlock" /> Unlock Column
              </div>
              <div className={classNames('k-column-list-item', {'k-state-disabled': this.props.locked,
              })} onClick={this.handleColumnDisabled}>
                <span className="k-icon k-i-eye" /> Hide Column
              </div>
            </div>
          </div>
        </GridColumnMenuItemContent>
      </GridColumnMenuItemGroup>
    </div>);
  }

}
export default ColumnContextMenu;
