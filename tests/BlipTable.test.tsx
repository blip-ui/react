import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipTable } from '../lib';

describe('BlipTable', () => {
  const mockColumns = [
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Age', field: 'age' },
  ];

  const mockRows = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 },
  ];

  it('renders correctly with provided columns and rows', () => {
    render(<BlipTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders checkboxes when selectable prop is true', () => {
    render(<BlipTable columns={mockColumns} rows={mockRows} selectable={true} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(mockRows.length);
  });

  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = vi.fn();
    render(<BlipTable columns={mockColumns} rows={mockRows} onRowClick={onRowClick} />);
    fireEvent.click(screen.getByText('John Doe'));
    expect(onRowClick).toHaveBeenCalledWith(mockRows[0], 0);
  });

  it('sorts the table when a column header is clicked', () => {
    render(<BlipTable columns={mockColumns} rows={mockRows} />);
    fireEvent.click(screen.getByText('Name'));
    const cells = screen.getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('Bob Johnson');
    expect(cells[4]).toHaveTextContent('Jane Smith');
    expect(cells[7]).toHaveTextContent('John Doe');
  });

  it('reverses sort order when the same column header is clicked twice', () => {
    render(<BlipTable columns={mockColumns} rows={mockRows} />);
    fireEvent.click(screen.getByText('Name'));
    fireEvent.click(screen.getByText('Name'));
    const cells = screen.getAllByRole('cell');
    expect(cells[1]).toHaveTextContent('John Doe');
    expect(cells[4]).toHaveTextContent('Jane Smith');
    expect(cells[7]).toHaveTextContent('Bob Johnson');
  });

  it('applies custom className', () => {
    const { container } = render(<BlipTable columns={mockColumns} rows={mockRows} className="custom-class" />);
    expect(container.querySelector('.BlipTable-container')).toHaveClass('custom-class');
  });

  it('renders currency type correctly', () => {
    const currencyColumns = [{ label: 'Salary', field: 'salary', type: 'currency' }];
    const currencyRows = [{ salary: 50000 }];
    render(<BlipTable columns={currencyColumns} rows={currencyRows} />);
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();
  });

  it('renders date type correctly', () => {
    const dateColumns = [{ label: 'Date', field: 'date', type: 'date' }];
    const dateRows = [{ date: '2023-06-15T12:00:00Z' }];
    render(<BlipTable columns={dateColumns} rows={dateRows} />);
    expect(screen.getByText(/6\/15\/2023/)).toBeInTheDocument(); // This might need adjustment based on locale
  });
});