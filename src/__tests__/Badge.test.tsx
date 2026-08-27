import { render, screen } from '@testing-library/react';
import { Badge } from '../../src/components/common/Badge';

describe('Badge component', () => {
  test('renders verified variant with default text', () => {
    render(<Badge variant="verified" />);
    expect(screen.getByText('Verified Mentor')).toBeInTheDocument();
  });

  test('renders proficiency variant with provided level', () => {
    render(<Badge variant="proficiency" level="Expert" />);
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });
});
