import './BlipButton.scss';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BlipButton = (props: any) => {

  return (
    <button
      disabled={ props?.disabled }
      className={ clsx(
        'BlipButton',
        'BlipButton-size-' + ( props?.size ?? 'auto' ),
      ) }
      onClick={ props?.onClick }
    >
      <span className={ 'BlipButton-icon' }>{ props?.icon && <FontAwesomeIcon icon={ props?.icon }/> }</span>
      { props?.label && props?.icon ? <span>&nbsp;</span> : '' }
      { props?.label ?? '' }
    </button>
  );
};
