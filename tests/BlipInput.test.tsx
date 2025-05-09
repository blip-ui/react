import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipInput } from '../lib';

describe('BlipInput', () => {
  it('renders correctly', () => {
    render(<BlipInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies default size class', () => {
    const { container } = render(<BlipInput />);
    expect(container.querySelector('.BlipInput-container')).toHaveClass('BlipInput-size-auto');
  });

  it('applies custom size class', () => {
    const { container } = render(<BlipInput size="full" />);
    expect(container.querySelector('.BlipInput-container')).toHaveClass('BlipInput-size-full');
  });

  it('passes through additional props to input element', () => {
    const { container } = render(<BlipInput placeholder="Enter text" type="password" />);
    expect(container.querySelector('.BlipInput-input')).toHaveAttribute('placeholder', 'Enter text');
    expect(container.querySelector('.BlipInput-input')).toHaveAttribute('type', 'password');
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<BlipInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies value prop correctly', () => {
    render(<BlipInput value="initial value" />);
    expect(screen.getByRole('textbox')).toHaveValue('initial value');
  });

  it('applies custom className', () => {
    const { container } = render(<BlipInput className="custom-class" />);
    expect(container.querySelector('.BlipInput-container')).toHaveClass('custom-class');
  });

  it('applies disabled attribute', () => {
    render(<BlipInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});