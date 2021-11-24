import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./@views/home/home.component";
import {DetailsDayComponent} from "./@views/details-day/details-day.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'details-day', component: DetailsDayComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
