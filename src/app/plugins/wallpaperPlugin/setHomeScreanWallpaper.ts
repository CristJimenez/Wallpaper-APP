import { registerPlugin } from "@capacitor/core";

export interface ISetHomeScreanWallpaper {
    execute: () => Promise<{ message: string }>;
}

const setHomeScreanWallpaper = registerPlugin<ISetHomeScreanWallpaper>("SetHomeScreanWallpaper");
export default setHomeScreanWallpaper;