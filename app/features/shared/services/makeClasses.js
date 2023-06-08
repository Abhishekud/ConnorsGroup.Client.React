import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';

export default function (classes) {
  return keys(pickBy(classes, v => v === true)).join(' ');
}
