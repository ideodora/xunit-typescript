import { sum } from './sum';

sut('add 1 + 2 equals 3', () => {
    expect(sum(1,2)).toBe(3);
});