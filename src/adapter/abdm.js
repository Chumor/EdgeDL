import { DOWNLOADERS } from '../core/config.js'
import { buildIntentUrl } from './utils.js';

export function openABDM(url, packageName = DOWNLOADERS.ABDM) {
  const intentUrl = buildIntentUrl(url, packageName);
  window.location.href = intentUrl
}