import React, { useCallback, useEffect, useState } from 'react';
import './BlipTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { BlipInput } from '../BlipInput/BlipInput';
import { dotNotationGet } from '../../utils';
import clsx from 'clsx';

export const BlipTable = (props: any) => {

  const {
    rows = [],
    columns = [],
    selectable = false,
    multiple = false,
    onRowClick,
    onSelectionChange,
    className,
    initialSortColumn,
    initialSortDirection,
  } = props;

  const [ displayedRows, setDisplayedRows ] = useState<any[]>([]);
  const [ sortColumn, setSortColumn ] = useState<string | null>(initialSortColumn || null);
  const [ sortDirection, setSortDirection ] = useState<string | null>(initialSortDirection || null);
  const [ selected, setSelected ] = useState<any[]>([]);

  const handleRowClick = useCallback((row: any, idx: number) => {
    if (selectable) {
      setSelected(prevSelected => {
        let newSelected;
        if (multiple) {
          const isSelected = prevSelected.includes(row);
          newSelected = isSelected
            ? prevSelected.filter(item => item !== row)
            : [ ...prevSelected, row ];
        } else {
          newSelected = prevSelected.includes(row) ? [] : [ row ];
        }
        if (onSelectionChange) {
          onSelectionChange(newSelected);
        }
        return newSelected;
      });
    }
    if (onRowClick) {
      onRowClick(row, idx);
    }
  }, [ selectable, multiple, onRowClick, onSelectionChange ]);

  useEffect(() => {
    if (!selectable) {
      setSelected([]);
    }
  }, [ selectable ]);

  const handleHeaderClick = useCallback((column: string) => {
    setSortColumn(prevSortColumn => {
      if (prevSortColumn === column) {
        setSortDirection(prevDirection => {
          if (prevDirection === 'asc') {
            return 'desc';
          }
          if (prevDirection === 'desc') {
            return null;
          }
          return 'asc';
        });
        return column;
      }
      setSortDirection('asc');
      return column;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selected.length === displayedRows.length) {
      setSelected([]);
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    } else {
      setSelected([ ...displayedRows ]);
      if (onSelectionChange) {
        onSelectionChange([ ...displayedRows ]);
      }
    }
  }, [ displayedRows, selected, onSelectionChange ]);

  useEffect(() => {
    if (rows.length > 0) {
      if (sortColumn && sortDirection) {
        const _displayedRows = [ ...rows ].sort((a: any, b: any) => {
          const aValue = dotNotationGet(a, sortColumn);
          const bValue = dotNotationGet(b, sortColumn);
          if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        setDisplayedRows(_displayedRows);
      } else {
        setDisplayedRows(rows);
      }
    }
  }, [ sortColumn, sortDirection, rows ]);

  const parseValue = (value: any, type?: string) => {
    if (type === 'date') {
      const d = new Date(value);
      return d.toLocaleString();
    } else if (type === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    } else {
      return value;
    }
  };

  return (
    <div className={ clsx(
      'BlipTable-container',
      className
    ) }>

      { rows.length > 0 ? (
        <div className="BlipTable-table-wrapper">
          <table className="BlipTable-table">
            <thead>
            <tr>
              { selectable ? <th>{ multiple ? <BlipInput checked={ selected.length === displayedRows.length } onChange={ handleSelectAll } type="checkbox"/> : null }</th> : null }
              { ( columns ?? [] ).map((column: any, idx: number) => (
                <th key={ `header_${ idx }` }
                    onClick={ () => handleHeaderClick(column.field) }
                >
                  <div>
                    <span>
                      { sortColumn === column.field
                        ? <><FontAwesomeIcon icon={ sortDirection === 'asc' ? faCaretUp : faCaretDown }/>&nbsp;</>
                        : null
                      }
                      { column.label }
                    </span>
                  </div>
                </th>
              )) }
            </tr>
            </thead>
            <tbody>
            { ( displayedRows ?? [] ).map((row: any, idx: number) => (
              <tr key={ `row_${ idx }` }
                  className={ selected.includes(row) ? 'BlipTable-selected' : '' }
              >
                { selectable ?
                  <td>
                    <BlipInput checked={ selected.includes(row) }
                               onChange={ () => handleRowClick(row, idx) }
                               type="checkbox"/>
                  </td>
                  : null }
                { ( columns ?? [] ).map((column: any, jdx: number) => (
                    <td key={ `cell_${ idx }_${ jdx }` }
                        onClick={ () => handleRowClick(row, idx) }
                    >
                      { parseValue(dotNotationGet(row, column.field), column.type) }
                    </td>
                  )
                ) }
              </tr>
            )) }
            </tbody>
          </table>
        </div>
      ) : null }
    </div>
  );
};