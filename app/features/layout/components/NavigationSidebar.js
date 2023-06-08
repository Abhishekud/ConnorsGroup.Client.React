import classNames from 'classnames';
import {Navigation} from '../../shared/components';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {showSelector} from '../selectors/sidebars/navigation';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {toggleNavigationSidebar} from '../actions';
import {settingsVersionSelector} from '../../shared/selectors/components/settings';
import appLogo from '../images/application-logo.png';

class NavigationSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleSidebar() {
    this.props.toggleNavigationSidebar();
  }

  render() {
    const {selectedNavigationGroup, selectedNavigationSubGroup, open, settingsVersion} = this.props;
    const navigationSidebarClasses = classNames('navigation-sidebar', {open, closed: !open});
    const src = `${process.env.API_BASE_URL}logo?version=${settingsVersion}`;

    return (
      <div className={navigationSidebarClasses}>
        <Button className={open ? 'btn-wheat' : 'btn-default'} onClick={this.handleToggleSidebar}>
          {open ? <i className="fa fa-angle-left" /> : <i className="fa fa-angle-right" />}
        </Button>
        <div className="client-logo">
          <img src={src} />
        </div>
        <div className="navigation-container">
          <Navigation selectedNavigationGroup={selectedNavigationGroup} selectedNavigationSubGroup={selectedNavigationSubGroup} />
        </div>
        <div className="application-logo">
          <img src={appLogo} />
        </div>
      </div>
    );
  }
}

NavigationSidebar.propTypes = {
  selectedNavigationGroup: PropTypes.string,
  selectedNavigationSubGroup: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    open: showSelector(state),
    settingsVersion: settingsVersionSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    toggleNavigationSidebar,
  }
)(NavigationSidebar);
