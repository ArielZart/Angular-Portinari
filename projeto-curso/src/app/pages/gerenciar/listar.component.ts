import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PoTableColumn } from '@portinari/portinari-ui';
import { EmpresasService } from '../empresas/empresas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  subscription: Subscription;
  data: any[] = [];

  public readonly columns: Array<PoTableColumn> = [
    { property: "nome", label: "Nome da Empresa"},
    { property: "cnpj", label: "CNPJ"},
    { property: "produtos", label: "Produtos", type: "link" },
  ];

  constructor(
    private listarEmpresaService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,   
  ) { }

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas() {
    this.subscription = this.listarEmpresaService.listar().subscribe((res: any) => {
      let empresas = res.docs.map((e ,i) =>{
        let objLinkProdutos = {
          produtos: "Adicionar produtos",
          link: "ligar/" + e._id,
          nome: e.nome,
          cnpj: e.cnpj
        }
        return objLinkProdutos;
      });      
      console.log(empresas);
      
      this.data = empresas;
      this.subscription.unsubscribe();
    });
  }


  ligarProdutos(id) {    
    this.router.navigate([`ligar`, id], { relativeTo: this.route });
  }


}
