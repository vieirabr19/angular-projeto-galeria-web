import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCarouselComponent } from './component/home/home-carousel/home-carousel.component';
import { ManterGaleriaComponent } from './component/galeria/manter-galeria/manter-galeria.component';

@NgModule({
  declarations: [AppComponent, HomeCarouselComponent, ManterGaleriaComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgIf,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
