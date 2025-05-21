import React from 'react';

import './BlipFileDropzone.scss';
import clsx from 'clsx';
import { BlipButton } from '@lib';

export const BlipFileDropzone = (props: any) => {

  const dropRef: React.RefObject<HTMLDivElement | null> = React.useRef<HTMLDivElement | null>(null);
  const fileInputRef: React.RefObject<HTMLInputElement | null> = React.useRef<HTMLInputElement | null>(null);
  const [ isDragging, setIsDragging ] = React.useState<boolean>(false);

  const onFileLoaded = React.useCallback((files: File[]): void => {
    if (props?.onFileLoaded) {
      props.onFileLoaded(files);
    }
  }, []);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles: File[] = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleClick = (_: React.MouseEvent<HTMLButtonElement>): void => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles: File[] = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selectedFiles);
  };

  const handleFiles = (files: File[]): void => {
    onFileLoaded(files);
  };

  return (
    <div className={ clsx(
      'BlipFileDropzone',
      isDragging ? 'BlipFileDropzone--dragging' : '',
      props?.className
    ) }
         ref={ dropRef }
         onDragEnter={ handleDragEnter }
         onDragLeave={ handleDragLeave }
         onDragOver={ handleDragOver }
         onDrop={ handleDrop }
    >
      <BlipButton size={ props?.size }
                  label={ 'Upload your file' }
                  onClick={ handleClick }/>
      <input type="file"
             accept=".csv"
             ref={ fileInputRef }
             style={ { display: 'none' } }
             onChange={ handleFileInput }
             multiple
      />
    </div>
  );
};
