import {createSelector} from 'reselect';
import emailSelector from './emailSelector';

export default createSelector(
  emailSelector,
  email => email.endsWith('@connorsllc.com')
);
