import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockPageComponent } from './stock-page/stock-page.component';
import { DashboardComponent } from './wrapper/dashboard/dashboard.component';
import { OverviewComponent } from './wrapper/dashboard/overview/overview.component';
import { ChartComponent } from './wrapper/dashboard/chart/chart.component';
import { Top5ListsComponent } from './wrapper/dashboard/top5-lists/top5-lists.component';
import { AccountsComponent } from './wrapper/accounts/accounts.component';
import { ListComponent } from './wrapper/dashboard/top5-lists/list/list.component';
import { AcctComponent } from './wrapper/accounts/acct/acct.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import {HttpClientModule } from '@angular/common/http';

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
    AcctComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
