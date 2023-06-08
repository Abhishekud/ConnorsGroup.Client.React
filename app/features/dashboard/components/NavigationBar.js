import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {ORG_HIERARCHY_LEVELS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import NavigationBarItem from './NavigationBarItem';
import {
  navbarScrollPositionSelector,
  navbarSelectedValueSelector,
  allowAutoScrollSelector,
  activeBackgroundJobsSelector,
  isActiveBackgroundJobsUpdatedSelector,
} from '../selectors/pages/dashboard';
import {
  setNavigationScrollPosition,
  selectNavigationBarItem,
  selectDashboardLaborProjectionsLevelOptionId,
  getDashboardLaborProjectionsOrgHierarchiesTopLevel,
} from '../actions';
import {MAX_VISIBLE_LEVELS} from '../constants/navbar';
import {
  locationNameSelector,
} from '../../shared/selectors/components/settings';

class NavigationBar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleScrollRight() {
    const {setNavigationScrollPosition, scrollPosition, orgHierarchyLevels} = this.props;
    if (scrollPosition <= orgHierarchyLevels.length - MAX_VISIBLE_LEVELS) {
      setNavigationScrollPosition(scrollPosition + 1);
    }
  }

  handleScrollLeft() {
    const {setNavigationScrollPosition, scrollPosition} = this.props;
    if (scrollPosition > 0) {
      setNavigationScrollPosition(scrollPosition - 1);
    }
  }

  handleSelectedLevel(value) {
    return () => {
      this.props.selectNavigationBarItem(value);
      if (value === 0) {
        const maxLevel = Math.max(...this.props.orgHierarchyLevels.map(x => x.value));
        this.props.selectDashboardLaborProjectionsLevelOptionId(0, Math.max(maxLevel + 1 - MAX_VISIBLE_LEVELS, 0));
      } else {
        this.props.getDashboardLaborProjectionsOrgHierarchiesTopLevel(value);
      }
    };
  }

  render() {
    const {scrollPosition, navbarSelectedValue, setNavigationScrollPosition, allowAutoScroll, locationName,
      isActiveBackgroundJobsUpdated, activeBackgroundJobs} = this.props;
    const orgHierarchyLevels = this.props.orgHierarchyLevels.slice(0).sort((x, y) => x.value - y.value);
    orgHierarchyLevels.push({label: locationName, value: 0});
    const items = orgHierarchyLevels.slice(scrollPosition, scrollPosition + MAX_VISIBLE_LEVELS);
    if (items.findIndex(x => x.value === navbarSelectedValue) === -1 && allowAutoScroll) {
      const newPosition = Math.max(orgHierarchyLevels.findIndex(x => x.value === navbarSelectedValue) - MAX_VISIBLE_LEVELS + 1, 0);
      setTimeout(() => setNavigationScrollPosition(newPosition));
    }
    const disabled = !isActiveBackgroundJobsUpdated || activeBackgroundJobs;

    return (
      <div className="navigation-bar">
        {scrollPosition === 0
          ? <div className="scroll-placeholder" />
          : <div className="scroll-left" onClick={this.handleScrollLeft}><i className="fa fa-caret-left" /></div>}
        {items.map(item => (<NavigationBarItem key={item.value} name={item.label} selected={navbarSelectedValue === item.value}
          onClick={this.handleSelectedLevel(item.value)} disabled={disabled} />))}
        {scrollPosition >= orgHierarchyLevels.length - MAX_VISIBLE_LEVELS
          ? <div className="scroll-placeholder" />
          : <div className="scroll-right" onClick={this.handleScrollRight}><i className="fa fa-caret-right" /></div>}
      </div>
    );
  }
}

NavigationBar.propTypes = {
};

function makeMapStateToProps() {
  const orgHierarchyLevelsSelector = makeSelectListOptionsArraySelector(ORG_HIERARCHY_LEVELS);

  return state => ({
    orgHierarchyLevels: orgHierarchyLevelsSelector(state),
    scrollPosition: navbarScrollPositionSelector(state),
    navbarSelectedValue: navbarSelectedValueSelector(state),
    allowAutoScroll: allowAutoScrollSelector(state),
    locationName: locationNameSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    isActiveBackgroundJobsUpdated: isActiveBackgroundJobsUpdatedSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    setNavigationScrollPosition,
    selectNavigationBarItem,
    getDashboardLaborProjectionsOrgHierarchiesTopLevel,
    selectDashboardLaborProjectionsLevelOptionId,
  }
)(NavigationBar));
