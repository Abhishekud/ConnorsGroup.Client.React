import standardsSelector from './standardsSelector';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import sortedAndFilteredSelectorBuilder from '../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

export default sortedAndFilteredSelectorBuilder(standardsSelector, sortSelector, filterSelector);
