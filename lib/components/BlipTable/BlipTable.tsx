import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './BlipTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faForward } from '@fortawesome/free-solid-svg-icons';
import { BlipInput } from '../BlipInput/BlipInput';
import { dotNotationGet } from '../../utils';
import clsx from 'clsx';
import { BlipButton } from '@lib';

const BlipTableRow = React.memo((props: any) => {
  const { idx, row, columns, selectable, isRowSelected, handleRowClick, parseValue } = props;

  return (
    <tr className={ clsx(
      'BlipTable__row',
      isRowSelected(row) ? 'BlipTable__row--selected' : '')
    }>
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
  );
});

export const BlipTable = (props: any) => {

  const {
    rows = [],
    columns = [],
    rowKey = 'id',
    selectable = false,
    multiple = false,
    onSelectionChange,
    className,
    paginated = false,
    selected = []
  } = props;

  const [ sortColumn, setSortColumn ] = useState<string | null>(props?.initialSortColumn ?? null);
  const [ sortDirection, setSortDirection ] = useState<string | null>(props?.initialSortDirection ?? null);

  const [ page, setPage ] = useState(1);
  const [ inputPage, setInputPage ] = useState<string>('' + page);

  const [ rowsPerPage, setRowsPerPage ] = useState(20);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const calculateVisibleRows = useCallback(() => {
    if (paginated && tableWrapperRef.current) {
      const wrapperHeight = tableWrapperRef.current.clientHeight;
      const rowHeight = 40;
      const visibleRows = Math.floor(wrapperHeight / rowHeight);
      setRowsPerPage(visibleRows);
    } else {
      setRowsPerPage(rows.length);
    }
  }, [ paginated ]);

  const displayedRows: any = useMemo(() => {
    let sortedRows: any = rows;
    if (sortColumn && sortDirection) {
      sortedRows = [ ...rows ].sort((a, b) => {
        const aVal: any = dotNotationGet(a, sortColumn);
        const bVal: any = dotNotationGet(b, sortColumn);
        if (aVal === bVal) { return 0; }
        const comparison = aVal > bVal ? 1 : -1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    const startIndex = ( page - 1 ) * rowsPerPage;
    return sortedRows.slice(startIndex, startIndex + rowsPerPage);
  }, [ rows, sortColumn, sortDirection, page, rowsPerPage ]);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePreviousPage = () => {
    const _page = Math.max(page - 1, 1);
    setPage(_page);
    setInputPage('' + _page);
  };

  const handleFirstPage = () => {
    setPage(1);
    setInputPage('1');
  };

  const handleLastPage = () => {
    setPage(totalPages);
    setInputPage('' + totalPages);
  };

  const handleNextPage = () => {
    const _page = Math.min(page + 1, totalPages);
    setPage(_page);
    setInputPage('' + _page);
  };

  const selectedSet: Set<unknown> = useMemo(() => new Set(selected.map((sel: any) => dotNotationGet(sel, rowKey))), [ selected, rowKey ]);

  const isRowSelected = useMemo(() => (row: any): boolean =>
    ( selected ?? [] ).some((sel: any) =>
      dotNotationGet(sel, rowKey) === dotNotationGet(row, rowKey)
    ), [ selected, rowKey ]);

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
  }, [ selectable, multiple, onSelectionChange, selected ]);

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
    const newSelected = selectedSet.size === displayedRows.length ? [] : displayedRows;
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  }, [ displayedRows, selectedSet.size, onSelectionChange ]);

  const parseValue = useCallback((value: any, type?: string) => {
    if (type === 'date') {
      const d = new Date(value);
      return d.toLocaleString();
    } else if (type === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    } else {
      return value;
    }
  }, []);

  useEffect(() => {
    calculateVisibleRows();
    window.addEventListener('resize', calculateVisibleRows);
    return () => window.removeEventListener('resize', calculateVisibleRows);
  }, [ calculateVisibleRows ]);

  return (
    <div className={ clsx('BlipTable', className) }>
      { rows.length > 0 ? (
        <div className="BlipTable__table-wrapper" ref={ tableWrapperRef }>
          <table className="BlipTable__table">
            <thead>
            <tr>
              { selectable ? (
                <th className="BlipTable__table__header">
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
              <BlipTableRow key={ `row_${ idx }` }
                            row={ row }
                            idx={ idx }
                            columns={ columns }
                            selectable={ selectable }
                            parseValue={ parseValue }
                            handleRowClick={ handleRowClick }
                            isRowSelected={ isRowSelected }
              />
            )) }
            </tbody>
          </table>

        </div>
      ) : null }
      { paginated ? (
        <div className="BlipTable__pagination">
          <BlipButton width="full" disabled={ page === 1 } label={ <FontAwesomeIcon icon={ faBackward }/> } onClick={ handleFirstPage }/>
          <BlipButton width="full" disabled={ page === 1 } label={ <FontAwesomeIcon icon={ faCaretLeft }/> } onClick={ handlePreviousPage }/>
          <BlipInput value={ inputPage }
                     width="full"
                     onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setInputPage(e.target.value) }
                     onBlur={ (e: React.ChangeEvent<HTMLInputElement>) => {
                       if (!isNaN(Number(e.target.value))) {
                         const newPage = parseInt(e.target.value, 10);
                         if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages && newPage !== page) {
                           setPage(newPage);
                         }
                       } else {
                         setInputPage('' + page);
                       }
                     } }/>
          <BlipButton width="full" disabled={ page === totalPages } label={ <FontAwesomeIcon icon={ faCaretRight }/> } onClick={ handleNextPage }/>
          <BlipButton width="full" disabled={ page === totalPages } label={ <FontAwesomeIcon icon={ faForward }/> } onClick={ handleLastPage }/>
        </div>
      ) : null }
    </div>
  );
};