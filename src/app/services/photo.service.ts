import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { from } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  addNewToGallery() {
    // Take a photo
    return from(Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    }));
  }
}
