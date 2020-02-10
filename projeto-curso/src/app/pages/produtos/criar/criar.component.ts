import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField, PoNotificationService, PoDialogService } from '@portinari/portinari-ui';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {
  subscription: Subscription;
  isHideLoading = true;


  fields: Array<PoDynamicFormField> = [
    { property: 'title', required: true, label: "Nome do Produto", divider: 'Informações do produto', maxLength: 50, gridColumns: 4, gridSmColumns: 6, errorMessage: 'Campo obrigatorio'},
    { property: "description", required: true, label: "Descrição do Produto", mask: '99.999.999/9999-99', gridColumns: 12, gridSmColumns: 12, rows: 5 },
  ]
  
  constructor(
    private produtoService: ProdutosService,
    public poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  criarProduto(form){
    this.isHideLoading = false;
    this.subscription = this.produtoService.criar(form.value).subscribe((res: any) => {
      setTimeout(() => {
        this.isHideLoading = true;
        this.showLoading("Produto criada com sucesso!!");
      }, 2000);      
    });
  }


  showLoading(message: String) {
    this.poDialog.alert({title: 'Mensagem:', message: `${message}`, ok: () => { this.voltarParaLista() }});
  }

  
  voltarParaLista(){
    this.router.navigate([`produtos`]);
  }
}
