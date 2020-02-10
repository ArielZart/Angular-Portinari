import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField, PoNotificationService, PoDialogService } from '@portinari/portinari-ui';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  subscription: Subscription;
  isHideLoading = true;
  idProduto: string;
  produto: {};
  newObj = {};

  fields: Array<PoDynamicFormField> = [
    { property: 'title', required: true, label: "Nome do Produto", divider: 'Informações do produto', maxLength: 50, gridColumns: 4, gridSmColumns: 6, errorMessage: 'Campo obrigatorio'},
    { property: "description", required: true, label: "Descrição do Produto", gridColumns: 12, gridSmColumns: 12, rows: 5 },
  ]
  
  constructor(
    private produtoService: ProdutosService,
    public poNotification: PoNotificationService,
    private activatedRoute: ActivatedRoute,
    private poDialog: PoDialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idProduto = this.activatedRoute.snapshot.paramMap.get('id');
    this.pegarPorId(this.idProduto);
  }

  pegarPorId(id) {
    this.subscription = this.produtoService.pegarPorId(id).subscribe((res: any) => {
      console.log(res);
      
      this.produto = res;
    });
  }

  editarProduto(form) {
    this.newObj = {...form.value, ...{ alterAt: Date.now() }};    
    this.isHideLoading = false;
    this.subscription = this.produtoService.editar(this.idProduto, this.newObj).subscribe((res: any) => {
      setTimeout(() => {
        this.isHideLoading = true;
        this.showLoading("Produto alterado com sucesso!!");
      }, 2000);
    })
  }

  showLoading(message: String) {
    this.poDialog.alert({ title: 'Mensagem:', message: `${message}`, ok: () => { this.voltarParaLista() } });
  }

  voltarParaLista(){
    this.router.navigate([`produtos`]);
  }

}
