import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    rowKey = 'id',
    selectable = false,
    multiple = false,
    onRowClick,
    onSelectionChange,
    className,
    selected = []
  } = props;

  const [ sortColumn, setSortColumn ] = useState<string | null>(props?.initialSortColumn ?? null);
  const [ sortDirection, setSortDirection ] = useState<string | null>(props?.initialSortDirection ?? null);

  const displayedRows = useMemo(() => {
    if (sortColumn && sortDirection) {
      return [ ...rows ].sort((a, b) => {
        const aVal = dotNotationGet(a, sortColumn);
        const bVal = dotNotationGet(b, sortColumn);
        return sortDirection === 'asc'
          ? aVal > bVal ? 1 : -1
          : aVal < bVal ? 1 : -1;
      });
    }
    return rows;
  }, [ rows, sortColumn, sortDirection ]);

  const isRowSelected = (row: any): boolean => ( selected ?? [] ).some((sel: any) => dotNotationGet(sel, rowKey) === dotNotationGet(row, rowKey));

  const handleRowClick = useCallback((row: any, idx: number) => {
    if (selectable) {
      let newSelected: any;
      if (multiple) {
        const isSelected: boolean = isRowSelected(row);
        newSelected = isSelected
          ? ( selected ?? [] ).filter(item => item !== row)
          : [ ...( selected ?? [] ), row ];
      } else {
        newSelected = isRowSelected(row) ? [] : [ row ];
      }
      if (onSelectionChange) {
        onSelectionChange(newSelected);
      }
    }
    if (onRowClick) {
      onRowClick(row, idx);
    }
  }, [ selectable, multiple, onRowClick, onSelectionChange, selected ]);

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
    if (selected?.length === displayedRows.length) {
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    } else {
      if (onSelectionChange) {
        onSelectionChange([ ...displayedRows ]);
      }
    }
  }, [ displayedRows, selected, onSelectionChange ]);

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
    <div className={ clsx('BlipTable', className) }>
      { rows.length > 0 ? (
        <div className="BlipTable__table-wrapper">
          <table className="BlipTable__table">
            <thead>
            <tr>
              { selectable ? (
                <th className="BlipTable__header">
                  { multiple ? (
                    <BlipInput checked={ selected?.length === displayedRows.length } onChange={ handleSelectAll } type="checkbox"/>
                  ) : null }
                </th>
              ) : null }
              { ( columns ?? [] ).map((column: any, idx: number) => (
                <th key={ `header_${ idx }` }
                    className="BlipTable__header"
                    onClick={ () => handleHeaderClick(column.field) }
                >
                  <div>
                    <span>
                      { sortColumn === column.field ? (
                        <><FontAwesomeIcon icon={ sortDirection === 'asc' ? faCaretUp : faCaretDown }/>&nbsp;</>
                      ) : null }
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
                  className={ isRowSelected(row) ? 'BlipTable__selected' : '' }
              >
                { selectable ?
                  <td>
                    <BlipInput checked={ isRowSelected(row) }
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