import industryStandardsSelector from './industryStandardsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';


export default sortedAndFilteredSelectorBuilder(industryStandardsSelector, sortSelector, filterSelector);
