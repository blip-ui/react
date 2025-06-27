import React, { useEffect, useState } from 'react';
import { BlipTree } from '@lib';

const treeData = {
  id: 'root',
  label: 'Root',
  children: [
    {
      id: 'folder1',
      label: 'Folder 1',
      children: [
        { id: 'file1', label: 'File 1' },
        { id: 'file2', label: 'File 2' },
      ],
    },
    {
      id: 'folder2',
      label: 'Folder 2',
      children: [
        { id: 'file3', label: 'File 3' },
        {
          id: 'subfolder1',
          label: 'Subfolder 1',
          children: [
            { id: 'file4', label: 'File 4' },
          ],
        },
      ],
    },
  ],
};

const BlipTreeScaffold = (_props: any): React.ReactElement => {

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

  return <BlipTree { ...props }
                   data={ treeData }>
  </BlipTree>;

};

export default BlipTreeScaffold;
