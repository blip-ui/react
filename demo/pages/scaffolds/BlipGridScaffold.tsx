import React, { useEffect, useState } from 'react';
import { BlipButton, BlipGrid, BlipGridItem } from '@lib';

const BlipGridScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);


  return (
    <BlipGrid { ...props } >
      { Array(props.rows).fill(null).map((_, rowIndex) =>
        <React.Fragment key={ [ 'row', rowIndex ].join('_') }>
          { Array(props.columns).fill(null).map((_, colIndex) =>
            <BlipGridItem row={ rowIndex + 1 }
                          column={ colIndex + 1 }
                          title={ '[' + ( rowIndex + 1 ) + ',' + ( colIndex + 1 ) + ']' }
                          key={ [ 'row', rowIndex, 'col', colIndex ].join('_') }>
              { colIndex === 0 ?
                <BlipButton width="short" label={ 'Button ' + ( colIndex + 1 ) }/> :
                (
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta dui in nunc pellentesque luctus. Aenean id vehicula mauris. Etiam in risus bibendum, ornare sem congue, pellentesque orci. Praesent in massa nec nisl
                    imperdiet auctor vitae eget lacus. Pellentesque elementum purus sit amet ultrices porttitor. Praesent sit amet iaculis nulla, non elementum ligula. Sed augue augue, fringilla ac interdum at, dictum sit amet elit. Etiam elementum
                    ultricies
                    nisl vel efficitur.</p>
                ) }
            </BlipGridItem>
          ) }
        </React.Fragment>
      ) }
    </BlipGrid>
  );
};


export default BlipGridScaffold;
