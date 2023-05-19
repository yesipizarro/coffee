import { Pipe, PipeTransform } from '@angular/core';
import { coffeeMilkPreparations, coffeePreparations } from '../interfaces/coffee.interface';

@Pipe({
  name: 'preparationAndMilk'
})
export class PreparationAndMilkPipe implements PipeTransform {

  translations = {
    [coffeePreparations[0]]: 'Espresso o Ristretto',
    [coffeePreparations[1]]: 'Lungo',
    [coffeePreparations[2]]: 'Lungo Black',
    [coffeeMilkPreparations[0]]: 'Corto Capuccino',
    [coffeeMilkPreparations[1]]: 'Capuccino',
    [coffeeMilkPreparations[2]]: 'Lungo Black',
  }

  transform(value: string): unknown {
    return this.translations[value];
  }

}
