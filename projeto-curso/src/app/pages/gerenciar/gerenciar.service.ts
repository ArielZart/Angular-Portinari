import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GerenciarService {
  api = `${environment.apiEndPoint}`;

  constructor(
    private http: HttpClient,
  ) { }

  apagarPorId(id: string){
    return this.http.delete(`${this.api}/empresas/${id}/produtos`);
  }

  criar(id : string , ep:any) {
    return this.http.post(`${this.api}/empresas/${id}/produtos`, ep);
  }

  pegarPorId(id: string){
    return this.http.get(`${this.api}/empresas/${id}/produtos`);
  }
}
