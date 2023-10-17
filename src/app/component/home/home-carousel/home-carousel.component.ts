import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { CommonModule, NgIf } from '@angular/common';

import { GaleriaService } from 'src/app/services/galeria/galeria.service';
import { ConfigClass } from '../../../classes/config-class';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent implements OnInit {
  urlApi = ConfigClass.getUrlApi();
  listImg: any[] = [];

  constructor(private galeriaService: GaleriaService) {}

  ngOnInit(): void {
    this.galeriaService.getAll().subscribe({
      next: (res) => {
        console.log(res.body?.dados);
        this.listImg = res.body?.dados;
      },
      error: (err) => {},
    });
  }
}
