import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {Switch} from '@progress/kendo-react-inputs';
import {Draggable} from 'react-beautiful-dnd';

import {Tooltip} from '@progress/kendo-react-tooltip';

const containerStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
  width: '100%',
  justifyContent: 'space-between',
  border: '1px solid #eaeaea',
  padding: '4px 8px',
  lineHeight: '30px',
  marginBottom: '5px',
};

const switchStyle = {
  flex: '0 0 auto',
};

const titleStyle = {
  flex: '1 0',
  overflowWrap: 'anywhere',
};

const dragStyle = {
  paddingRight: '8px',
  ...switchStyle,
};

export default class GridColumnConfiguration extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleColumnVisibilityToggle({value}) {
    const {toggleColumnVisibility, column} = this.props;
    toggleColumnVisibility(column.get('columnId') || column.get('field'), value);
  }

  handleToggleColumnLock() {
    const {toggleColumnLock, column} = this.props;
    toggleColumnLock(column.get('columnId') || column.get('field'), !column.get('locked'));
  }

  returnTooltip() {
    const {column} = this.props;
    if (column.get('locked')) {
      return <span><i className="fa fa-unlock" /> Unlock</span>;
    }
    return <span><i className="fa fa-lock" /> Lock</span>;
  }

  toggleColumnTooltip() {
    const {column} = this.props;
    if (column.get('included')) {
      return <span>Hide</span>;
    }
    return <span>Unhide</span>;
  }

  render() {
    const {column, index, onlyOneColumn, toggleColumnLock} = this.props;
    const title = column.get('title') || column.get('field');
    const id = column.get('columnId') || column.get('field');
    const locked = column.get('locked');
    const included = column.get('included');
    const lockClass = locked ? 'fa fa-lg fa-lock' : 'fa fa-lg fa-unlock';
    const disableLockColumn = (!column.get('lockable') && !locked) || !column.get('included');
    const disableHideColumn = locked || (column.get('included') && onlyOneColumn);

    if (column.get('required')) return null;

    return (
      <Draggable key={id} draggableId={id} index={index} isDragDisabled={!included} >
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps} >
            <div style={containerStyle}>
              <div style={dragStyle} {...provided.dragHandleProps} ><i className="fa fa-ellipsis-v" /></div>
              <div style={titleStyle}>{title}</div>
              <div style={switchStyle}>
                <Tooltip openDelay={100} position="top" anchorElement="target" content={this.returnTooltip}>
                  { toggleColumnLock && <button className="btn btn-default btn-lock" title="toggle lock" disabled={disableLockColumn} onClick={this.handleToggleColumnLock} >
                    <i className={lockClass} title="toggle lock" />
                  </button>}
                </Tooltip>
              </div>
              <div style={switchStyle}>
                <Tooltip openDelay={100} position="top" parentTitle anchorElement="target" content={this.toggleColumnTooltip}>
                  <div title="toggle hide" style={{'cursor': disableHideColumn ? 'not-allowed' : ''}}>
                    <Switch checked={column.get('included')}
                      onLabel={''} offLabel={''}
                      disabled={disableHideColumn}
                      onChange={this.handleColumnVisibilityToggle} />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
