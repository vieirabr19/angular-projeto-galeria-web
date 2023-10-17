import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeCarouselComponent } from './component/home/home-carousel/home-carousel.component';
import { ManterGaleriaComponent } from './component/galeria/manter-galeria/manter-galeria.component';

const routes: Routes = [
  { path: 'home/home-carousel', component: HomeCarouselComponent },
  { path: 'galeria/manter-galeria', component: ManterGaleriaComponent },
  { path: 'galeria/manter-galeria/:id', component: ManterGaleriaComponent },
  { path: '', component: HomeCarouselComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
