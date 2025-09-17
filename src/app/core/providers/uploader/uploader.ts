import { Injectable } from '@angular/core';
import { supabase } from 'src/app/database/supabase';

@Injectable({
  providedIn: 'root'
})
export class Uploader {

  async upload(bucket: string, name: string, type: string, d: string) {
    const { data, error } = await supabase.storage.from(bucket).upload(`/${name}` , d, {
      contentType: type,
    });
  }
  
}
