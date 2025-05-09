import './BlipLoadingIndicator.scss';
import clsx from 'clsx';

export const BlipLoadingIndicator = (props: any) => {
  return (
    <div className={ clsx(
      'BlipLoadingIndicator-container',
      props?.className
    ) }>
      <div className="BlipLoadingIndicator-loader"></div>
    </div>
  );
};
