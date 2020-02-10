import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ListarComponent } from './listar.component';
import { CriarComponent } from './criar/criar.component';
import { EditarComponent } from './editar/editar.component';
import { PoModule } from '@portinari/portinari-ui';


@NgModule({
  declarations: [ListarComponent, CriarComponent, EditarComponent],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    PoModule
  ]
})
export class ProdutosModule { }
