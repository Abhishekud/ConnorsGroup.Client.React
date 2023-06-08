import defaultComparator from './defaultComparator';

export default function (x, y, sortBy, uniqueSortBy, directionMultiplier) {
  const result = defaultComparator(x.get(sortBy), y.get(sortBy));

  if (result !== 0 || sortBy === uniqueSortBy) return result * directionMultiplier;

  return defaultComparator(x.get(uniqueSortBy), y.get(uniqueSortBy));
}
