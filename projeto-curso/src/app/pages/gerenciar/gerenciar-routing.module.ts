import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './listar.component';
import { LigarComponent } from './ligar/ligar.component';


const routes: Routes = [
  { path: "", component: ListarComponent},
  { path: "ligar/:id", component: LigarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarRoutingModule { }
