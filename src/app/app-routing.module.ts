import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: "",
  children: [
    {
      path: "",
      component: HomeComponent,
      pathMatch: "full"
    },
    {
      path: "",
      children: [
        {
          path: "festivals",
          loadChildren: () => import("./festival/festival.module").then(m => m.FestivalModule)
        },
      ]
    },
    
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
