export default async function getElements(elementOrSelector) {
  if (_.isString(elementOrSelector)) {
    return await browser.$$(elementOrSelector);
  } else if (_.isArray(elementOrSelector)) {
    return elementOrSelector
  } else {
    return [elementOrSelector];
  }
}
