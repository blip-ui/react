import React, { useEffect, useState } from 'react';
import { BlipFrame, BlipTable } from '@lib';

const randomLongText = (): string => {
  const strings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  return Array.from({ length: 100 }, () => strings[ Math.floor(Math.random() * ( strings.length - 1 )) ]).join('');
};

const testRows: any[] = Array.from({ length: 10 }, (_, index) => ( {
  id: '' + index + 1,
  name: `Test ${ index + 1 }`,
  money: ( Math.random() * 1000 ).toFixed(2),
  date: new Date(Date.now() - Math.random() * 10000000),
  longText: randomLongText(),
} ));
const BlipFrameScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const [ columns ] = useState<any[]>([
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Money Example', field: 'money', type: 'currency' },
  ]);

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipFrame { ...props } >
    <BlipTable rows={ testRows } columns={ columns } />
  </BlipFrame>;

};


export default BlipFrameScaffold;
