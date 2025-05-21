import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipActionRow } from '../lib';

describe('BlipActionRow', () => {
  it('renders children correctly', () => {
    render(
      <BlipActionRow>
        <button>Click Me</button>
      </BlipActionRow>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('displays progress correctly', () => {
    const { container } = render(<BlipActionRow progress={ 50 }/>);
    const progressElement = container.querySelector('.BlipActionRow__gradient');
    expect(progressElement).toHaveStyle('width: 50%');
  });

  it('shows error state when error prop is true', () => {
    const { container } = render(<BlipActionRow error={ true }/>);
    const gradientElement = container.querySelector('.BlipActionRow__gradient');
    expect(gradientElement).toHaveClass('BlipActionRow__gradient--error');
  });

  it('shows success state when progress is set and error is false', () => {
    const { container } = render(<BlipActionRow progress={ 100 } error={ false }/>);
    const contentElement = container.querySelector('.BlipActionRow__content');
    const gradientElement = container.querySelector('.BlipActionRow__gradient');
    expect(contentElement).toHaveClass('BlipActionRow__content--success');
    expect(gradientElement).toHaveClass('BlipActionRow__gradient--success');
  });

  it('displays status text correctly', () => {
    render(<BlipActionRow status="Processing..."/>);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

});