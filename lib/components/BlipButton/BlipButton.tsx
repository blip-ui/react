import './BlipButton.scss';

import clsx from 'clsx';

export const BlipButton = (props: any) => {

  return (
    <button disabled={ props?.disabled }
            className={ clsx(
              'BlipButton',
              'BlipButton-size-' + ( props?.size ?? 'auto' ),
              props?.disableBump ? null : 'BlipButton-bump',
              props?.className
            ) }
            onClick={ props?.onClick }
    >
      <span className="BlipButton-content">
        { props?.prefix ? <span className="BlipButton-content-prefix">{ props?.prefix ?? null }&nbsp;</span> : null }

        <span className="BlipButton-content-center">{ props?.children ? props?.children : props?.label ?? '' }</span>

        { props?.suffix ? <span className="BlipButton-content-suffix">&nbsp;{ props?.suffix }</span> : null }
      </span>

    </button>
  );
};
