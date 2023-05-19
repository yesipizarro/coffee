import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref , UploadResult, uploadString, deleteObject } from "firebase/storage";
import { getDatabase, set, ref as refDb, push, child, remove, onChildAdded, onChildRemoved } from "firebase/database";
import { catchError, from, switchMap } from 'rxjs';
import { ICoffee } from '../interfaces/coffee.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyC_PKyhLsDH-P0FKTFxv05VoKuZdi8Zbyg",
    authDomain: "coffee-f34ba.firebaseapp.com",
    projectId: "coffee-f34ba",
    storageBucket: "coffee-f34ba.appspot.com",
    messagingSenderId: "940955277245",
    appId: "1:940955277245:web:6ed2def6f6827df84824d4"
  };
  
  app = initializeApp(this.firebaseConfig);
  storage = getStorage();
  database = getDatabase();

  coffees = new BehaviorSubject<ICoffee[]>([]);
  coffeesRef = refDb(this.database, 'coffees');


  constructor() {
    this.onChangeCoffees();
   }

  uploadImage(fileBase64: string, name: string) {
      const refFile = ref(this.storage, `${name.split(' ').join('_')}`);
      return from(uploadString(refFile, fileBase64, 'base64'))
        .pipe(
          switchMap((snapshot: UploadResult) => getDownloadURL(snapshot.ref)),
          catchError(error => {
            return error;
          })
        );
  }

  create(coffee :ICoffee) {
    const coffeesRef = push(this.coffeesRef);
    return from(set(coffeesRef, coffee));
  }

  onChangeCoffees() {
    onChildAdded(this.coffeesRef, (newCoffee) => {
      const currentCoffees = this.coffees.getValue();
      currentCoffees.push({
        key: newCoffee.key!,
        ...newCoffee.val()
      });
      this.coffees.next(currentCoffees);
    });
    onChildRemoved(this.coffeesRef, (coffeeRemoved) => {
      let currentCoffees = this.coffees.getValue();
      currentCoffees = currentCoffees.filter(coffee => coffee.key !== coffeeRemoved.key);
      this.coffees.next(currentCoffees);
    });
  }

  remove(coffee: ICoffee) {
    const imageCoffeeRef = ref(this.storage, `${coffee.name.split(' ').join('_')}`);
    deleteObject(imageCoffeeRef).then(() => console.log('imagen eliminada'));
    const childCoffee = child(this.coffeesRef, coffee.key);
    return from(remove(childCoffee));
  }
}
