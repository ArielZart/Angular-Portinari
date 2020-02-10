import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  api = `${environment.apiEndPoint}`;

  constructor(
    private http: HttpClient,
  ) { }

  apagerPorId(id: string){
    return this.http.delete(`${this.api}/produtos/${id}`);
  }

  criar(empresa:any) {
    return this.http.post(`${this.api}/produtos`, empresa);
  }

  pegarPorId(id: string){
    return this.http.get(`${this.api}/produtos/${id}`);
  }

  listar() {
    return this.http.get(`${this.api}/produtos`);
  }

  editar(id: string, empresa: any){
    return this.http.put(`${this.api}/produtos/${id}`, empresa)
  }



}
