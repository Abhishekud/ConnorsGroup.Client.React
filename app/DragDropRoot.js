import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import {
  REORDER_STANDARDS_COLUMN,
  reorderStandardsColumn,
  REORDER_STANDARDS_ITEMS,
  reorderStandardsItems,
} from './features/standards/actions';
import {
  REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN,
  reorderLocationsStandardsExportColumn,
} from './features/locationsStandardsExport/actions';
import {
  REORDER_ATTRIBUTES_COLUMN,
  reorderAttributesColumn,
} from './features/attributes/actions';
import {
  REORDER_LOCATION_DEPARTMENTS_COLUMN,
  reorderLocationDepartmentsColumn,
} from './features/locations/actions';
import {
  REORDER_LOCATION_MAPPING_COLUMN,
  reorderLocationMappingColumn,
} from './features/locationMapping/actions';
import {
  REORDER_CHARACTERISTICS_COLUMN,
  reorderCharacteristicsColumn,
  REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN,
  reorderCharacteristicStandardsGridColumn,
} from './features/characteristics/actions';
import {
  REORDER_VOLUME_DRIVER_MAPPING_COLUMN,
  reorderVolumeDriverMappingColumn,
} from './features/volumeDriverMappings/actions';
import {
  REORDER_ELEMENTS_COLUMN,
  reorderElementsColumn,
} from './features/elements/actions';
import {
  REORDER_PARTS_GRID_COLUMN,
  reorderPartsGridColumn,
} from './features/parts/actions';
import {
  REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN,
  reorderUnitOfMeasureStandardsGridColumn,
} from './features/unitsOfMeasure/actions';
import {
  REORDER_LABOR_STANDARDS_COLUMN,
  reorderLaborStandardsColumn,
} from './features/kronos/laborStandard/actions';

import {
  REORDER_VOLUME_DRIVER_VALUES_COLUMN,
  reorderVolumeDriverValuesColumn,
} from './features/volumeDriverValues/actions';

class DragDropRoot extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  reorderAction(gridId) {
    const {
      reorderStandardsColumn,
      reorderLocationsStandardsExportColumn,
      reorderAttributesColumn,
      reorderLocationDepartmentsColumn,
      reorderLocationMappingColumn,
      reorderCharacteristicsColumn,
      reorderCharacteristicStandardsGridColumn,
      reorderElementsColumn,
      reorderVolumeDriverMappingColumn,
      reorderPartsGridColumn,
      reorderUnitOfMeasureStandardsGridColumn,
      reorderLaborStandardsColumn,
      reorderVolumeDriverValuesColumn,
      reorderStandardsItems,
    } = this.props;

    switch (gridId) {
      case REORDER_STANDARDS_COLUMN:
        return reorderStandardsColumn;
      case REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN:
        return reorderLocationsStandardsExportColumn;
      case REORDER_ATTRIBUTES_COLUMN:
        return reorderAttributesColumn;
      case REORDER_LOCATION_DEPARTMENTS_COLUMN:
        return reorderLocationDepartmentsColumn;
      case REORDER_LOCATION_MAPPING_COLUMN:
        return reorderLocationMappingColumn;
      case REORDER_CHARACTERISTICS_COLUMN:
        return reorderCharacteristicsColumn;
      case REORDER_CHARACTERISTIC_STANDARDS_GRID_COLUMN:
        return reorderCharacteristicStandardsGridColumn;
      case REORDER_ELEMENTS_COLUMN:
        return reorderElementsColumn;
      case REORDER_VOLUME_DRIVER_MAPPING_COLUMN:
        return reorderVolumeDriverMappingColumn;
      case REORDER_PARTS_GRID_COLUMN:
        return reorderPartsGridColumn;
      case REORDER_UNIT_OF_MEASURE_STANDARDS_GRID_COLUMN:
        return reorderUnitOfMeasureStandardsGridColumn;
      case REORDER_LABOR_STANDARDS_COLUMN:
        return reorderLaborStandardsColumn;
      case REORDER_VOLUME_DRIVER_VALUES_COLUMN:
        return reorderVolumeDriverValuesColumn;
      case REORDER_STANDARDS_ITEMS:
        return reorderStandardsItems;
      default:
        throw new Error(`Unable to perform reorder. Unknown grid id ${gridId}`);
    }
  }

  handleDragEnd({draggableId, source, destination}) {
    if (destination === null || source.droppableId !== destination.droppableId || source.index === destination.index) return;

    if (source.droppableId === destination.droppableId && source.index !== destination.index && source.droppableId.includes(REORDER_STANDARDS_ITEMS)) {
      this.reorderAction(REORDER_STANDARDS_ITEMS)(draggableId, source.index, destination.index, source.droppableId);
    } else {
      this.reorderAction(source.droppableId)(draggableId, source.index, destination.index);
    }
  }

  render() {
    const {children} = this.props;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        {children}
      </DragDropContext>
    );
  }
}

export default connect(() => ({}),
  {
    reorderStandardsColumn,
    reorderLocationsStandardsExportColumn,
    reorderAttributesColumn,
    reorderLocationDepartmentsColumn,
    reorderLocationMappingColumn,
    reorderCharacteristicsColumn,
    reorderCharacteristicStandardsGridColumn,
    reorderElementsColumn,
    reorderVolumeDriverMappingColumn,
    reorderPartsGridColumn,
    reorderUnitOfMeasureStandardsGridColumn,
    reorderLaborStandardsColumn,
    reorderVolumeDriverValuesColumn,
    reorderStandardsItems,
  }
)(DragDropRoot);
