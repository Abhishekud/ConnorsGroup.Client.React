import React, {Component} from 'react';
import {Switch} from '@progress/kendo-react-inputs';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {TOOLTIP_OPEN_DELAY} from '../../shared/constants/tooltipOpenDelay';
import autoBind from 'react-autobind';

export default class CharacteristicsColumnConfigurationSidebarSwitch extends Component {

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  tooltipContent() {
    const {column} = this.props;
    if (column.get('disabled')) {
      return <span>This column is Locked</span>;
    } else if (column.get('visibleColumn')) {
      return <span>Hide</span>;
    }
    return <span>Unhide</span>;
  }

  render() {
    const {column, toggleVisibility, disabled} = this.props;

    return (
      <Tooltip openDelay={TOOLTIP_OPEN_DELAY} position="left" parentTitle anchorElement="target"
        content={this.tooltipContent}>
        <div title={'Toggle hide'} style={{'cursor': (column.get('disabled') || disabled) ? 'not-allowed' : ''}}>
          <Switch checked={column.get('visibleColumn')}
            onLabel={''} offLabel={''}
            name={column.get('name')}
            disabled={disabled || column.get('disabled')}
            onChange={toggleVisibility} />
        </div>
      </Tooltip>
    );
  }
}
