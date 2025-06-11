import { BlipActionRow as OriginalBlipActionRow } from './components/BlipActionRow/BlipActionRow';
import { BlipButton as OriginalBlipButton } from './components/BlipButton/BlipButton';
import { BlipDropdown as OriginalBlipDropdown } from './components/BlipDropdown/BlipDropdown';
import { BlipFileDropzone as OriginalBlipFileDropzone } from './components/BlipFileDropzone/BlipFileDropzone';
import { BlipFrame as OriginalBlipFrame } from './components/BlipFrame/BlipFrame';
import { BlipGrid as OriginalBlipGrid, BlipGridItem as OriginalBlipGridItem } from './components/BlipGrid/BlipGrid';
import { BlipInput as OriginalBlipInput } from './components/BlipInput/BlipInput';
import { BlipLoadingIndicator as OriginalBlipLoadingIndicator } from './components/BlipLoadingIndicator/BlipLoadingIndicator';
import { BlipModal as OriginalBlipModal } from './components/BlipModal/BlipModal';
import { BlipTable as OriginalBlipTable } from './components/BlipTable/BlipTable';
import { BlipWallpaper as OriginalBlipWallpaper } from './components/BlipWallpaper/BlipWallpaper';

import { withBlipTheme } from './components/BlipThemeProvider/BlipThemeProvider';

export const BlipActionRow = withBlipTheme(OriginalBlipActionRow);
export const BlipButton = withBlipTheme(OriginalBlipButton);
export const BlipDropdown = withBlipTheme(OriginalBlipDropdown);
export const BlipFileDropzone = withBlipTheme(OriginalBlipFileDropzone);
export const BlipFrame = withBlipTheme(OriginalBlipFrame);
export const BlipGrid = withBlipTheme(OriginalBlipGrid);
export const BlipGridItem = withBlipTheme(OriginalBlipGridItem);
export const BlipInput = withBlipTheme(OriginalBlipInput);
export const BlipLoadingIndicator = withBlipTheme(OriginalBlipLoadingIndicator);
export const BlipModal = withBlipTheme(OriginalBlipModal);
export const BlipTable = withBlipTheme(OriginalBlipTable);
export const BlipWallpaper = withBlipTheme(OriginalBlipWallpaper);

export { BlipThemeProvider } from './components/BlipThemeProvider/BlipThemeProvider';
