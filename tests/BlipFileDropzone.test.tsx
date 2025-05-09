import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipFileDropzone } from '../lib';

describe('BlipFileDropzone', () => {
  it('renders correctly', () => {
    render(<BlipFileDropzone/>);
    expect(screen.getByText('Upload your file')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<BlipFileDropzone className="custom-class"/>);
    expect(container.querySelector('.BlipFileDropzone-container')).toHaveClass('custom-class');
  });

  it('changes style when dragging over', () => {
    const { container } = render(<BlipFileDropzone/>);
    const dropzone = container.querySelector('.BlipFileDropzone-container') as HTMLElement;
    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass('BlipFileDropzone-container-dragging');
  });

  it('removes dragging style when drag leaves', () => {
    const { container } = render(<BlipFileDropzone/>);
    const dropzone = container.querySelector('.BlipFileDropzone-container') as HTMLElement;
    fireEvent.dragEnter(dropzone);
    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass('BlipFileDropzone-container-dragging');
  });

  it('calls onFileLoaded when files are dropped', () => {
    const onFileLoaded = vi.fn();
    const { container } = render(<BlipFileDropzone onFileLoaded={ onFileLoaded }/>);
    const dropzone = container.querySelector('.BlipFileDropzone-container') as HTMLElement;
    const file = new File([ 'test' ], 'test.csv', { type: 'text/csv' });
    fireEvent.drop(dropzone, { dataTransfer: { files: [ file ] } });
    expect(onFileLoaded).toHaveBeenCalledWith([ file ]);
  });

  it('opens file dialog when button is clicked', () => {
    render(<BlipFileDropzone/>);
    const button = screen.getByRole('button', { name: 'Upload your file' });
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');
    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('accepts only CSV files', () => {
    const { container } = render(<BlipFileDropzone/>);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', '.csv');
  });
});