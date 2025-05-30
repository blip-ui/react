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

  it('renders with different sizes', () => {
    const { rerender } = render(<BlipButton label="Click me" size="full"/>);
    expect(screen.getByRole('button')).toHaveClass('BlipButton__size-full');

    rerender(<BlipButton label="Click me" size="auto"/>);
    expect(screen.getByRole('button')).toHaveClass('BlipButton__size-auto');

    rerender(<BlipButton label="Click me" size="short"/>);
    expect(screen.getByRole('button')).toHaveClass('BlipButton__size-short');
  });

  it('renders in disabled state', () => {
    render(<BlipButton label="Click me" disabled/>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<BlipButton label="Click me" onClick={ handleClick } disabled/>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with children instead of label', () => {
    render(<BlipButton><span>Custom content</span></BlipButton>);
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });
});