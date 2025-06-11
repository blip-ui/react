import React, { useEffect, useState } from 'react';
import { BlipInput } from '@lib';

const BlipInputScaffold = (_props: any): React.ReactElement => {
  const [ props, setProps ] = useState<any>({ value: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _props.onLogEvent(e.target.value);

    setProps((prevState: any) => ( {
      ...prevState,
      value: e.target.value
    } ));
  };

  const handleClear = () => {
    _props.onLogEvent();

    setProps((prevState: any) => ( {
      ...prevState,
      value: '',
    } ));
  };

  const onEditFinished = (value: string) => {
    _props?.onLogEvent(value);
  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipInput { ...props }
                    onEditFinished={ onEditFinished }
                    onClear={ handleClear }
                    onChange={ handleChange }

  />;

};

export default BlipInputScaffold;
