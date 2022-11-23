import {formatNumber} from './helpers';

describe('test format input fn', () => {
  const phoneNumber = '1111111111';
  const formattedNumber = '+11111111111';
  it('should return formated number with us mask', function () {
    expect(formatNumber(phoneNumber, 'us')).toEqual(formattedNumber);
  });
});
