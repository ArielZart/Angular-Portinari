import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PoNotificationService, PoDynamicFormField, PoDialogService } from '@portinari/portinari-ui';
import { EmpresasService } from '../empresas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  subscription: Subscription;
  idEmpresa: string;
  empresa = {};
  isHideLoading = true;
  newObj = {};

  fields: Array<PoDynamicFormField> = [
    { property: 'nome', required: true, divider: 'Informações da Empresa', maxLength: 50, gridColumns: 3, gridSmColumns: 6, errorMessage: 'Campo obrigatorio' },
    { property: "cnpj", required: true, label: "CNPJ", mask: '99.999.999/9999-99', gridColumns: 3, gridSmColumns: 6 },
    { property: "telefone", label: "Telefone", mask: '(99) 99999-9999', gridColumns: 3, gridSmColumns: 6 },
    { property: "endereco", divider: 'Endereço da empresa', label: "Endereço", gridColumns: 3, gridSmColumns: 12 },
    { property: "numeroEndereco", label: "Numero", maxValue: 10000, errorMessage: 'Invalid number.', gridColumns: 3, gridSmColumns: 12 },
    { property: "bairro", label: "Bairro", gridColumns: 3, gridSmColumns: 12 },
    { property: "cidade", label: "Cidade", gridColumns: 4, gridSmColumns: 12 },
    { property: "pais", label: "Pais", gridColumns: 5, gridSmColumns: 12 },
  ]


  constructor(
    private listarEmpresaService: EmpresasService,
    public poNotification: PoNotificationService,
    private activatedRoute: ActivatedRoute,
    private poDialog: PoDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');
    this.pegarPorId(this.idEmpresa);

  }

  pegarPorId(id) {
    this.subscription = this.listarEmpresaService.pegarPorId(id).subscribe((res: any) => {
      this.empresa = res;
    });
  }

  editarEmpresa(form) {
    this.newObj = {...form.value, ...{ alterAt: Date.now() }};    
    this.isHideLoading = false;
    this.subscription = this.listarEmpresaService.editar(this.idEmpresa, this.newObj).subscribe((res: any) => {
      setTimeout(() => {
        this.isHideLoading = true;
        this.showLoading("Empresa alterada com sucesso!!");
      }, 2000);
    })
  }

  showLoading(message: String) {
    this.poDialog.alert({ title: 'Mensagem:', message: `${message}`, ok: () => { this.voltarParaLista() } });
  }

  voltarParaLista(){
    this.router.navigate([`empresas`]);
  }
}
