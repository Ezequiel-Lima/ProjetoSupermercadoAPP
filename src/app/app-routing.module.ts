import { VendaComponent } from './shared/components/venda/venda.component';
import { ProdutoComponent } from './shared/components/produto/produto.component';
import { EstoqueComponent } from './shared/components/estoque/estoque.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: LoginComponent},
  { path: 'estoque', component: EstoqueComponent},
  { path: 'produto', component: ProdutoComponent},
  { path: 'venda', component: VendaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
