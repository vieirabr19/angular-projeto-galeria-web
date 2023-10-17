import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { GaleriaService } from 'src/app/services/galeria/galeria.service';

@Component({
  selector: 'app-manter-galeria',
  templateUrl: './manter-galeria.component.html',
  styleUrls: ['./manter-galeria.component.scss'],
})
export class ManterGaleriaComponent implements OnInit {
  urlApi = 'http://localhost:3000';
  formGalery!: FormGroup;
  showListForm = true;
  arrList: any;
  message: string = '';
  imageUrl: any;
  showBtnEdit = false;

  constructor(
    private galeriaService: GaleriaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAll();
    this.initForm();
  }

  initForm() {
    this.formGalery = this.fb.group({
      id_galeria: [null],
      titulo: [''],
      dados_imagem: null,
    });
  }

  newRegister() {
    this.clearMessage();
    this.showListForm = false;
    this.formGalery.reset();
    this.imageUrl = null;
    this.showBtnEdit = false;
  }

  backList() {
    this.clearMessage();
    this.showListForm = true;
  }

  getAll() {
    this.galeriaService.getAll().subscribe((res) => {
      if (!this.handleError(res)) {
        this.arrList = res.body?.dados;
      }
    });
  }

  showAlerts(msg: string, type: any) {
    let dados = '';
    if (type == 'sucesso') {
      dados = `<div class="alert alert-success"><strong>${msg}</strong></div>`;
    } else if (type == 'erro') {
      dados = `<div class="alert alert-danger"><strong>${msg}</strong></div>`;
    }

    this.message = dados;
  }

  clearMessage() {
    this.message = '';
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      const arquivo = event.target.files[0];

      const leitor = new FileReader();
      leitor.readAsDataURL(arquivo);
      leitor.onload = () => {
        this.imageUrl = leitor.result;
        this.formGalery.get('dados_imagem')?.setValue({
          nome_arquivo: arquivo.name,
          tipo_rquivo: arquivo.type,
          imagem_base64: this.imageUrl.toString().split(',')[1],
        });
      };
    }
  }

  onSubmit() {
    !this.showBtnEdit ? this.create() : this.update();
  }

  create() {
    const data = this.formGalery.value;
    this.galeriaService.create(data).subscribe((res) => {
      if (!this.handleError(res)) {
        this.clearForm();
        this.getAll();
        this.showListForm = true;
      }
    });
  }

  update() {
    const data = this.formGalery.value;
    this.galeriaService.update(data).subscribe((res) => {
      if (!this.handleError(res)) {
        this.clearForm();
        this.getAll();
        this.showListForm = true;
      }
    });
  }

  clearForm() {
    this.imageUrl = null;
    this.formGalery.reset();
    const formHTML = <HTMLFormElement>document.getElementById('formulario');
    // formHTML.reset();
  }

  edit(id: string) {
    this.showListForm = false;
    this.showBtnEdit = true;

    this.galeriaService.getById(id).subscribe((res) => {
      if (!this.handleError(res)) {
        const data = res.body?.dados[0];
        (this.imageUrl = `${this.urlApi}/${data.caminho}`),
          this.formGalery.patchValue({
            id_galeria: [data.id_galeria],
            titulo: [data.titulo],
          });
      }
    });
  }

  delete(id: string) {
    this.galeriaService.delete(id).subscribe((res) => {
      if (!this.handleError(res)) {
        this.getAll();
      }
    });
  }

  handleError(resp: any) {
    if (resp.status >= 400) {
      this.showAlerts('Erro ao realizar a requisão!', 'erro');
      return true;
    } else {
      if (resp.body.erro) {
        this.showAlerts(resp.body.msg, 'erro');
        return true;
      } else {
        if (resp.body.msg !== null) {
          this.showAlerts(resp.body.msg, 'sucesso');
          return false;
        }
      }
    }
    return false;
  }
}
