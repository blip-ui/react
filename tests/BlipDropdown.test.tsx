import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BlipDropdown } from '../lib';

describe('BlipDropdown', () => {
  const options = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
  ];

  it('renders with a default selected option', () => {
    render(<BlipDropdown options={options} value="1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens the dropdown when clicked', async () => {
    render(<BlipDropdown options={options} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeVisible();
      expect(screen.getByText('Option 3')).toBeVisible();
    });
  });

  it('selects an option when clicked', async () => {
    const onChange = vi.fn();
    render(<BlipDropdown options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(onChange).toHaveBeenCalledWith('Option 2');
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('closes the dropdown when an option is selected', async () => {
    render(<BlipDropdown options={options} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeVisible();
      expect(screen.queryByText('Option 3')).not.toBeVisible();
    });
  });

  it('displays placeholder text when no option is selected', () => {
    render(<BlipDropdown options={options} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });
});