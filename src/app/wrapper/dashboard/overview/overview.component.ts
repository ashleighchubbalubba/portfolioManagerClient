import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private http: HttpClient) { }

  allAccounts:string[]= [];
  todaysCashBanks:any = [];
  todaysInvestBanks:any = [];
  totalCashValue:number = 0;
  totalInvestValue:number = 0;
  netWorth:number = 0;

  ngOnInit(): void {
    this.getValues();
  }

  

  getValues() {
    let today = new Date();
    let todayString = "";
    todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    console.log(todayString);

    this.http.get('http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts').subscribe((res:any) => {
      for (let el of res){
        let splitObject = el["date"].split('T');
        el["date"] = splitObject[0];


        if(el["date"] == todayString && (el["type"] == "Cash Management" || el["type"] == "Checking" || el["type"] == "Savings")){
          this.todaysCashBanks.push(el);
        }
        else if(el["date"] == todayString && (el["type"] == "Roth IRA" || el["type"] == "Fidelity Brokerage" || el["type"] == "Retirement Account" || el["type"] == "Bond Portfolio")){
          this.todaysInvestBanks.push(el);
          console.log(todayString)
        }
      }  
      this.totalCashValue = this.todaysCashBanks.reduce((total:any, elem:any) => {
        return total + elem["balance"];
      }, 0);
      this.totalInvestValue = this.todaysInvestBanks.reduce((total:any, elem:any) => {
        return total + elem["balance"];
      }, 0);
      this.netWorth = this.totalCashValue + this.totalInvestValue;
    })
  }

}
