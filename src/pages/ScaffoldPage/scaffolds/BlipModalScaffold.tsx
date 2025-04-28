import React, { useEffect, useState } from 'react';
import { BlipButton, BlipModal } from '@/lib';

const BlipModalScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const toggleModal = () => {
    setProps((prevState: any) => ( {
      ...prevState,
      show: !prevState.show,
    } ));
  };

  const handleClick = (e: any) => {
    if (_props?.onLogEvent) {
      _props.onLogEvent();
    }
  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <>
    <BlipButton label="Open Modal" onClick={ toggleModal }/>
    <BlipModal { ...props }
               onClose={ toggleModal }
               actions={ ['close'] }

    >
      Content goes here.
    </BlipModal>
  </>;

};

export default BlipModalScaffold;
