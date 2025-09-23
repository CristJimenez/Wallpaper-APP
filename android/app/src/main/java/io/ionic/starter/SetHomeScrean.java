package io.ionic.starter;

import android.app.WallpaperManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Base64;

import androidx.annotation.RequiresApi;

import com.capacitorjs.plugins.toast.Toast;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;

import java.io.IOException;

@CapacitorPlugin(name  = "SetHomeScreanWallpaper")

public class SetHomeScrean extends Plugin {

  public static final String CAPACITOR_SHARED_PREFERENCES_NAME = "CapacitorStorage";

  @RequiresApi(api = Build.VERSION_CODES.N)
  @PluginMethod()
  public void execute(PluginCall call) throws JSONException {

    SharedPreferences sharedPreferences = getContext().getSharedPreferences(CAPACITOR_SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE);
    String image = sharedPreferences.getString("wallpaper", "none");
    if (image.equals("none")) {
      call.reject("No wallpaper set");
      return;
    }

    try {
      byte[] decodedBytes = Base64.decode(image, Base64.DEFAULT);
      Bitmap bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
      WallpaperManager wallpaperManager = WallpaperManager.getInstance(getContext());
      wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM);
      Toast.show(getContext(), "Setting wallpaper");
    } catch (IOException e) {
      Toast.show(getContext(), "Error setting wallpaper");
    }
  }
}
