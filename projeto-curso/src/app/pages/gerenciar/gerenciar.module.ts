import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenciarRoutingModule } from './gerenciar-routing.module';
import { ListarComponent } from './listar.component';
import { LigarComponent } from './ligar/ligar.component';
import { PoModule } from '@portinari/portinari-ui';


@NgModule({
  declarations: [ ListarComponent, LigarComponent ],
  imports: [
    CommonModule,
    GerenciarRoutingModule,
    PoModule
  ]
})
export class GerenciarModule { }
