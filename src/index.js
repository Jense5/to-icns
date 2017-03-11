// @flow

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import FormData from 'form-data';

export const toIcnsFileName = (input: string) => {
  const dir = path.dirname(input);
  const file = path.basename(input);
  const output = `${file.slice(0, file.lastIndexOf('.'))}.icns`;
  return path.resolve(dir, output);
};

export const write = (url: string, output: string) =>
  new Promise((resolve, fail) => {
    fetch(url).then((res) => {
      res.body.pipe(fs.createWriteStream(output)).on('close', () => resolve());
    }).catch(fail);
  });

const UPLOAD = 'https://iconverticons.com/api/upload';
const CONVERT_PRE = 'https://iconverticons.com/api/convert?id=';
const CONVERT_POS = '&output=json&';

const allowedPNGSizes = [16, 24, 32, 48, 64, 96, 128, 256, 512];
const allowedTypes = ['ico', 'icns', 'hqx', ...allowedPNGSizes.map(size => `png${size}`)];
const encTypes = allowedTypes.map(type => `${type}=${type === 'icns' ? '1' : '0'}`).join('&');

const convertUrl = id => `${CONVERT_PRE}${id}${CONVERT_POS}${encTypes}`;

export const convertToIcns = (input: string) =>
  new Promise((resolve, fail) => {
    const body = new FormData();
    body.append('files[]', fs.createReadStream(input));
    fetch(UPLOAD, { method: 'post', body })
    .then(res => res.json())
    .then(jsn => fetch(convertUrl(jsn.id)))
    .then(res => res.json())
    .then((jsn) => {
      const fls = jsn.files || [];
      return fls.filter(file => file.format === 'icns');
    })
    .then((fls) => {
      if (fls.length > 0) {
        write(fls[0].download.uri, toIcnsFileName(input))
        .then(() => resolve(toIcnsFileName(input)))
        .catch(fail);
      } else resolve(undefined);
    })
    .catch(fail);
  });
