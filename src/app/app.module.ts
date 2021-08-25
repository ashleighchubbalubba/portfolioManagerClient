import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockPageComponent } from './stock-page/stock-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { Top5ListsComponent } from './dashboard/top5-lists/top5-lists.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ListComponent } from './dashboard/top5-lists/list/list.component';
import { AcctComponent } from './accounts/acct/acct.component';

@NgModule({
  declarations: [
    AppComponent,
    StockPageComponent,
    DashboardComponent,
    OverviewComponent,
    ChartComponent,
    Top5ListsComponent,
    AccountsComponent,
    ListComponent,
    AcctComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
