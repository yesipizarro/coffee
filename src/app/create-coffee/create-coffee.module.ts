import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCoffeePage } from './create-coffee.page';
import { CreateCoffeePageRoutingModule } from './create-coffee-routing.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateCoffeePageRoutingModule,
    PipesModule
  ],
  declarations: [CreateCoffeePage]
})
export class CreateCoffeePageModule {}
