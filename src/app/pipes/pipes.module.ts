import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreparationAndMilkPipe } from "./preparation-and-milk.pipe";

@NgModule({
    imports: [CommonModule],
    declarations: [PreparationAndMilkPipe],
    exports: [PreparationAndMilkPipe]
})
export class PipesModule {}
  