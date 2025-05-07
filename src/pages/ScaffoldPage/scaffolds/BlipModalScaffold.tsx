import React, { useEffect, useState } from 'react';
import { BlipButton, BlipModal } from '@lib';

const BlipModalScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  const toggleModal = () => {
    setProps((prevState: any) => ( {
      ...prevState,
      show: !prevState.show,
    } ));
  };

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

  return <>
    <BlipButton label="Open Modal" onClick={ toggleModal }/>
    <BlipModal { ...props }
               onClose={ toggleModal }
               actions={ [ 'close' ] }

    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta dui in nunc pellentesque luctus. Aenean id vehicula mauris. Etiam in risus bibendum, ornare sem congue, pellentesque orci. Praesent in massa nec nisl imperdiet auctor
        vitae eget lacus. Pellentesque elementum purus sit amet ultrices porttitor. Praesent sit amet iaculis nulla, non elementum ligula. Sed augue augue, fringilla ac interdum at, dictum sit amet elit. Etiam elementum ultricies nisl vel
        efficitur.</p>
      <p>Vestibulum bibendum, dui non sagittis ullamcorper, augue lectus consectetur dui, id mollis neque magna vitae tellus. Maecenas eget odio turpis. Proin sed ipsum a enim suscipit congue. Etiam elit lectus, scelerisque a risus a, tristique
        ullamcorper quam. Donec ornare et purus eget pharetra. Suspendisse gravida efficitur ultricies. Aliquam iaculis, nunc vitae cursus imperdiet, odio nibh viverra arcu, nec placerat erat nisi eu sapien. Morbi nibh magna, rhoncus vel risus nec,
        varius pharetra magna.</p>
      <p>Nullam congue diam id nunc congue, a fringilla felis accumsan. Duis vulputate est eu fermentum ultrices. Aenean laoreet sapien sed egestas cursus. Donec mi mauris, dignissim quis erat vitae, suscipit aliquet sapien. Aliquam erat volutpat.
        Mauris imperdiet ligula leo. Curabitur orci purus, eleifend vitae arcu a, lobortis congue ipsum.</p>
      <p>Fusce id viverra tellus. Curabitur elementum placerat est, vitae semper mi ornare a. Aliquam erat volutpat. Phasellus tristique at lacus sit amet sagittis. Pellentesque tortor nisi, pretium non rutrum feugiat, malesuada id tellus. Mauris
        aliquam neque vulputate ullamcorper bibendum. Duis mauris mi, sagittis in placerat quis, pretium a purus. Aenean id dolor mattis, scelerisque sem eget, dignissim nisi. Donec non mollis metus. Maecenas in commodo arcu.</p>
      <p>Phasellus id varius tortor. Vivamus maximus, ligula id dapibus viverra, urna nisl convallis massa, mattis mattis turpis felis vitae massa. Vestibulum sed ante ut urna faucibus luctus eget eget nisi. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Praesent ac metus ante. Etiam justo dolor, auctor vitae vestibulum vulputate, congue vel velit. Etiam ultricies, erat at ultricies viverra, nisl leo lacinia tortor, sit amet euismod odio
        mauris ut est. Nunc suscipit, tortor quis mattis dapibus, mi nulla consectetur arcu, eu dapibus lectus lorem sed tellus. Pellentesque posuere purus in metus dignissim, a tristique eros auctor. Etiam ornare ante sed quam mollis, sit amet
        interdum quam fermentum. Vivamus pharetra tincidunt nunc id ultricies. Duis ipsum enim, aliquam eget euismod vitae, pretium vel est. In hendrerit sapien diam, vel auctor nunc aliquet id. Quisque vel accumsan risus. Aenean vestibulum sem nunc,
        vitae ornare risus maximus eget. Nullam ac dui id ipsum convallis sollicitudin et vitae neque.</p>
    </BlipModal>
  </>;

};


export default BlipModalScaffold;
