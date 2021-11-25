import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./@views/home/home.component";
import {DetailsComponent} from "./@views/details/details.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'details/:id', component: DetailsComponent
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
