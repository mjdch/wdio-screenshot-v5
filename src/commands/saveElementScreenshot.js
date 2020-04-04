import _ from 'lodash';
import makeElementScreenshot from '../modules/makeElementScreenshot';
import saveBase64Image from '../utils/saveBase64Image';

function isElementOrSelector(obj) {
  return _.isString(obj)
    || _.isArray(obj)
    || (_.isObject(obj) && obj.hasOwnProperty("selector"));
}

/**
 * @alias browser.saveElementScreenshot
 * @param {string=} fileName
 * @param {string} elementSelector
 * @param {Object=} options
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
export default async function async(fileName, elementSelector, options) {

  if (isElementOrSelector(fileName) && _.isPlainObject(elementSelector) && _.isUndefined(options)) {
    options = elementSelector;
    elementSelector = fileName;
    fileName = undefined;
  } else if (isElementOrSelector(fileName) && _.isUndefined(elementSelector)) {
    elementSelector = fileName;
    fileName = undefined;
  }

  if (!isElementOrSelector(elementSelector)) {
    throw new Error('Please pass a valid selector or element value to parameter elementSelector');
  }

  // make screenshot of area
  const base64Image = await makeElementScreenshot(this, elementSelector, options);

  if (typeof fileName !== 'undefined') {
    // store base64 image as real png
    await saveBase64Image(fileName, base64Image);
  }

  return base64Image;
}
