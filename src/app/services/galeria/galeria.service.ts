import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RespostaApi } from '../../classes/resposta-api';
import { ConfigClass } from '../../classes/config-class';

const headersOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const urlApi = `${ConfigClass.getUrlApi().toString()}/galeria`;

@Injectable({
  providedIn: 'root',
})
export class GaleriaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<HttpResponse<RespostaApi>> {
    return this.http.get<RespostaApi>(urlApi, { observe: 'response' });
  }

  getById(id: string): Observable<HttpResponse<RespostaApi>> {
    return this.http.get<RespostaApi>(`${urlApi}/${id}`, {
      observe: 'response',
    });
  }

  create(data: any): Observable<HttpResponse<RespostaApi>> {
    return this.http.post<RespostaApi>(urlApi, data, { observe: 'response' });
  }

  update(data: any): Observable<HttpResponse<RespostaApi>> {
    return this.http.put<RespostaApi>(urlApi, data, { observe: 'response' });
  }

  delete(id: any): Observable<HttpResponse<RespostaApi>> {
    return this.http.delete<RespostaApi>(`${urlApi}/${id}`, {
      observe: 'response',
    });
  }
}
