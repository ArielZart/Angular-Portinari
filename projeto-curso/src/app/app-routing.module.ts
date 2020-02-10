import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "empresas", loadChildren: "./pages/empresas/empresas.module#EmpresasModule" },
  { path: "produtos", loadChildren: "./pages/produtos/produtos.module#ProdutosModule" },
  { path: "gerenciar", loadChildren: "./pages/gerenciar/gerenciar.module#GerenciarModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
