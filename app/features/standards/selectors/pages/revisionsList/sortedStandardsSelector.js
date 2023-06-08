import standardRevisionsSelector from './standardRevisionsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

export default sortedAndFilteredSelectorBuilder(standardRevisionsSelector, sortSelector, filterSelector);
