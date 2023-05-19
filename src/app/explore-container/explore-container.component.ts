import { Component, OnInit } from '@angular/core';
import { ICoffee } from '../interfaces/coffee.interface';
import { FirebaseService } from '../services/firebase.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  constructor(private firebaseService: FirebaseService) {}

  get coffees() {
    return this.firebaseService.coffees;
  }

  onDelete(coffee: ICoffee){
    this.firebaseService.remove(coffee).subscribe();
  }
}
