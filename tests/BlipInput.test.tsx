import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipInput } from '../lib';

describe('BlipInput', () => {

  it('renders correctly', () => {
    render(<BlipInput/>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies default width class', () => {
    const { container } = render(<BlipInput/>);
    expect(container.querySelector('.BlipInput')).toHaveClass('BlipInput__width-auto');
  });

  it('applies custom width class', () => {
    const { container } = render(<BlipInput width="full"/>);
    expect(container.querySelector('.BlipInput')).toHaveClass('BlipInput__width-full');
  });

  it('passes through additional props to input element', () => {
    const { container } = render(<BlipInput placeholder="Enter text" type="password"/>);
    expect(container.querySelector('.BlipInput__input')).toHaveAttribute('placeholder', 'Enter text');
    expect(container.querySelector('.BlipInput__input')).toHaveAttribute('type', 'password');
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<BlipInput onChange={ handleChange }/>);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies value prop correctly', () => {
    render(<BlipInput value="initial value"/>);
    expect(screen.getByRole('textbox')).toHaveValue('initial value');
  });

  it('applies custom className', () => {
    const { container } = render(<BlipInput className="custom-class"/>);
    expect(container.querySelector('.BlipInput')).toHaveClass('custom-class');
  });

  it('applies disabled attribute', () => {
    render(<BlipInput disabled/>);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });


  it('applies custom className', () => {
    const { container } = render(<BlipInput className="custom-class"/>);
    expect(container.querySelector('.BlipInput')).toHaveClass('custom-class');
  });

  it('applies disabled attribute', () => {
    render(<BlipInput disabled/>);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  // New tests
  it('handles onFocus event', () => {
    const handleFocus = vi.fn();
    render(<BlipInput onFocus={handleFocus} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('handles onBlur event', () => {
    const handleBlur = vi.fn();
    render(<BlipInput onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('applies readOnly attribute', () => {
    render(<BlipInput readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('applies maxLength attribute', () => {
    render(<BlipInput maxLength={10} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '10');
  });

  it('applies minLength attribute', () => {
    render(<BlipInput minLength={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('minlength', '5');
  });

  it('applies required attribute', () => {
    render(<BlipInput required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('applies pattern attribute', () => {
    const pattern = '[A-Za-z]{3}';
    render(<BlipInput pattern={pattern} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('pattern', pattern);
  });

  it('handles input with controlled value', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<BlipInput value="initial" onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('initial');

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    // Simulate controlled behavior
    rerender(<BlipInput value="new value" onChange={handleChange} />);
    expect(input).toHaveValue('new value');
  });

  it('applies autocomplete attribute', () => {
    render(<BlipInput autoComplete="off" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  it('applies custom data attributes', () => {
    render(<BlipInput data-testid="custom-input" data-custom="value" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-testid', 'custom-input');
    expect(input).toHaveAttribute('data-custom', 'value');
  });
});