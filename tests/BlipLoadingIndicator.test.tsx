import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipLoadingIndicator } from '../lib';

describe('BlipLoadingIndicator', () => {
  it('renders correctly', () => {
    const { container } = render(<BlipLoadingIndicator />);
    expect(container.querySelector('.BlipLoadingIndicator')).toBeInTheDocument();
  });

  it('contains the loader element', () => {
    const { container } = render(<BlipLoadingIndicator />);
    expect(container.querySelector('.BlipLoadingIndicator__loader')).toBeInTheDocument();
  });

});