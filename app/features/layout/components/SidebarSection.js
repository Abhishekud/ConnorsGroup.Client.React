import autoBind from 'react-autobind';
import React from 'react';
import {PropTypes} from 'prop-types';
import SidebarSectionHeader from './SidebarSectionHeader';
import SidebarHeaderActions from './SidebarSectionHeaderActions';
import SidebarSectionBody from './SidebarSectionBody';
import SidebarSectionTitle from './SidebarSectionTitle';
import SidebarSectionToggle from './SidebarSectionToggle';

export default class SidebarSection extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {collapsed: false};

    autoBind(this);
  }

  handleBodyToggleClick() {
    if (!this.props.collapsible) return;
    const {changeTab, tabIndex} = this.props;
    if (changeTab) {
      changeTab(tabIndex);
      return;
    }
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    const {title, collapsible, headerActions, className, children, showTab, tabIndex} = this.props;
    const collapsed = typeof (showTab) === 'undefined' ? this.state.collapsed : showTab !== tabIndex;

    return (
      <div className={`${className || ''} sidebar-section`}>
        <SidebarSectionHeader>
          <SidebarSectionTitle
            collapsible={collapsible}
            onClick={this.handleBodyToggleClick}>
            {title}
          </SidebarSectionTitle>
          <SidebarHeaderActions collapsed={collapsed}>
            {headerActions}
          </SidebarHeaderActions>
          {collapsible ? <SidebarSectionToggle collapsed={collapsed} onClick={this.handleBodyToggleClick} /> : null}
        </SidebarSectionHeader>
        <SidebarSectionBody collapsed={collapsed}>
          {children}
        </SidebarSectionBody>
      </div>
    );
  }
}

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired,
  collapsible: PropTypes.bool,
  headerActions: PropTypes.element,
  className: PropTypes.string,
};
