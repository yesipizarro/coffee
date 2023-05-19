export interface ICoffee {
  key: string;
  name: string;
  intensity: number;
  preparations: string[];
  leche?: string[];
  urlPicture?: string;
}

export const coffeePreparations = [
  'espressoRistretto',
  'lungo',
  'lungoBlack'
];

export const coffeeMilkPreparations = [
  'cortoCapuccino',
  'capuccino',
  'latteMacchiato'
]