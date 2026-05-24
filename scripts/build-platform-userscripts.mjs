import fs from 'node:fs';
import path from 'node:path';

const CONFIG_PATH = 'scripts/platform-meta.json';

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const source = fs.readFileSync(config.source, 'utf8');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatMetaLine(key, value) {
  if (value === true || value === '') {
    return `// @${key}`;
  }

  return `// @${key.padEnd(13, ' ')}${String(value)}`;
}

function upsertMeta(script, key, value) {
  const line = formatMetaLine(key, value);
  const pattern = new RegExp(`^//\\s*@${escapeRegExp(key)}\\s+.*$`, 'm');
  if (pattern.test(script)) {
    return script.replace(pattern, line);
  }

  const endMarker = '// ==/UserScript==';
  if (!script.includes(endMarker)) {
    throw new Error(`Missing userscript header end marker: ${endMarker}`);
  }

  return script.replace(endMarker, `${line}\n${endMarker}`);
}

function buildMetaScript(sourcePath, script) {
  const endMarker = '// ==/UserScript==';
  const endIndex = script.indexOf(endMarker);
  if (endIndex < 0) {
    throw new Error(`Missing userscript header end marker: ${endMarker}`);
  }

  const output = sourcePath.replace(/\.user\.js$/i, '.meta.js');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${script.slice(0, endIndex + endMarker.length)}\n`);
  console.log(`Generated ${output}`);
}

function buildPlatformScript(platformName, platform) {
  if (!platform.output) {
    throw new Error(`Missing output for platform: ${platformName}`);
  }

  let script = source;

  if (platform.downloadURL) {
    script = upsertMeta(script, 'downloadURL', platform.downloadURL);
  }

  if (platform.updateURL) {
    script = upsertMeta(script, 'updateURL', platform.updateURL);
  }

  if (platform.metadata && typeof platform.metadata === 'object') {
    for (const [key, value] of Object.entries(platform.metadata)) {
      if (value === false || value == null) {
        continue;
      }
      script = upsertMeta(script, key, value);
    }
  }

  fs.mkdirSync(path.dirname(platform.output), { recursive: true });
  fs.writeFileSync(platform.output, script);

  console.log(`Generated ${platform.output}`);
}

if (!config.source) {
  throw new Error('Missing source in platform meta config');
}

buildMetaScript(config.source, source);

if (!config.platforms || typeof config.platforms !== 'object') {
  throw new Error('Missing platforms in platform meta config');
}

for (const [platformName, platform] of Object.entries(config.platforms)) {
  buildPlatformScript(platformName, platform);
}