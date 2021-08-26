import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private http: HttpClient) { 
  }

  allAccounts:string[]= [];
  todaysCashBanks:any = [];
  todaysInvestBanks:any = [];
  totalCashValue:number = 0;
  totalInvestValue:number = 0;
  netWorth:number = 0;

  cash = "CASH";
  investment = "INVESTMENT";

  ngOnInit(): void {
    this.getTodaysAccountBalances();
  }

  getTodaysAccountBalances(){
    let today = new Date();
    let todayString = "";
    todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    
    this.http.get('http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts').subscribe((res:any) => {
      console.log(res)
      for (let el of res){
        // console.log(el["date"]);
        let splitObject = el["date"].split('T');
        // console.log(splitObject[0]);
        el["date"] = splitObject[0];
        if(el["date"] == todayString && el["type"] == "Cash"){
          this.todaysCashBanks.push(el);
        }
        else if(el["date"] == todayString && el["type"] == "Investment"){
          this.todaysInvestBanks.push(el);
        }
      }  

      this.totalCashValue = this.todaysCashBanks.reduce((total:any, elem:any) => {
        return total + elem["balance"];
      }, 0);
      this.totalInvestValue = this.todaysInvestBanks.reduce((total:any, elem:any) => {
        return total + elem["balance"];
      }, 0);
      this.netWorth = this.totalCashValue + this.totalInvestValue;
      // console.log(this.todaysCashBanks); 
      //console.log(this.todaysInvestBanks)
    })
  }
}
