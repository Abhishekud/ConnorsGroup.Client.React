import React from 'react';
import {Map} from 'immutable';
import {PropTypes} from 'prop-types';
import {StandardElementModel, StandardElementGroupModel} from '../models';
import {IndustryStandardElement, IndustryStandardElementGroup} from '.';
import {STANDARD_ELEMENT_GROUP} from '../../standards/constants/standardItemTypes';

export default function IndustryStandardItem({
  standardItem, timeFormat, collapsed, commentCollapsed,
  childStandardItems, childStandardItemsCommentCollapsed, childStandardItemsStates,
  onToggleStandardElementGroup, onToggleComment, onToggleIndustryStandardElementProfile, hasBetaAccess,
}) {
  if (standardItem.type === STANDARD_ELEMENT_GROUP) {

    return (
      <IndustryStandardElementGroup
        standardElementGroup={standardItem}
        collapsed={collapsed}
        childStandardItemsStates={childStandardItemsStates}
        childStandardItems={childStandardItems}
        onToggleStandardElementGroup={onToggleStandardElementGroup} >

        {childStandardItems.map(csi => {
          const standardItemId = csi.id;

          return (
            <IndustryStandardElement
              key={standardItemId}
              standardElement={csi}
              timeFormat={timeFormat}
              commentCollapsed={childStandardItemsCommentCollapsed.get(standardItemId)}
              onToggleComment={onToggleComment}
              onToggleIndustryStandardElementProfile={onToggleIndustryStandardElementProfile}
              hasBetaAccess={hasBetaAccess} />
          );
        })}

      </IndustryStandardElementGroup>
    );
  }

  return (
    <IndustryStandardElement
      standardElement={standardItem}
      timeFormat={timeFormat}
      commentCollapsed={commentCollapsed}
      onToggleComment={onToggleComment}
      onToggleIndustryStandardElementProfile={onToggleIndustryStandardElementProfile}
      hasBetaAccess={hasBetaAccess} />
  );
}

IndustryStandardItem.propTypes = {
  standardItem: PropTypes.oneOfType([
    PropTypes.instanceOf(StandardElementModel),
    PropTypes.instanceOf(StandardElementGroupModel),
  ]).isRequired,
  timeFormat: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  commentCollapsed: PropTypes.bool.isRequired,
  childStandardItems: PropTypes.instanceOf(Map).isRequired,
  childStandardItemsCommentCollapsed: PropTypes.instanceOf(Map).isRequired,
  onToggleStandardElementGroup: PropTypes.func.isRequired,
  onToggleComment: PropTypes.func.isRequired,
  onToggleIndustryStandardElementProfile: PropTypes.func.isRequired,
};
