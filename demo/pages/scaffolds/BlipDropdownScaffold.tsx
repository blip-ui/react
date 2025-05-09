import React, { useEffect, useState } from 'react';
import { BlipDropdown } from '@lib';

const BlipDropdownScaffold = (_props: any): React.ReactElement => {
  const [ props, setProps ] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_props?.onLogEvent) {
      _props.onLogEvent(e);
    }

    setProps((prevState: any) => ( {
      ...prevState,
      selected: e
    } ));
  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipDropdown { ...props }
                       onChange={ handleChange }
  />;

};

export default BlipDropdownScaffold;
