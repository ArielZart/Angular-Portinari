import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from './listar.component';
import { CriarComponent } from './criar/criar.component';
import { EditarComponent } from './editar/editar.component';


const routes: Routes = [
  { path: "", component: ListarComponent },
  { path: "criar", component: CriarComponent },
  { path: "editar/:id", component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
