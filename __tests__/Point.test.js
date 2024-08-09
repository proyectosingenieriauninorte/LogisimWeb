import Point from '../components/Point.js';

test('Point isEqualTo should return true for identical points', () => {
    const point1 = new Point(100, 100);
    const point2 = new Point(100, 100);
    expect(point1.isEqualTo(point2)).toBe(true);
});

test('Point isEqualTo should return false for different points', () => {
    const point1 = new Point(100, 100);
    const point2 = new Point(120, 100);
    expect(point1.isEqualTo(point2)).toBe(false);
});
