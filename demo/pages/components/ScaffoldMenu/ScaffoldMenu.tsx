import './ScaffoldMenu.scss';
import ScaffoldList from '../../../pages/ScaffoldList.ts';
import { NavLink } from 'react-router-dom';
import React from 'react';

const themes = [ 'basic', 'inverted' ];

const ScaffoldMenu = () => {

  const scaffoldList: any[] = ScaffoldList.map((x: any) => ( { ...x, path: '/test/' + x.component.name } ));

  const handleThemeChange = (e: any) => {
    const theme = e.target.value;
    document.body.setAttribute('data-blip-theme', theme);
    window.localStorage.setItem('blip-theme', theme);
  };

  return (
    <div className="ScaffoldMenu-container">
      <h3>Scaffolds</h3>
      <select className="ScaffoldMenu-select" onChange={ handleThemeChange }>
        { themes.map((theme: any, idx: number) => (
          <option key={ [ 'theme', idx ].join('_') } value={ theme }> { theme } </option>
        )) }
      </select>
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