import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import setHomeScreanWallpaper from 'src/app/plugins/wallpaperPlugin/setHomeScreanWallpaper';
import setLockScreanWallpaper from 'src/app/plugins/wallpaperPlugin/setLockScreanWallpaper';

@Injectable({
  providedIn: 'root'
})
export class Wallpaper {
  
  async setHomeScreen(image: string) {
    const imgBase64 = await this.urlToBase64(image);
    await Preferences.set({
      key: "wallpaper",
      value: imgBase64,
    });
    await setHomeScreanWallpaper.execute();
  }

  async setLockScreen(image: string) {
    const imgBase64 = await this.urlToBase64(image);
    await Preferences.set({
      key: "wallpaper",
      value: imgBase64,
    });
    await setLockScreanWallpaper.execute();
  }

  async urlToBase64(url: string): Promise<string> {
    const resp = await fetch(url);
    const blob = await resp.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

}
