import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockPageComponent } from './stock-page/stock-page.component';
import { WrapperComponent } from './wrapper/wrapper.component';


const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full'},
  { path:'stock-page', component: StockPageComponent },
  { path: 'home-page', component: WrapperComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
