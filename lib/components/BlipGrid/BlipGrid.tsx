import React, { ReactNode } from 'react';
import './BlipGrid.scss';
import clsx from 'clsx';
import { BlipFrame } from '../BlipFrame/BlipFrame';

export interface BlipGridProps {
  children?: ReactNode;
  rows: number;
  columns: number;
  gap?: string;
  className?: string;
}

export interface BlipGridItemProps {
  title: string;
  children: ReactNode;
  row: number;
  column: number;
  rowSpan?: number;
  columnSpan?: number;
}

export const BlipGridItem: React.FC<BlipGridItemProps> = (
  {
    title,
    children,
    row,
    column,
    rowSpan = 1,
    columnSpan = 1
  }) => {
  const style: React.CSSProperties = {
    gridRow: `${ row } / span ${ rowSpan }`,
    gridColumn: `${ column } / span ${ columnSpan }`,
    overflow: 'hidden'
  };

  return (
    <div className="BlipGrid__item" style={ style }>
      <BlipFrame title={ title }>
        { children }
      </BlipFrame>
    </div>
  );
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
    gap: gap,
    gridTemplateRows: `repeat(${ rows }, 1fr)`,
    gridTemplateColumns: `repeat(${ columns }, 1fr)`,
  };

  return (
    <div className={ clsx('BlipGrid', className) } style={ gridStyle }>
      <div className="BlipGrid__wrapper" style={ gridStyle }>
        { children }
      </div>
    </div>
  );
};