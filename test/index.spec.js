import { expect } from 'chai';
import { toIcnsFileName } from '../src/index';

describe('Default tests', () => {
  it('should output correct path from png', () => {
    const input = '/from/some/where/icon.png';
    const output = '/from/some/where/icon.icns';
    expect(toIcnsFileName(input)).to.equal(output);
  });
  it('should output correct path from ico', () => {
    const input = '/from/some/where/icon.ico';
    const output = '/from/some/where/icon.icns';
    expect(toIcnsFileName(input)).to.equal(output);
  });
});
