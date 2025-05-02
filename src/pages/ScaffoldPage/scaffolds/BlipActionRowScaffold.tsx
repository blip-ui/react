import React, { useEffect, useState } from 'react';
import { BlipActionRow, BlipButton } from '@dist';

const BlipActionRowScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

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

  return <BlipActionRow { ...props }
                        onClick={ handleClick }>
    <BlipButton label="Some action" />
  </BlipActionRow>;

};

export default BlipActionRowScaffold;
