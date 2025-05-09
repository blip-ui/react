# blip - an MS-DOS-inspired React component library

Blip is a React component library that provides an MS-DOS-inspired theme for modern web applications. 
It offers a nostalgic, retro look while maintaining the functionality of contemporary UI components.

## Features

- MS-DOS-inspired design
- Customizable themes (basic and inverted)
- Responsive and accessible components
- Easy integration with React applications
- TypeScript support

## Installation

Install blip using npm:

    npm install @floframe/blip-lib

## Usage

1. Wrap the themed section in the BlipThemeProvider

```typescript jsx
import { BlipThemeProvider } from '@floframe/blip-lib';

export default App = () => {
  return (
    <BlipThemeProvider>
      ...
    </BlipThemeProvider>
  )
};
```

2. Import the components you need

```typescript jsx
import { BlipButton, BlipInput, BlipModal } from '@floframe/blip-lib';

function MyComponent() {
  return (
    <div>
      <BlipButton>Click me</BlipButton>
    </div>
  );
}
```

## Component API

## Component API

| Component              | Description                   | Props                                                                                                                                                                                                                                          |
|------------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BlipActionRow`        | Displays a row of actions     | • `progress`: number (0-100)<br>• `error`: boolean<br>• `status`: string                                                                                                                                                                       |
| `BlipButton`           | Customizable button           | • `size`: 'short' \| 'full' \| 'auto'<br>• `label`: string<br>• `onClick`: function<br>• `disabled`: boolean<br>• `disableBump`: boolean<br>• `className`: string<br>• `prefix`: ReactNode<br>• `suffix`: ReactNode<br>• `children`: ReactNode |
| `BlipDropdown`         | Dropdown selection            | • `size`: 'short' \| 'full' \| 'auto'<br>• `options`: Array<{id: string, label: string}><br>• `selected`: string<br>• `onChange`: function(selectedId: string)                                                                                 |
| `BlipFileDropzone`     | File upload via drag and drop | • `onDrop`: function(files: File[])                                                                                                                                                                                                            |
| `BlipInput`            | Text input field              | • `size`: 'short' \| 'full' \| 'auto'<br>• `value`: string<br>• `onChange`: function(event: ChangeEvent)                                                                                                                                       |
| `BlipLoadingIndicator` | Loading spinner               | *No specific props*                                                                                                                                                                                                                            |
| `BlipModal`            | Modal dialog                  | • `show`: boolean<br>• `onClose`: function<br>• `actions`: string[]                                                                                                                                                                            |
| `BlipTable`            | Data table                    | • `columns`: Array<{label: string, field: string}><br>• `rows`: Array<object><br>• `onRowClick`: function(row: object)                                                                                                                         |

Each component is designed to mimic MS-DOS aesthetics while providing modern React functionality. Refer to individual component documentation for detailed usage instructions.

## Building

To build the library:

    npm run build

This will generate the distribution files in the dist directory.

## Demo

You can demo each individual component and their properties by running 

    npm run dev

and navigating to http://localhost:5173


## Acknowledgments

- Inspired by the classic MS-DOS interface
- Built with React and TypeScript
- Styled with SASS