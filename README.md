# blip - an MS-DOS-inspired theme

Blip is a React component library that provides an MS-DOS-inspired theme for modern web applications. It offers a nostalgic, retro look while maintaining the functionality of contemporary UI components.

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
import { BlipButton, BlipInput, BlipModal } from '@floframe/blip-lib';

function App() {
  return (
    <div>
      <BlipButton>Click me</BlipButton>
      <BlipInput placeholder="Enter text"/>
      <BlipModal>
        <h2>Modal Content</h2>
        <p>This is an MS-DOS style modal!</p>
      </BlipModal>
    </div>
  );
}
```

## Available Components

- BlipActionRow
- BlipButton
- BlipDropdown
- BlipFileDropzone
- BlipInput
- BlipLoadingIndicator
- BlipModal
- BlipTable

## Theming

Blip comes with two built-in themes: 'basic' and 'inverted'. You can switch between themes using the BlipThemeProvider component:

    import { BlipThemeProvider, BlipButton } from 'blip-theme';

    function App() {
      return (
        <BlipThemeProvider theme="inverted">
          <BlipButton>Inverted Theme Button</BlipButton>
        </BlipThemeProvider>
      );
    }

## Development

To set up the development environment:

1. Clone the repository
2. Install dependencies: npm install
3. Start the development server: npm run dev

## Building

To build the library:

    npm run build

This will generate the distribution files in the dist directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the classic MS-DOS interface
- Built with React and TypeScript
- Styled with SASS