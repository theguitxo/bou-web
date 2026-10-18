import { GeneralUtils } from './general.utils';

describe('GeneralUtils', () => {
  it('identifies valid and invalid array indexes', () => {
    expect(GeneralUtils.IndexInArray(['a', 'b'], 1)).toBe(true);
    expect(GeneralUtils.IndexInArray(['a', 'b'], -1)).toBe(false);
    expect(GeneralUtils.IndexInArray(['a', 'b'], 2)).toBe(false);
  });

  it('counts equal values only when arrays have the same length', () => {
    expect(GeneralUtils.getTotalEqualArrayValues(['a', 'b', 'c'], ['a', 'x', 'c'])).toBe(2);
    expect(GeneralUtils.getTotalEqualArrayValues(['a'], ['a', 'b'])).toBe(0);
  });
});
