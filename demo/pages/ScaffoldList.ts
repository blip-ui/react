import BlipTableScaffold from '../pages/scaffolds/BlipTableScaffold.tsx';
import BlipButtonScaffold from '../pages/scaffolds/BlipButtonScaffold.tsx';
import BlipInputScaffold from '../pages/scaffolds/BlipInputScaffold.tsx';
import BlipLoadingIndicatorScaffold from '../pages/scaffolds/BlipLoadingIndicatorScaffold.tsx';
import BlipDropdownScaffold from '../pages/scaffolds/BlipDropdownScaffold.tsx';
import BlipActionRowScaffold from '../pages/scaffolds/BlipActionRowScaffold.tsx';
import BlipModalScaffold from '../pages/scaffolds/BlipModalScaffold.tsx';
import BlipFileDropzoneScaffold from '../pages/scaffolds/BlipFileDropzoneScaffold.tsx';
import BlipWallpaperScaffold from './scaffolds/BlipWallpaperScaffold.tsx';
import BlipFrameScaffold from './scaffolds/BlipFrameScaffold.tsx';
import BlipGridScaffold from './scaffolds/BlipGridScaffold.tsx';
import BlipTreeScaffold from './scaffolds/BlipTreeScaffold.tsx';

export default [
  {
    component: BlipGridScaffold,
    controls: [
      { id: 'expandLastColumn', type: 'boolean', value: true },
      { id: 'columns', type: 'number', value: 2, min: 1, max: 5 },
      { id: 'rows', type: 'number', value: 2, min: 1, max: 5 },
    ],
  },
  {
    component: BlipFrameScaffold,
    controls: [
      { id: 'title', type: 'text', value: 'Test title' },
    ],
  },
  {
    component: BlipTableScaffold,
    controls: [
      { id: 'selectable', type: 'boolean', value: true },
      { id: 'paginated', type: 'boolean', value: true },
      { id: 'multiple', type: 'boolean', value: true },
    ],
  },
  {
    component: BlipTreeScaffold,
    controls: [
      { id: 'selectionMode', type: 'choice', options: [ 'single', 'multi', 'recursive' ], value: 'single' },
      { id: 'alwaysExpanded', type: 'boolean', value: true }
    ],
  },
  {
    component: BlipWallpaperScaffold,
    controls: [
      { id: 'show', type: 'boolean', options: false },
    ],
  },
  {
    component: BlipButtonScaffold,
    controls: [
      { id: 'prefixText', type: 'text', value: '+' },
      { id: 'suffixText', type: 'text', value: '-' },
      { id: 'disableBump', type: 'boolean', value: false },
      { id: 'width', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'label', type: 'text', value: 'Test Button' },
    ],
  },
  {
    component: BlipInputScaffold,
    controls: [
      { id: 'width', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'clearable', type: 'boolean', value: true },
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
      { id: 'width', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'label', type: 'text', value: 'Test dropdown label' },
      { id: 'selected', type: 'text', value: 'option1' },
      { id: 'disabled', type: 'boolean', value: false },
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
      { id: 'width', type: 'choice', options: [ 'short', 'full', 'auto' ], value: 'full' },
      { id: 'accept', type: 'choice', options: [ '.xlsx', '.csv' ], value: '.xlsx' },
      { id: 'label', type: 'text', value: 'Test upload your file' },
      { id: 'multiple', type: 'boolean', value: false },
    ],
  },
  {
    component: BlipModalScaffold,
    controls: [
      { id: 'title', type: 'text', value: 'Example Modal' },
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
