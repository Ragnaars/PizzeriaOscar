import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'listar',
        loadChildren: () => import('.././listar/listar.module').then(m => m.ListarPageModule)
      },
      {
        path: 'detalle-pagina/:id',
        loadChildren: () => import('.././detalle-pagina/detalle-pagina.module').then(m => m.DetallePaginaPageModule)
      },
      {
        path: 'carrito',
        loadChildren: () => import('.././carrito/carrito.module').then(m => m.CarritoPageModule)
      },
      {
        path: 'listar2',
        loadChildren: () => import('.././listar2/listar2.module').then(m => m.Listar2PageModule)
      },
      {
        path: 'detalle-pagina2/:id',
        loadChildren: () => import('.././detalle-pagina2/detalle-pagina2.module').then(m => m.DetallePagina2PageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
