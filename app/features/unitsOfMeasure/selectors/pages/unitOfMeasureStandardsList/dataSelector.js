import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import unitOfMeasureStandardsSelector from './unitOfMeasureStandardsSelector';
import sortedAndFilteredSelectorBuilder from '../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

export default sortedAndFilteredSelectorBuilder(unitOfMeasureStandardsSelector, sortSelector, filterSelector);
