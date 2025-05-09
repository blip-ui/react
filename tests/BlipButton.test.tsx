import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipButton } from '../lib';

describe('BlipButton', () => {
  it('renders with label', () => {
    render(<BlipButton label="Click me"/>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<BlipButton label="Click me" onClick={ handleClick }/>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies size class correctly', () => {
    render(<BlipButton label="Click me" size="short"/>);
    expect(screen.getByText('Click me')).toHaveClass('BlipButton-size-short');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<BlipButton label="Click me" size="small"/>);
    expect(screen.getByText('Click me')).toHaveClass('BlipButton-size-small');

    rerender(<BlipButton label="Click me" size="medium"/>);
    expect(screen.getByText('Click me')).toHaveClass('BlipButton-size-medium');

    rerender(<BlipButton label="Click me" size="large"/>);
    expect(screen.getByText('Click me')).toHaveClass('BlipButton-size-large');
  });

  it('renders in disabled state', () => {
    render(<BlipButton label="Click me" disabled/>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<BlipButton label="Click me" onClick={ handleClick } disabled/>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with children instead of label', () => {
    render(<BlipButton><span>Custom content</span></BlipButton>)
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })
});