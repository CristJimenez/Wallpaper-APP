import { registerPlugin } from "@capacitor/core";

export interface ISetLockScreanWallpaper {
    execute: () => Promise<{ message: string }>;
}

const setLockScreanWallpaper = registerPlugin<ISetLockScreanWallpaper>("SetLockScreanWallpaper");
export default setLockScreanWallpaper;