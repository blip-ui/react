import './BlipDropdown.scss';
import React from 'react';

const BlipDropdown = (props: any) => {

  return (
    <select className="BlipDropdown-container"
            onChange={ props?.onChange }
            value={ props?.selected }>
      { ( props?.options ?? [] ).map((option: any, idx: number) => (
        <option key={ [ 'option', option.id, idx ].join('_') }
                value={ option.id }
                label={ option.label }/>
      )) }
    </select>
  );
};

export default BlipDropdown;
