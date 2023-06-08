export default function (selectedStandards, standards) {
  const selectedStandardIds = selectedStandards.map(std => std.get('id'));
  const filteredStandards = standards.filter(x => selectedStandardIds.indexOf(x.get('id')) >= 0);
  const departments = filteredStandards.map(x => x.get('departmentId')).valueSeq().toArray();
  const uniqueIds = [];
  for (let i = 0; i < departments.length; i++) {
    if (uniqueIds.indexOf(departments[i]) === -1) {
      uniqueIds.push(departments[i]);
    }
  }
  return uniqueIds;
}
