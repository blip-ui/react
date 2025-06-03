import React, { ReactNode } from 'react';
import './BlipGrid.scss';
import clsx from 'clsx';

export interface BlipGridProps {
  children: ReactNode;
  rows: number;
  columns: number;
  gap?: string;
  className?: string;
}

export interface BlipGridItemProps {
  children: ReactNode;
  row: number;
  column: number;
  rowSpan?: number;
  columnSpan?: number;
}

export const BlipGridItem: React.FC<BlipGridItemProps> = ({ children, row, column, rowSpan = 1, columnSpan = 1 }) => {
  const style: React.CSSProperties = {
    gridRow: `${ row } / span ${ rowSpan }`,
    gridColumn: `${ column } / span ${ columnSpan }`,
    minHeight: 0,
    minWidth: 0
  };

  return <div className="BlipGrid__item" style={ style }>{ children }</div>;
};

export const BlipGrid: React.FC<BlipGridProps> = (
  {
    children,
    rows,
    columns,
    gap = '0rem',
    className = '',
  }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: gap,
    gridTemplateRows: `repeat(${ rows }, 1fr)`,
    gridTemplateColumns: `repeat(${ columns }, 1fr)`,
  };

  return (
    <div className={ clsx('BlipGrid', className) }>
      <div className={ `BlipGrid__wrapper` } style={ gridStyle }>
        { children }
      </div>
    </div>
  );
};