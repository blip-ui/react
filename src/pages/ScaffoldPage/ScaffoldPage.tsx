import React, { useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScaffoldList from './ScaffoldList';
import './ScaffoldPage.scss';
import ResizeWrapper from './components/ResizeWrapper/ResizeWrapper.tsx';
import Controls from '../../pages/ScaffoldPage/components/Controls/Controls.tsx';
import ScaffoldMenu from '../../pages/ScaffoldPage/components/ScaffoldMenu/ScaffoldMenu.tsx';
import EventLog from '../../pages/ScaffoldPage/components/EventLog/EventLog.tsx';
import clsx from 'clsx';
import { useApp } from '../contexts';

const ScaffoldPage = () => {

  const location = useLocation();

  const { addEvent, clearEvents } = useApp();
  const [ , setDimensions ] = useState<any>({ width: '100%', height: '100%' });
  const [ controls, setControls ] = useState<any[]>([]);
  const [ logs ] = useState<any[]>([]);
  const [ defaultProps, setDefaultProps ] = useState<any | null>(null);

  const containerRef: React.RefObject<any> = useRef<any>(null);

  /**
   * Creates a simple nested object from a provided key index in dot notation.
   * @param ids object key path in dot notation.
   * @param value the value to assign this property.
   */
  const dotNotationToObj = (ids: string, value: any) => {
    const tempObj: any = {};
    let container: any = tempObj;
    ids.split('.').map((k, i, values) => {
      container = ( container[ k ] = ( i == values.length - 1 ? value : {} ) );
    });
    return tempObj;
  };

  function isObject(item: unknown) {
    return ( item && typeof item === 'object' && !Array.isArray(item) );
  }

  function mergeDeep(target: any, ...sources: any[]) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[ key ])) {
          if (!target[ key ]) {
            Object.assign(target, { [ key ]: {} });
          }
          mergeDeep(target[ key ], source[ key ]);
        } else {
          Object.assign(target, { [ key ]: source[ key ] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  }

  const handleFieldChange = (e: { id: string, value: any }): void => {
    // Create object from dot notations
    const obj: any = dotNotationToObj(e.id, e.value);
    const _defaultProps: any = { ...defaultProps };

    const idx: number = controls.findIndex(x => x.id === e.id);
    if (idx > -1) {
      const updatedControls: any[] = [ ...controls ];
      updatedControls[ idx ] = { ...updatedControls[ idx ], value: e.value };
      setControls(() => updatedControls);
    }

    mergeDeep(_defaultProps, obj);
    setDefaultProps(_defaultProps);
  };

  const handleResize = () => {
    setDimensions(() => {
      return {
        width: containerRef?.current.clientWidth,
        height: containerRef?.current.clientHeight,
      };
    });
  };

  const handleLog = (source: string) => (e: CustomEvent) => {
    addEvent(source, e);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    handleResize();
  }, [ containerRef?.current ]);

  React.useEffect(() => {
    if (location?.pathname) {
      clearEvents();
      const scaffold: any = ScaffoldList.find(x => location.pathname.startsWith('/test/' + x?.component?.name));
      if (scaffold) {

        const _defaultProps: any = scaffold?.controls.reduce((acc: any, val: any) => mergeDeep(acc, dotNotationToObj(val.id, val.value)), {});
        setControls([ ...scaffold?.controls ?? [] ]);
        setDefaultProps({ ..._defaultProps });
      }
    }
  }, [ location?.pathname ]);


  return (
    <div className="ScaffoldPage-container">

      <div className={ clsx('left-panel', 'Outside-Theme') }>
        <ScaffoldMenu/>
      </div>

      <div className="right-panel">
        <div className="frame-panel" ref={ containerRef }>
          <ResizeWrapper>
            <Routes>
              { ScaffoldList.map((scaffold: any, idx: number) => (
                <Route path={ scaffold.component.name + '/*' }
                       key={ 'route' + idx }
                       element={ <scaffold.component
                         defaultProps={ defaultProps }
                         onLogEvent={ handleLog(scaffold.component.name) }
                       /> }/>
              )) }
            </Routes>
          </ResizeWrapper>
        </div>

        <div className={ clsx('bottom-panel', 'Outside-Theme') }>
          <div className="controls-panel">
            <Controls controls={ controls }
                      defaultProps={ defaultProps }
                      onControlChange={ handleFieldChange }
            />
          </div>
          <div className="events-panel">
            <EventLog logs={ logs }/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScaffoldPage;
