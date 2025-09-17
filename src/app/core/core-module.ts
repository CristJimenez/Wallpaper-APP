import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { Auth } from './providers/auth/auth';
import { Query } from './providers/query/query';
import { File } from './providers/file/file';
import { NativeToast } from './providers/nativeToast/native-toast';
import { Capacitor } from '@capacitor/core';
import { Uploader } from './providers/uploader/uploader';

const providers = [ Auth, Query, File, NativeToast, Uploader ];

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ...providers
  ]
})
export class CoreModule implements OnInit{
  
  constructor(private readonly fileSrv: File) {
    if (Capacitor.isNativePlatform()) {
      this.ngOnInit()
    }
  }

  async ngOnInit() {
    this.fileSrv.requestPermissions();
  }

}
