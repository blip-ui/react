import React, { useEffect, useState } from 'react';
import { BlipTable } from '@/lib';

const BlipTableScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const randomLongText = (): string => {
    const strings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    return Array.from({ length: 100 }, () => strings[ Math.floor(Math.random() * ( strings.length - 1 )) ]).join('');
  };

  const testRows = Array.from({ length: 100 }, (_, index) => ( {
    id: index + 1,
    name: `Test ${ index + 1 }`,
    money: ( Math.random() * 1000 ).toFixed(2),
    date: new Date(Date.now() - Math.random() * 10000000),
    longText: randomLongText(),
  } ));

  const [ columns ] = useState<any[]>([
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Money Example', field: 'money', type: 'currency' },
    { label: 'Date Example', field: 'date', type: 'date' },
    { label: 'Long Text', field: 'longText' },
  ]);

  const handleRowClick = (row: any) => {

  };

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <BlipTable { ...props }
                    rows={ testRows }
                    columns={ columns }
                    onRowClick={ handleRowClick }
  />;

};

export default BlipTableScaffold;
