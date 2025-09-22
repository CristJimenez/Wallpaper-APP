import { Injectable } from '@angular/core';
import { supabase } from 'src/app/database/supabase';

@Injectable({
  providedIn: 'root'
})
export class Uploader {

  async upload(bucket: string, uid: string, name: string, type: string, d: string) {
    const { data, error } = await supabase.storage.from(bucket).upload(
      `/images/${uid}/${name}`,
      Uint8Array.from(atob(d), (c) => c.charCodeAt(0)),
      {
      contentType: type,
      upsert: true,
      cacheControl: '3600',
    });
    return data?.path || '';
  }

  async getUrl(bucket: string, path: string): Promise<string> {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
    return data?.signedUrl || '';
  }

  async listUserImages(bucket: string, userId: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(`images/${userId}`);
  
    if (error) {
      console.log(error.message);
      return [];
    }
  
    return data || [];
  }
  
  async getUserImageUrls(bucket: string, userId: string) {
    const files = await this.listUserImages(bucket, userId);
    const urls = [];
  
    for (const file of files) {
      const { data } = await supabase.storage
        .from(bucket)
        .createSignedUrl(`images/${userId}/${file.name}`, 3600);
  
      if (data?.signedUrl) {
        urls.push(data.signedUrl);
      }
    }
  
    return urls;
  }
  
  
}
