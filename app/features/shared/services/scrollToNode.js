import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import {DURATION, POSITION_CENTER} from '../constants/moveToPositionBehaviors';

export default function (node, positionSet = 'end') {
  if (positionSet === POSITION_CENTER) {
    scrollIntoViewIfNeeded(node, {block: 'center', inline: 'center'}, {duration: DURATION});
  } else {
    scrollIntoViewIfNeeded(node, false, {duration: DURATION});
  }
}
