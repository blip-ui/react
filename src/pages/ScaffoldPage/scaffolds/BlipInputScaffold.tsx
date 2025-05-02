import React, { useEffect, useState } from 'react';
import { BlipInput } from '@dist';

const BlipInputScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_props?.onLogEvent) {
      _props.onLogEvent(e.target.value);
    }

    setProps((prevState: any) => ( {
      ...prevState,
      value: e.target.value
    } ));
  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipInput { ...props }
                    onChange={ handleChange }

  />;

};

export default BlipInputScaffold;
