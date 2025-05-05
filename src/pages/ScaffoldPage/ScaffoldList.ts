import BlipTableScaffold from '../../pages/ScaffoldPage/scaffolds/BlipTableScaffold.tsx';
import BlipButtonScaffold from '../../pages/ScaffoldPage/scaffolds/BlipButtonScaffold.tsx';
import BlipInputScaffold from '../../pages/ScaffoldPage/scaffolds/BlipInputScaffold.tsx';
import BlipLoadingIndicatorScaffold from '../../pages/ScaffoldPage/scaffolds/BlipLoadingIndicatorScaffold.tsx';
import BlipDropdownScaffold from '../../pages/ScaffoldPage/scaffolds/BlipDropdownScaffold.tsx';
import BlipActionRowScaffold from '../../pages/ScaffoldPage/scaffolds/BlipActionRowScaffold.tsx';
import BlipModalScaffold from '../../pages/ScaffoldPage/scaffolds/BlipModalScaffold.tsx';
import BlipFileDropzoneScaffold from '../../pages/ScaffoldPage/scaffolds/BlipFileDropzoneScaffold.tsx';

export default [
  {
    component: BlipTableScaffold,
    controls: [
      { id: 'selectable', type: 'boolean', value: true },
    ],
  },
  {
    component: BlipButtonScaffold,
    controls: [
      { id: 'size', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'label', type: 'text', value: 'Test Button' },
    ],
  },
  {
    component: BlipInputScaffold,
    controls: [
      { id: 'size', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'value', type: 'text', value: 'Type something...' },
    ],
  },
  {
    component: BlipLoadingIndicatorScaffold,
    controls: [],
  },
  {
    component: BlipDropdownScaffold,
    controls: [
      { id: 'size', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'selected', type: 'text', value: 'option1' },
      {
        id: 'options', type: 'array', value: [
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' },
          { id: 'option4', label: 'Option 4' }
        ]
      }
    ],
  },
  {
    component: BlipFileDropzoneScaffold,
    controls: [
    ],
  },
  {
    component: BlipModalScaffold,
    controls: [
    ],
  },
  {
    component: BlipActionRowScaffold,
    controls: [
      { id: 'progress', type: 'number', max: 100, min: 0, value: 100 },
      { id: 'error', type: 'boolean', value: false },
      { id: 'status', type: 'text', value: 'Example status' },
    ],
  },

];
