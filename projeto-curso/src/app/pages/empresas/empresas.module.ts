import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { CriarComponent } from './criar/criar.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar.component';
import { PoModule } from '@portinari/portinari-ui';
import { ProdutosComponent } from './produtos/produtos.component';


@NgModule({
  declarations: [ListarComponent,CriarComponent, EditarComponent, ProdutosComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    PoModule
  ]
})
export class EmpresasModule { }
