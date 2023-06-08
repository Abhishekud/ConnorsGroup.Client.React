import {Map} from 'immutable';
import createCharacteristicSetState from './createCharacteristicSetState';

export default function (characteristicSets) {
  return Map(characteristicSets.map(cc => [cc.id, createCharacteristicSetState()]));
}
