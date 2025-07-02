import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BlipTree, TreeNode } from '../lib/components/BlipTree/BlipTree';

describe('BlipTree', () => {
  const sampleData: TreeNode = {
    id: 'root',
    label: 'Root',
    children: [
      {
        id: 'child1',
        label: 'Child 1',
        children: [
          { id: 'grandchild1', label: 'Grandchild 1' },
          { id: 'grandchild2', label: 'Grandchild 2' },
        ],
      },
      { id: 'child2', label: 'Child 2' },
    ],
  };

  it('renders correctly', () => {
    render(<BlipTree data={ sampleData }/>);
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('expands and collapses nodes', () => {
    render(<BlipTree data={ sampleData }/>);

    expect(screen.queryByText('Grandchild 1')).not.toBeInTheDocument();

    const expandIcon = screen.getAllByRole('img')[ 0 ];
    fireEvent.click(expandIcon);

    expect(screen.getByText('Grandchild 1')).toBeInTheDocument();
    expect(screen.getByText('Grandchild 2')).toBeInTheDocument();

    fireEvent.click(expandIcon);
    expect(screen.queryByText('Grandchild 1')).not.toBeInTheDocument();
  });

  it('selects nodes in single selection mode', () => {
    const onSelectionChange = vi.fn();
    render(<BlipTree data={ sampleData } onSelectionChange={ onSelectionChange }/>);

    const rootCheckbox = screen.getAllByRole('checkbox')[ 0 ];
    fireEvent.click(rootCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith([ 'root' ]);

    const child1Checkbox = screen.getAllByRole('checkbox')[ 1 ];
    fireEvent.click(child1Checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith([ 'child1' ]);
  });

  it('selects nodes in multi selection mode', () => {
    const onSelectionChange = vi.fn();
    render(<BlipTree data={ sampleData } selectionMode="multi" onSelectionChange={ onSelectionChange }/>);

    const rootCheckbox = screen.getAllByRole('checkbox')[ 0 ];
    fireEvent.click(rootCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith([ 'root' ]);

    const child1Checkbox = screen.getAllByRole('checkbox')[ 1 ];
    fireEvent.click(child1Checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith([ 'root', 'child1' ]);
  });

  it('selects nodes in recursive selection mode', () => {
    const onSelectionChange = vi.fn();
    render(<BlipTree data={ sampleData } selectionMode="recursive" onSelectionChange={ onSelectionChange }/>);

    const child1Checkbox = screen.getAllByRole('checkbox')[ 1 ];
    fireEvent.click(child1Checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith([ 'child1', 'grandchild1', 'grandchild2' ]);
  });

  it('deselects nodes in recursive selection mode', () => {
    const onSelectionChange = vi.fn();
    render(<BlipTree data={ sampleData } selectionMode="recursive" onSelectionChange={ onSelectionChange }/>);

    const rootCheckbox = screen.getAllByRole('checkbox')[ 0 ];
    fireEvent.click(rootCheckbox);
    onSelectionChange.mockClear();

    fireEvent.click(rootCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('respects non-selectable nodes', () => {
    const nonSelectableData: TreeNode = {
      ...sampleData,
      children: [
        { ...sampleData.children![ 0 ], selectable: false },
        sampleData.children![ 1 ],
      ],
    };

    render(<BlipTree data={ nonSelectableData }/>);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2); // Root and Child 2 only
  });

});