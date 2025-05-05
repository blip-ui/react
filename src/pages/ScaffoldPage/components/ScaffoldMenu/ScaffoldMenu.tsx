import './ScaffoldMenu.scss';
import ScaffoldList from '../../../../pages/ScaffoldPage/ScaffoldList.ts';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useApp } from '@/pages/contexts';

const ScaffoldMenu = () => {

  const { prodMode, setProdMode } = useApp();

  const scaffoldList: any[] = ScaffoldList.map((x: any) => ( { ...x, path: '/test/' + x.component.name } ));


  return (
    <div className="ScaffoldMenu-container">
      <h3>Scaffolds</h3>
      <input type="checkbox" onChange={ setProdMode } value={ prodMode }/>&nbsp;Prod Mode
      <hr/>
      { scaffoldList.map((scaffold: any, idx: number) => (
        <div key={ [ 'scaffold', idx ].join('_') }
             className={ scaffold.path.startsWith(location?.pathname) ? 'active' : '' }>
          <NavLink key={ idx } to={ scaffold.path }>
            { scaffold.component.name.replace('Scaffold', '') }
          </NavLink>
        </div>
      )) }
    </div> );
};

export default ScaffoldMenu;