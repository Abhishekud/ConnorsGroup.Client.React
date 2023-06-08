import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {} from '../components';
import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {selectTreemapOrTableTab} from '../actions';
import {selectedTabSelector} from '../selectors/pages/dashboard';
import {TREEMAP, TABLE} from '../constants/tabs';

class TreemapTableTabs extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSelect(selectedKey) {
    this.props.selectTreemapOrTableTab(selectedKey);
  }

  render() {
    return (
      <Nav bsStyle="pills" activeKey={this.props.selectedTab} onSelect={this.handleSelect}>
        <NavItem eventKey={TREEMAP}>Treemap</NavItem>
        <NavItem eventKey={TABLE}>Table</NavItem>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedTab: selectedTabSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    selectTreemapOrTableTab,
  }
)(TreemapTableTabs);
