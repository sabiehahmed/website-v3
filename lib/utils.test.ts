import { cn } from './utils'; // Adjust the import path if necessary

describe('cn function', () => {
  it('should merge simple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes correctly', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('should handle mixed string and conditional classes', () => {
    expect(cn('foo', { bar: true, qux: true }, 'baz', { quux: false })).toBe('foo bar qux baz');
  });

  it('should deduplicate class names, keeping the last one for conflicting Tailwind classes', () => {
    // Example: p-4 vs p-2, text-red vs text-blue. tailwind-merge behavior.
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('p-4 text-red-500', 'p-2 text-blue-500')).toBe('p-2 text-blue-500');
  });

  it('should handle empty or falsy inputs gracefully', () => {
    expect(cn('foo', null, 'bar', undefined, 'baz')).toBe('foo bar baz');
    expect(cn(null, undefined)).toBe('');
    expect(cn('')).toBe('');
  });

  it('should correctly merge class names with leading/trailing spaces', () => {
    expect(cn('  foo  ', '  bar  ')).toBe('foo bar');
  });

   it('should handle more complex Tailwind merge scenarios', () => {
    expect(cn('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')).toBe('hover:bg-dark-red p-3 bg-[#B91C1C]');
  });
});
