import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoDialogService, PoTableColumn } from '@portinari/portinari-ui';
import { Subscription } from 'rxjs';
import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  subscription: Subscription;
  data: any[] = [];

  public readonly columns: Array<PoTableColumn> = [
    { property: "title", label: "Nome do produto", width: "25%" },
    { property: "description", label: "CNPJ", width: "25%" },
    { property: "createAt", label: "Criado", width: "25%" },
    { property: "acoes", label: "Ações", width: "25%", type: "icon", icons: [
      { action: this.editar.bind(this), icon: 'po-icon-edit', tooltip: 'Editar', value: "editar" },
      { action: this.apagar.bind(this), icon: 'po-icon-delete', tooltip: 'Remover', value: "remover" }
    ]}
  ];
  
  constructor(
    private produtoService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute,    
    private poDialog: PoDialogService
  ) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(){
    this.subscription = this.produtoService.listar().subscribe((res: any) => {
      let produtos = res.docs.map((e ,i) =>{
        let prod = { ...e, ...{ acoes: ["editar", "remover"] }};
        return prod;
      });      
      this.data = produtos;
      this.subscription.unsubscribe();
    });
  }

  editar(item) {    
    this.router.navigate([`editar`, item._id], { relativeTo: this.route });
  }

  apagar(item){
    this.subscription = this.produtoService.apagerPorId(item._id).subscribe((res: any) => {
      if(res.sucesso == true){
        this.showLoading("Registro apagado com sucesso !!!");
      }
      this.subscription.unsubscribe();
    })
  }

  showLoading(message: String) {
    this.poDialog.alert({ title: 'Mensagem:', message: `${message}`, ok: () => { this.voltarParaLista() } });
  }

  voltarParaLista(){
    this.getProdutos();
  }

}
