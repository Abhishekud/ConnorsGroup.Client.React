import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {select} from 'd3-selection';
import {stratify, treemap} from 'd3-hierarchy';
import {scaleOrdinal} from 'd3-scale';
import {List} from 'immutable';
import numeral from 'numeral';

const colorSchemes = ['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d', '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476', '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc', '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'];

export default class LaborProjectionsTreemapContent extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    if (!this.props.models.size) return;

    this.buildHierarchy();
    this.drawTreemap();
  }

  componentDidUpdate() {
    if (!this.props.models.size) return;

    this.drawTreemap();
  }

  drawTreemap() {
    const hierarchy = this.buildHierarchy();

    const g = this.createGElements(hierarchy);
    this.createRectElements(g);
    this.createTextElements(g);
    this.createTitleElements(g);
  }

  buildHierarchy() {
    const {width, height, models} = this.props;

    const modelsWithRoot = this.addRootToModels(models);
    const hierarchy = this.createHierarchy(modelsWithRoot);

    const treemapCoordinatesAppender = this.createTreemapCoordinatesAppender(width, height);
    return treemapCoordinatesAppender(hierarchy);
  }

  addRootToModels(models) {
    const parentId = models.getIn([0, 'parentId']);
    return models
      .map(model => model.set('parentId', `parent-${parentId}`))
      .unshift({id: `parent-${parentId}`, parentId: null, name: null});
  }

  createHierarchy(modelsWithRoot) {
    return stratify()(modelsWithRoot.toJS())
      .sum(d => d.laborHours)
      .sort((a, b) => b.height - a.height || b.value - a.value);
  }

  createTreemapCoordinatesAppender(width, height) {
    return treemap()
      .size([width, height])
      .paddingInner(10);
  }

  createGElements(hierarchy) {
    const g = select(this.svg)
      .selectAll('g')
      .data(hierarchy.leaves(), d => d.data.id);

    g.exit()
      .remove();

    return g
      .enter()
      .append('g')
      .attr('class', this.props.onClick ? 'clickable' : null)
      .on('click', this.handleClick)
      .merge(g)
      .attr('transform', d => `translate(${d.x0},${d.y0})`);
  }

  createRectElements(g) {
    const colorScale = scaleOrdinal(colorSchemes);

    const rect = g
      .selectAll('rect')
      .data(d => [d], d => d.data.id);

    rect
      .enter()
      .append('rect')
      .attr('fill', d => colorScale(d.data.id))
      .merge(rect)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0);

    rect
      .exit()
      .remove();
  }

  createTextElements(g) {
    const {models, isLaborHoursEnabled} = this.props;
    let text = g
      .selectAll('text')
      .data(d => [d], d => d.data.id);

    text
      .exit()
      .remove();

    text = text
      .enter()
      .append('text')
      .attr('x', 10)
      .attr('y', 25)
      .attr('fill', 'white')
      .merge(text);

    this.createTitleTspanElements(text);

    let dy = 20;

    if (models.hasIn([0, 'standardCount'])) {
      this.createStandardCountTspanElements(text, dy);
      dy = 16;
    }
    if (!isLaborHoursEnabled) {
      return;
    }
    this.createLaborHoursTspanElements(text, dy);
  }

  createTitleTspanElements(text) {
    const tspanTitle = text
      .selectAll('tspan.title')
      .data(d => [d], d => d.data.id);

    tspanTitle
      .exit()
      .remove();

    tspanTitle
      .enter()
      .append('tspan')
      .attr('class', 'title')
      .attr('x', 10)
      .attr('dy', 0)
      .style('font-weight', 'bold')
      .text(d => d.data.name);
  }

  createStandardCountTspanElements(text, dy) {
    const tspanStandardCount = text
      .selectAll('tspan.standard-count')
      .data(d => [d], d => d.data.id);

    tspanStandardCount
      .exit()
      .remove();

    tspanStandardCount
      .enter()
      .append('tspan')
      .attr('class', 'standard-count')
      .attr('x', 10)
      .attr('dy', dy)
      .style('font-size', '13px')
      .text(d => `# Standards: ${d.data.standardCount}`);
  }

  createLaborHoursTspanElements(text, dy) {
    const tspanLaborHours = text
      .selectAll('tspan.labor-hours')
      .data(d => [d], d => d.data.id);

    tspanLaborHours
      .exit()
      .remove();

    tspanLaborHours
      .enter()
      .append('tspan')
      .attr('class', 'labor-hours')
      .attr('x', 10)
      .attr('dy', dy)
      .style('font-size', '13px')
      .text(d => `Labor Hours: ${numeral(d.data.laborHours).format(this.props.laborHoursFormat)}`);
  }

  createTitleElements(g) {
    const title = g
      .selectAll('title')
      .data(d => [d], d => d.data.id);

    title
      .exit()
      .remove();

    title
      .enter()
      .append('title')
      .text(d => this.formatCellTitle(d.data));
  }

  formatCellTitle(data) {
    let title = `${data.name}\n`;
    const {models, laborHoursFormat, isLaborHoursEnabled} = this.props;

    if (models.hasIn([0, 'standardCount'])) {
      title += `# Standards: ${data.standardCount}\n`;
    }

    if (!isLaborHoursEnabled) {
      return title;
    }
    title += `Labor Hours: ${numeral(data.laborHours).format(laborHoursFormat)}`;

    return title;
  }

  handleClick(d) {
    const {onClick} = this.props;
    if (!onClick) return;

    onClick(d.data.id);
  }

  svgRefHandler(svg) {
    this.svg = svg;
  }

  render() {
    const {width, height, models} = this.props;
    return models.size
      ? <svg width={width} height={Math.max(height, 300)} ref={this.svgRefHandler} />
      : <div className="no-rows" style={{width}}><h3>No Labor Projections found</h3></div>;
  }
}

LaborProjectionsTreemapContent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  models: PropTypes.instanceOf(List).isRequired,
  laborHoursFormat: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
