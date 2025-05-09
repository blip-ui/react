import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlipModal } from '../lib';

describe('BlipModal', () => {
  it('renders correctly when show is true', () => {
    render(<BlipModal show={ true }>Modal Content</BlipModal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    render(<BlipModal show={ false }>Modal Content</BlipModal>);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<BlipModal show={ true } onClose={ onClose } actions={ [ 'close' ] }>Modal Content</BlipModal>);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<BlipModal show={ true } className="custom-class">Modal Content</BlipModal>);
    expect(container.querySelector('.BlipModal-container')).toHaveClass('custom-class');
  });

  it('renders title when provided', () => {
    const { container } = render(<BlipModal show={ true } title="Modal Title">Modal Content</BlipModal>);
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('renders content in the body', () => {
    const { container } = render(<BlipModal show={ true }>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </BlipModal>);
    expect(container.querySelector('.BlipModal-container')).toBeInTheDocument();
    expect(container.querySelector('.BlipModal-container')).toBeInTheDocument();
  });

  it('does not close modal when clicking inside content area', () => {
    const onClose = vi.fn();
    render(<BlipModal show={ true } onClose={ onClose }>Modal Content</BlipModal>);
    fireEvent.click(screen.getByText('Modal Content'));
    expect(onClose).not.toHaveBeenCalled();
  });
});