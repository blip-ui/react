import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './BlipTree.scss';
import { BlipInput } from '../BlipInput/BlipInput';
import clsx from 'clsx';

export interface TreeNode {
  id: string;
  label: string;
  selectable?: boolean;
  children?: TreeNode[];
}

type SelectionMode = 'single' | 'multi' | 'recursive';

interface BlipTreeProps {
  data: TreeNode;
  selectionMode?: SelectionMode;
  onSelectionChange?: (selectedIds: string[]) => void;
  alwaysExpanded?: boolean;
}

const BlipTreeNode: React.FC<{
  node: TreeNode;
  selectedIds: string[];
  onSelect: (id: string, isSelected: boolean) => void;
  selectionMode: SelectionMode;
  level: number;
  alwaysExpanded: boolean;
}> = ({ node, selectedIds, onSelect, selectionMode, level, alwaysExpanded }) => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    if (!alwaysExpanded) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    if (node.selectable !== false) {
      onSelect(node.id, !selectedIds.includes(node.id));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (node.selectable !== false) {
      onSelect(node.id, e.target.checked);
    }
  };

  const isSelected = selectedIds.includes(node.id);

  return (
    <div className={ clsx(
      'BlipTree__node',
      alwaysExpanded ? 'BlipTree__node--always-expanded' : '',
      ) } style={ { paddingLeft: `${ level * 20 }px` } }>
      <div className="BlipTree__node-content" onClick={ handleSelect }>
        <div className="BlipTree__node-controls">
          { node.children && node.children.length > 0 ? (
            <span className="BlipTree__caret" onClick={ toggleExpand }>
              <FontAwesomeIcon fixedWidth icon={ isExpanded ? faMinus : faPlus }/>
            </span>
          ) : (
            <span className="BlipTree__caret-placeholder"></span>
          ) }
          { node.selectable !== false && (
            <BlipInput
              type="checkbox"
              checked={ isSelected }
              onChange={ handleCheckboxChange }
              name={ selectionMode === 'single' ? 'tree-selection' : undefined }
              onClick={ (e: React.MouseEvent) => e.stopPropagation() }
            />
          ) }
        </div>
        <span className="BlipTree__label">{ node.label }</span>
      </div>
      { isExpanded && node.children && (
        <div className="BlipTree__children">
          { node.children.map((childNode) => (
            <BlipTreeNode key={ childNode.id }
                          node={ childNode }
                          selectedIds={ selectedIds }
                          onSelect={ onSelect }
                          selectionMode={ selectionMode }
                          level={ level + 1 }
                          alwaysExpanded={ alwaysExpanded }
            />
          )) }
        </div>
      ) }
    </div>
  );
};

export const BlipTree: React.FC<BlipTreeProps> = ({ data, selectionMode = 'single', onSelectionChange, alwaysExpanded = false }) => {
  const [ selectedIds, setSelectedIds ] = useState<string[]>([]);

  const getDescendantIds = useCallback((node: TreeNode): string[] => {
    let ids: string[] = [];
    if (node.selectable !== false) {
      ids.push(node.id);
    }
    if (node.children) {
      node.children.forEach(child => {
        ids = [ ...ids, ...getDescendantIds(child) ];
      });
    }
    return ids;
  }, []);

  const handleSelect = useCallback((id: string, isSelected: boolean) => {
    let newSelectedIds: string[];

    switch (selectionMode) {
      case 'single':
        newSelectedIds = isSelected ? [ id ] : [];
        break;
      case 'multi':
        newSelectedIds = isSelected
          ? [ ...selectedIds, id ]
          : selectedIds.filter(selectedId => selectedId !== id);
        break;
      case 'recursive':
        const allDescendantIds = getDescendantIds(data);
        if (isSelected) {
          const descendantIds = allDescendantIds.filter(descendantId =>
            descendantId === id || allDescendantIds.indexOf(descendantId) > allDescendantIds.indexOf(id)
          );
          newSelectedIds = [ ...new Set([ ...selectedIds, ...descendantIds ]) ];
        } else {
          const descendantIds = allDescendantIds.filter(descendantId =>
            descendantId === id || allDescendantIds.indexOf(descendantId) > allDescendantIds.indexOf(id)
          );
          newSelectedIds = selectedIds.filter(selectedId => !descendantIds.includes(selectedId));
        }
        break;
      default:
        newSelectedIds = selectedIds;
    }

    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  }, [ selectedIds, selectionMode, data, getDescendantIds, onSelectionChange ]);

  return (
    <div className="BlipTree">
      <BlipTreeNode
        node={ data }
        selectedIds={ selectedIds }
        onSelect={ handleSelect }
        selectionMode={ selectionMode }
        level={ 0 }
        alwaysExpanded={ alwaysExpanded }
      />
    </div>
  );
};