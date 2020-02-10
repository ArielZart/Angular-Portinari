import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  api = `${environment.apiEndPoint}`;

  constructor(
    private http: HttpClient,
  ) { }

  apagerPorId(id: string){
    return this.http.delete(`${this.api}/empresas/${id}`);
  }

  criar(empresa:any) {
    return this.http.post(`${this.api}/empresas`, empresa);
  }

  pegarPorId(id: string){
    return this.http.get(`${this.api}/empresas/${id}`);
  }

  listar() {
    return this.http.get(`${this.api}/empresas`);
  }

  editar(id: string, empresa: any){
    return this.http.put(`${this.api}/empresas/${id}`, empresa)
  }

}


