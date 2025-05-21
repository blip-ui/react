import './BlipLoadingIndicator.scss';
import clsx from 'clsx';

export const BlipLoadingIndicator = (props: any) => {
  return (
    <div className={ clsx(
      'BlipLoadingIndicator',
      props?.className
    ) }>
      <div className="BlipLoadingIndicator__loader"></div>
    </div>
  );
};
