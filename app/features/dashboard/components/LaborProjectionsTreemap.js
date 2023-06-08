import autoBind from 'react-autobind';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {List} from 'immutable';
import {AutoSizer} from 'react-virtualized';
import LaborProjectionsTreemapContent from './LaborProjectionsTreemapContent';

export default class LaborProjectionsTreemap extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {models, laborHoursFormat, onClick, isLaborHoursEnabled} = this.props;

    return (
      <div className="treemap">
        <AutoSizer>
          {({width, height}) => (
            <LaborProjectionsTreemapContent
              width={width} height={height}
              models={models}
              laborHoursFormat={laborHoursFormat}
              onClick={onClick}
              isLaborHoursEnabled={isLaborHoursEnabled} />
          )}
        </AutoSizer>
      </div>
    );
  }
}

LaborProjectionsTreemap.propTypes = {
  models: PropTypes.instanceOf(List).isRequired,
  laborHoursFormat: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isLaborHoursEnabled: PropTypes.boolean,
};
