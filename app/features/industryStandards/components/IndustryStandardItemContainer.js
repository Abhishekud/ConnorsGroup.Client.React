import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {StandardElementModel, StandardElementGroupModel} from '../models';
import IndustryStandardItem from './IndustryStandardItem';
import {
  toggleStandardElementGroup,
  toggleStandardElementComment,
  toggleIndustryStandardMOSTElementProfile,
  toggleIndustryStandardNonMOSTElementProfile,
} from '../actions';
import {
  makeChildIndustryStandardItemsSortedByIndexSelector,
  makeChildIndustryStandardItemsSelector,
  makeChildIndustryStandardItemsCommentCollapsedSelector,
  makeIndustryStandardItemCollapsedSelector,
  makeIndustryStandardItemCommentCollapsedSelector,
} from '../selectors/pages/industryStandardProfile';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {withRouter} from 'react-router';
import {elementTypes} from '../../elements/constants';
import {BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';

class IndustryStandardItemContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleStandardElementGroup() {
    const {toggleStandardElementGroup, standardItem} = this.props;
    toggleStandardElementGroup(standardItem.id);
  }

  handleToggleIndustryStandardElementProfile(standardElementId, elementType) {
    const {toggleIndustryStandardMOSTElementProfile, toggleIndustryStandardNonMOSTElementProfile} = this.props;
    if (elementType === elementTypes.MOST) toggleIndustryStandardMOSTElementProfile(standardElementId);
    else toggleIndustryStandardNonMOSTElementProfile(standardElementId);
  }


  render() {
    const {
      standardItem, handleToggleStandardElementComment,
      timeFormat, childStandardItemsStates, childStandardItemsCommentCollapsed,
      childStandardItems, collapsed, commentCollapsed, hasBetaAccess,
    } = this.props;

    return (
      <div className="industry-standard-item-container">
        <IndustryStandardItem
          standardItem={standardItem}
          timeFormat={timeFormat}
          collapsed={collapsed}
          childStandardItems={childStandardItems}
          onToggleStandardElementGroup={this.handleToggleStandardElementGroup}
          childStandardItemsCommentCollapsed={childStandardItemsCommentCollapsed}
          commentCollapsed={commentCollapsed}
          onToggleComment={handleToggleStandardElementComment}
          childStandardItemsStates={childStandardItemsStates}
          onToggleIndustryStandardElementProfile={this.handleToggleIndustryStandardElementProfile}
          hasBetaAccess={hasBetaAccess} />
      </div>
    );
  }
}

IndustryStandardItemContainer.propTypes = {
  standardItem: PropTypes.oneOfType([
    PropTypes.instanceOf(StandardElementModel),
    PropTypes.instanceOf(StandardElementGroupModel),
  ]).isRequired,
};

function makeMapStateToProps(state, ownProps) {
  const childStandardItemsSelector = makeChildIndustryStandardItemsSortedByIndexSelector();
  const childStandardItemsStatesSelector = makeChildIndustryStandardItemsSelector();
  const childStandardItemsCommentCollapsedSelector = makeChildIndustryStandardItemsCommentCollapsedSelector();
  const collapsedSelector = makeIndustryStandardItemCollapsedSelector();
  const commentCollapsedSelector = makeIndustryStandardItemCommentCollapsedSelector();
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return ({
    timeFormat: timeFormatSelector(state),
    collapsed: collapsedSelector(state, ownProps),
    commentCollapsed: commentCollapsedSelector(state, ownProps),
    childStandardItems: childStandardItemsSelector(state, ownProps),
    childStandardItemsStates: childStandardItemsStatesSelector(state, ownProps),
    childStandardItemsCommentCollapsed: childStandardItemsCommentCollapsedSelector(state, ownProps),
    hasBetaAccess: hasBetaAccessSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleStandardElementGroup,
    handleToggleStandardElementComment: toggleStandardElementComment,
    toggleIndustryStandardMOSTElementProfile,
    toggleIndustryStandardNonMOSTElementProfile,
  },
)(IndustryStandardItemContainer));
