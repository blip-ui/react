import React from 'react';
import './BlipTable.scss';
import { deepEquals, dotNotationGet } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { BlipInput } from '@/lib';

const BlipTable = (props: any) => {

  const {
    rows = [],
    columns = [],
    selected = null,
    selectable = false,
  } = props;

  const [ displayedRows, setDisplayedRows ] = React.useState<any[]>([]);
  const [ sortColumn, setSortColumn ] = React.useState<string | null>(props?.sortColumn);
  const [ sortDirection, setSortDirection ] = React.useState<string | null>(props?.sortDirection);

  const handleRowClick = (row: any, idx: number) => () => {
    if (props.onRowClick) {
      props.onRowClick(row, idx);
    }
  };

  const handleHeaderClick = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  React.useEffect(() => {
    if (rows.length > 0) {
      if (sortColumn && sortDirection) {
        const _displayedRows: any[] = sortDirection === 'asc'
          ? [ ...rows ].sort((a: any, b: any) => a[ sortColumn ] > b[ sortColumn ] ? 1 : -1)
          : [ ...rows ].sort((a: any, b: any) => a[ sortColumn ] < b[ sortColumn ] ? 1 : -1);
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
    <div className="BlipTable-container">

      { rows.length > -1 ? (
        <div className="BlipTable-table-wrapper">

          <table className="BlipTable-table">
            <thead>
            <tr>
              { selectable ? <th></th> : null }
              { ( columns ?? [] ).map((column: any, idx: number) => (
                <th key={ [ 'header', idx ].join('_') }
                    onClick={ () => handleHeaderClick(column.field) }
                >
                  <div>
                    <span>
                      { sortColumn === column.field
                        ? <><FontAwesomeIcon color="black" icon={ sortDirection === 'asc' ? faCaretUp : faCaretDown }/>&nbsp;</>
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
              <tr key={ [ 'row', idx ].join('_') }
              >
                { selectable ?
                  <td className={ deepEquals(selected, row) ? 'BlipTable-selected' : '' }>
                    <BlipInput checked={ deepEquals(selected, row) }
                                onChange={ handleRowClick(row, idx) }
                                className={ deepEquals(selected, row) ? 'BlipTable-selected' : '' }
                                type="checkbox"/>
                  </td>
                  : null }
                { ( columns ?? [] ).map((column: any, jdx: number) => (
                    <td key={ [ 'cell', idx, jdx ].join('_') }
                        className={ deepEquals(selected, row) ? 'BlipTable-selected' : '' }
                        onClick={ handleRowClick(row, idx) }
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

export default BlipTable;
