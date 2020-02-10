import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GerenciarService } from '../../gerenciar/gerenciar.service';
import { PoDialogService } from '@portinari/portinari-ui';
import { Subscription } from 'rxjs';
import { EmpresasService } from '../empresas.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  subscription: Subscription;
  idEmpresa: string;
  dataProdutos = [];
  empresa = {};
  
  columns = [
    { property: 'id', label: 'Código', align: 'left', readonly: true, width: 250},
    { property: 'title', label: 'Nome do Produto', align: 'left', readonly: true, width: '250px'},
    { property: 'desc', label: 'Descrição', align: 'left', readonly: true, width: 250 },
  ]

  fields = [
    { property: 'nome', label: "Nome da Empresa", disabled: true, gridColumns: 6 },
    { property: 'cnpj', label: "CNPJ", disabled: true, gridColumns: 6 },
  ]

  constructor(    
    private activatedRoute: ActivatedRoute,
    private listarEmpresaService: EmpresasService,
    private gerenciarService: GerenciarService,
    private poDialog: PoDialogService,
  ) { }

  ngOnInit() {
    this.idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');
    this.pegarEmpresaPorId(this.idEmpresa);
    this.pegarEPPorId(this.idEmpresa);
  }

  pegarEmpresaPorId(id) {
    this.subscription = this.listarEmpresaService.pegarPorId(id).subscribe((res: any) => {
      this.empresa = res;
    });
  }

  pegarEPPorId(id) {
    this.subscription = this.gerenciarService.pegarPorId(id).subscribe((res: any) => {
      if(res != null){
        this.dataProdutos = res.listProducts.map((e, i) => {     
          return {
            id: e.idProduto,
            title: e.title,
            desc: e.description
          }        
        })
      }      
    });
  }

}
