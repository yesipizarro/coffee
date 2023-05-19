import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { coffeeMilkPreparations, coffeePreparations, ICoffee } from '../interfaces/coffee.interface';
import { FirebaseService } from '../services/firebase.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-create-coffee',
  templateUrl: 'create-coffee.page.html',
  styleUrls: ['create-coffee.page.scss']
})
export class CreateCoffeePage {

  coffeeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    intensity: new FormControl(0),
    preparations: new FormControl('', Validators.required),
    leche: new FormControl('')
  });
  photo: string = '';

  preparations = coffeePreparations;
  milkTypes = coffeeMilkPreparations;
  

  constructor(
    private photoService: PhotoService,
    private firebaseService: FirebaseService,
    private toastController: ToastController) {}

  openCamera() {
    this.photoService.addNewToGallery().subscribe((photo) => {
      this.photo = photo.base64String!;
    });
  }

  save() {
    this.firebaseService.uploadImage(this.photo, this.coffeeForm.get('name')!.value)
    .subscribe({
      next: url => {
      const coffee: ICoffee = {
        ...this.coffeeForm.value,
        preparations: this.coffeeForm.get('preparations')?.value,
        urlPicture: url
      }
      this.firebaseService.create(coffee).subscribe(_ => this.presentToast('bottom'));
    },
    error: (error) => console.log('ERROR======================>',error)
  })
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Café Creado...',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
