// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })

// export class ChartComponent implements OnInit {

//   constructor() { }

//   saleData = [
//     { name: "Mobiles", value: 105000 },
//     { name: "Laptop", value: 55000 },
//     { name: "AC", value: 15000 },
//     { name: "Headset", value: 150000 },
//     { name: "Fridge", value: 20000 }
//   ];

//   ngOnInit(): void {
//   }

// }





// import { Component, NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { multi } from './data';

// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })

// export class ChartComponent {
//   multi: any[] = [];

//   // options
//   legend: boolean = false;
//   showLabels: boolean = true;
//   animations: boolean = true;
//   xAxis: boolean = true;
//   yAxis: boolean = true;
//   showYAxisLabel: boolean = false;
//   showXAxisLabel: boolean = false;
//   xAxisLabel: string = 'Year';
//   yAxisLabel: string = 'Population';
//   timeline: boolean = true;

//   // colorScheme = {
//   //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
//   // };

//   constructor() {
//     Object.assign(this, { multi });
//   }
// }

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent{
  multi: any[] = [];
  
  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Balance';

  accountInfo:any[] = [];
  allStocks:any[] = [];
  realStocks:any[] = [];
  accountCashMap: any = {};
  accountInvestMap:any = {};
  networthHashMap:any = {};
  dataForChart:any[] = [];
  apiLink:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  apiKey:string = "&apikey=DB9O2N661D4VQ77Z";
  networth:any = 0;
  cashValue:any =0;
  investmentValue:any =0;
  scope:any = 165;
  refresh:boolean = true;

  constructor(private http:HttpClient) { 
    // Object.assign(this, { this.dataForChart });
  }

  ngOnInit(): void {
    this.getAccountInfo();
    // this.getAllStocks();
    // console.log('I HAVE BEEN CALLED');
    // console.log(this.accountInfo);
    // console.log(this.allStocks);
    this.getNetWorth();
    this.formatForChart();
  }

  changeScope(scope:number){
    this.scope = scope;
    this.formatForChart();
    console.log("grblakjgan");

    this.refresh = false;
    setTimeout(() => {
      this.refresh = true;
    }, 50)
  }

  formatForChart(){
    this.dataForChart = [];
    setTimeout(() => {
      let cash:any = {};
      let invest:any = {};
      let netWorth:any = {};
      cash["name"] = "CashValue";
      cash["series"] = [];
      invest["name"] = "Investment";
      invest["series"] = [];
      netWorth["name"] = "Net Worth";
      netWorth["series"] = [];
      let iterable = Object.keys(this.accountCashMap);
      for(let i = 0; i < this.scope; i++){
        let parts = iterable[i].split('-');
        let mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])); 
        console.log(this.scope);
        let tempObject = {"name": mydate, "value": this.accountCashMap[iterable[i]]};
        cash["series"].push(tempObject);
      }
      for(let i = 0; i < this.scope; i++){
        let parts = iterable[i].split('-');
        let mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])); 
        // console.log(mydate.toDateString());
        let tempObject = {"name": mydate, "value": this.accountInvestMap[iterable[i]]};
        invest["series"].push(tempObject);
      }
      for(let i = 0; i < this.scope; i++){
        let parts = iterable[i].split('-');
        let mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])); 
        let tempObject = {"name": mydate, "value": this.accountCashMap[iterable[i]] + this.accountInvestMap[iterable[i]]};
        netWorth["series"].push(tempObject);
      }
      this.dataForChart.push(cash);
      this.dataForChart.push(invest);
      this.dataForChart.push(netWorth);
      console.log(this.dataForChart);
      // multi = this.dataForChart;
    }, 1500)
  }

  getAccountInfo(){
    this.http.get('http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts').subscribe((res:any) => {
      // console.log(res)
      let cashMap:any = {};
      let investMap: any ={};
      setTimeout(() => {
      for(let el of res){
        let splitObject = el["date"].split('T');
        // console.log(splitObject[0]);
        el["date"] = splitObject[0];
      }
      console.log(res);
      for(let item of res){
        if(item["type"] == "Cash Management" || item["type"] == "Checking" || item["type"] == "Savings"
        ){
          if(cashMap[item[""]] == true){
            cashMap[item["date"]] + item["balance"];
          }
          else{
            cashMap[item["date"]] = item["balance"];
          }
        }
        else{
          if(investMap[item[""]] == true){
            investMap[item["date"]] + item["balance"];
          }
          else{
            investMap[item["date"]] = item["balance"];
          }
        }
      }
      // console.log(cashMap);
      // console.log(investMap);
      this.accountCashMap = cashMap;
      this.accountInvestMap = investMap;
      this.accountInfo = res;
      // console.log(this.accountInfo)
      // console.log(this.accountCashMap);
      // console.log(this.accountInvestMap);
      }, 1000); 
    })
  }

  getNetWorth(){
    for(let item in this.accountCashMap ){
      this.networthHashMap[item] = this.accountCashMap[item] + this.accountInvestMap[item];
    }
    console.log(this.networthHashMap);
  }

  getAllStocks(){
    let hashmap:any = {};
    let today = new Date();
    let todayString = "";
    todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String((today.getDate() -1)).padStart(2, '0');
    this.http.get("http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAllStocks").subscribe((portfolio:any) => {
      // console.log(portfolio);
      // console.log(todayString);
      let length = portfolio.length;
      //getting random stocks to populate the page
      for(let i = 0; i < 10; i++){
        let randomIndex = Math.floor(Math.random() * length);
        portfolio[randomIndex]["date"]
        let splitObject = portfolio[randomIndex]["date"].split('T');
        // console.log(splitObject[0]);
        portfolio[randomIndex]["date"] = splitObject[0];
        this.allStocks.push(portfolio[randomIndex]);
        portfolio.splice(randomIndex, 1);
        length--;
      }
      // console.log(this.allStocks);
      for(let stock of this.allStocks){
        // console.log(stock);
        this.http.get(this.apiLink + stock.ticker + this.apiKey).subscribe((stockFromApi:any) => {
          // console.log(stockFromApi);
          // console.log(stockFromApi["Time Series (Daily)"][stock["date"]]["4. close"]);
          this.realStocks.push(stockFromApi);
          setTimeout(() => {
          stock["Purchase Price"] =  stockFromApi["Time Series (Daily)"][stock["date"]]["4. close"];
           stock["Current Price"] = stockFromApi["Time Series (Daily)"][todayString]["4. close"];
           stock['Gain/Loss'] = (stock["Current Price"] - stock["Purchase Price"]) / stock["Purchase Price"];
          //  console.log(this.realStocks)
          //  console.log(stockFromApi)
           for(let item of stockFromApi["Time Series (Daily)"]){
            if(hashmap[item]){
              hashmap[item] + item["close"];
            }
            else{
              hashmap[item] = item["close"];
            }
          }
          }, 1)
          // console.log(todayString);
        })
      }
      // console.log(this.allStocks);
    })
  }
}
// import { Component, OnInit } from '@angular/core';
// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
// export class ChartComponent implements OnInit {
//   constructor() { }
// saleData = [
//   { name: "Mobiles", value: 105000 },
//   { name: "Laptop", value: 55000 },
//   { name: "AC", value: 15000 },
//   { name: "Headset", value: 150000 },
//   { name: "Fridge", value: 20000 }
// ];
//   ngOnInit(): void {
//   }
// }
