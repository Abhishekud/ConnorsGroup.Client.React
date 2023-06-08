export default function (x, y) {
  if (typeof x === 'string' && typeof y === 'string') {
    const x1 = x.toLowerCase();
    const y1 = y.toLowerCase();
    if (x1 === y1) return 0;
    return x1 < y1 ? -1 : 1;
  }
  if (x === y) return 0;
  return x < y ? -1 : 1;
}
