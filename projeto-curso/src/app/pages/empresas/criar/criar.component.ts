import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField, PoNotificationService, PoDialogService } from '@portinari/portinari-ui';
import { EmpresasService } from '../empresas.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {
  subscription: Subscription;
  isHideLoading = true;


  fields: Array<PoDynamicFormField> = [
    { property: 'nome', required: true, divider: 'Informações da Empresa', maxLength: 50, gridColumns: 3, gridSmColumns: 6, errorMessage: 'Campo obrigatorio'},
    { property: "cnpj", required: true, label: "CNPJ", mask: '99.999.999/9999-99', gridColumns: 3, gridSmColumns: 6 },
    { property: "telefone", label: "Telefone", mask: '(99) 99999-9999', gridColumns: 3, gridSmColumns: 6 },
    { property: "endereco", divider: 'Endereço da empresa', label: "Endereço", gridColumns: 3, gridSmColumns: 12 },
    { property: "numeroEndereco", label: "Numero", maxValue: 10000, errorMessage: 'Invalid number.', gridColumns: 3, gridSmColumns: 12 },
    { property: "bairro", label: "Bairro", gridColumns: 3, gridSmColumns: 12 },
    { property: "cidade", label: "Cidade", gridColumns: 4, gridSmColumns: 12 },
    { property: "pais", label: "Pais", gridColumns: 5, gridSmColumns: 12 },
  ]

  constructor(
    public poNotification: PoNotificationService,
    private listarEmpresaService: EmpresasService,
    private poDialog: PoDialogService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  criarEmpresa(form){
    this.isHideLoading = false;
    this.subscription = this.listarEmpresaService.criar(form.value).subscribe((res: any) => {
      console.log(res);
      
      setTimeout(() => {
        this.isHideLoading = true;
        this.showLoading("Empresa criada com sucesso!!");
      }, 2000);      
    });
  }

  showLoading(message: String) {
    this.poDialog.alert({title: 'Mensagem:', message: `${message}`, ok: () => { this.voltarParaLista() }});
  }

  
  voltarParaLista(){
    this.router.navigate([`empresas`]);
  }

}
