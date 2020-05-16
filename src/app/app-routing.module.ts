import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexScreenComponent } from './_components/pokedex-screen/pokedex-screen.component';


const routes: Routes = [
  {path: ':name' , component: PokedexScreenComponent },
  {path: '' , component: PokedexScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
