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
      { props?.icon ? <FontAwesomeIcon
        className="BlipButton-icon"
        icon={ props?.icon }/> : null }
      { props?.label && props?.icon ? <span>&nbsp;</span> : '' }
      { props?.label ?? '' }
    </button>
  );
};
