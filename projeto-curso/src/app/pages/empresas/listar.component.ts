import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpresasService } from "./empresas.service"
import { PoTableAction, PoTableColumn, PoDialogService } from '@portinari/portinari-ui';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  subscription: Subscription;
  data: any[] = [];
  detail: any;

  public readonly columns: Array<PoTableColumn> = [
    { property: "nome", label: "Nome da Empresa", width: "20%" },
    { property: "cnpj", label: "CNPJ", width: "20%" },
    { property: "createAt", label: "Criado", width: "20%" },
    { property: "produtos", label: "Produtos", width: "20%", type: "link" },
    { property: "acoes", label: "Ações", width: "20%", type: "icon", icons: [
      { action: this.editar.bind(this), icon: 'po-icon-edit', tooltip: 'Editar', value: "editar" },
      { action: this.apagar.bind(this), icon: 'po-icon-delete', tooltip: 'Remover', value: "remover" }
    ]}
  ];


  constructor(
    private listarEmpresaService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,    
    private poDialog: PoDialogService
  ) { }

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas() {
    this.subscription = this.listarEmpresaService.listar().subscribe((res: any) => {
      let empresas = res.docs.map((e ,i) =>{
        let objLinkProdutos = {
          produtos: "Ver produtos",
          link: "/empresas/" + e._id + "/produtos"
        }
        let empresa = { ...e, ...{ acoes: ["editar", "remover"] }, ...objLinkProdutos};
        return empresa;
      });      
      this.data = empresas;
      this.subscription.unsubscribe();
    });
  }

  editar(item) {    
    this.router.navigate([`editar`, item._id], { relativeTo: this.route });
  }

  apagar(item){
    this.subscription = this.listarEmpresaService.apagerPorId(item._id).subscribe((res: any) => {      
      if(res.sucesso == true){
        this.showLoading("Registro apagado com sucesso !!!");
      }
      this.subscription.unsubscribe();
    })
  }

  showLoading(message: String) {
    this.poDialog.alert({ title: 'Portinari Button', message: `${message}`, ok: () => { this.atualizarLista() } });
  }

  atualizarLista(){
    this.getEmpresas();
  }


}