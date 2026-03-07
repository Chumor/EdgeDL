import { DOWNLOADERS } from '../core/config.js'
import { buildIntentUrl } from './utils.js';

export function openFDM(url, packageName = DOWNLOADERS.FDM) {
  const intentUrl = buildIntentUrl(url, packageName);
  window.location.href = intentUrl
}