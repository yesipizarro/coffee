import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCoffeePage } from './create-coffee.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCoffeePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCoffeePageRoutingModule {}
