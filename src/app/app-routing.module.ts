import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar.module').then(m => m.ListarPageModule)
  },
  {
    path: 'detalle-pagina/:id',
    loadChildren: () => import('./detalle-pagina/detalle-pagina.module').then(m => m.DetallePaginaPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then(m => m.LoadingPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
