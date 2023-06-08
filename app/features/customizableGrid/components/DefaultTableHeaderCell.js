import React from 'react';


export default class DefaultTableHeaderCell extends React.Component {
  render() {
    const styles = {
      verticalAlign: 'top',
      cursor: 'pointer',
    };
    let filterClass = '';
    let sortNumberClass = '';
    let sortNumber = '';

    if (this.props.children) {
      filterClass = this.props.children[0] ? this.props.children[0].props.className : '';

      sortNumberClass = this.props.children[1] ? this.props.children[1].props.className : '';
      sortNumber = this.props.children[1] ? this.props.children[1].props.children : null;
    }
    return (
      <a className="k-link" onClick={this.props.onClick} style={styles}>
        {this.props.title}
        <span className={filterClass} />
        <span className={sortNumberClass}>
          {sortNumber}
        </span>
      </a>
    );
  }
}
