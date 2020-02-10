import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from '../../empresas/empresas.service';
import { Subscription } from 'rxjs';
import { GerenciarService } from '../gerenciar.service';
import { ProdutosService } from '../../produtos/produtos.service';
import { PoDialogService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-ligar',
  templateUrl: './ligar.component.html',
  styleUrls: ['./ligar.component.css']
})
export class LigarComponent implements OnInit {
  subscription: Subscription;
  private idEmpresa: string;
  private empresa = {};
  private isHideLoading = true;
  dataProdutos = [];


  fields = [
    { property: 'nome', label: "Nome da Empresa", disabled: true, gridColumns: 6 },
    { property: 'cnpj', label: "CNPJ", disabled: true, gridColumns: 6 },
  ]

  columns = [
    { property: 'id', label: 'Código', align: 'left', readonly: true, width: 250},
    { property: 'title', label: 'Nome do Produto', align: 'left', readonly: true, width: '250px'},
    { property: 'desc', label: 'Descrição', align: 'left', readonly: true, width: 250 },
  ]

  optionsProdutos = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private listarEmpresaService: EmpresasService,
    private gerenciarService: GerenciarService,
    private produtosService: ProdutosService,
    private poDialog: PoDialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');
    this.pegarEmpresaPorId(this.idEmpresa);
    this.listarProdutos();
    this.pegarEPPorId(this.idEmpresa);
  }

  pegarEmpresaPorId(id) {
    this.subscription = this.listarEmpresaService.pegarPorId(id).subscribe((res: any) => {
      this.empresa = res;
    });
  }

  listarProdutos() {
    this.subscription = this.produtosService.listar().subscribe((res: any) => {
      this.optionsProdutos = res.docs.map((e, i) => {
        return {
          label: e.title,
          value: e._id
        }
      });
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

  adicionarProduto(produtoId) {
    if (produtoId != null) {
      this.isHideLoading = false;      
      this.subscription = this.produtosService.pegarPorId(produtoId).subscribe((res:any) => {
        let obj = {
          listProducts: [{
            idProduto: res._id,
            title: res.title,
            description: res.description
          }]
        }
        this.gerenciarService.criar(this.idEmpresa, obj).subscribe((res: any) => {
          setTimeout(() => {
            this.isHideLoading = true;
            this.showLoading("Produto adicionado com sucesso!!");
          }, 2000);  
        });
      })

      
    }
  }

  showLoading(message: String) {
    this.poDialog.alert({ title: 'Mensagem:', message: `${message}`, ok: () => { this.atualizarLista() } });
  }

  atualizarLista() {
    this.pegarEPPorId(this.idEmpresa);
  }

  voltarListaEmpresas(){
    this.router.navigate([`gerenciar`]);
  }
}
