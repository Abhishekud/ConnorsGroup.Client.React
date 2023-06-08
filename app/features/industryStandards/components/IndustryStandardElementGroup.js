import autoBind from 'react-autobind';
import classNames from 'classnames';
import {Map} from 'immutable';
import {StandardElementGroupModel} from '../models';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class IndustryStandardElementGroup extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }


  render() {
    const {
      standardElementGroup, collapsed,
      onToggleStandardElementGroup, children,
    } = this.props;

    const collapserClassNames = classNames(
      'collapser', 'clickable', 'fa',
      {
        'fa-caret-right': collapsed,
        'fa-caret-down': !collapsed,
      });

    const standardElementGroupClassNames = classNames('industry-standard-element-group', {collapsed});

    return (
      <div className="industry-standard-element-group-container">

        <div id={`standard-item-${standardElementGroup.id}`} className={standardElementGroupClassNames} >
          <div className="content">

            <div className="industry-standard-item-index">{standardElementGroup.index}</div>

            {children.size
              ? <div className="collapser-container">
                <i className={collapserClassNames} onClick={onToggleStandardElementGroup} />
              </div>
              : null}

            <div className="header">
              <span>{standardElementGroup.name}</span>
            </div>

            <div className="normal-time" />

          </div>

          {collapsed ? null : children.valueSeq()}
        </div>
      </div>
    );
  }
}

IndustryStandardElementGroup.propTypes = {
  standardElementGroup: PropTypes.instanceOf(StandardElementGroupModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggleStandardElementGroup: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Map),
};
