export default function (options) {
  const selectedValues = [];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (!option.selected) continue;
    selectedValues.push(option.value || option.text);
  }

  return selectedValues;
}
