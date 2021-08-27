// import { Component, OnInit } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgxChartsModule } from '@swimlane/ngx-charts';


// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
// export class ChartComponent implements OnInit {
//   accountInfo:any[] = [];
//   allStocks:any[] = [];
//   apiLink:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
//   apiKey:string = "&apikey=DB9O2N661D4VQ77Z";

//   constructor(private http:HttpClient) { }

//   ngOnInit(): void {
//     this.getAccountInfo();
//     this.getAllStocks();
//     console.log('I HAVE BEEN CALLED');
//     // console.log(this.accountInfo);
//     // console.log(this.allStocks);
//     this.createChart();
//   }

//   createChart(){
//     console.log(this.accountInfo);
//     console.log(this.allStocks);
//   }

//   getAccountInfo(){
//     this.http.get('http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts').subscribe((res:any) => {
//       // console.log(res)
//       setTimeout(() => {
//        this.accountInfo = res;
//       //  console.log(this.accountInfo)
//       }, 1000); 
//     })
//   }

//   getAllStocks(){
//     let today = new Date();
//     let todayString = "";
//     todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String((today.getDate() -1)).padStart(2, '0');
//     this.http.get("http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAllStocks").subscribe((portfolio:any) => {
//       // console.log(portfolio);
//       // console.log(todayString);
//       let length = portfolio.length;
//       //getting random stocks to populate the page
//       for(let i = 0; i < 10; i++){
//         let randomIndex = Math.floor(Math.random() * length);
//         portfolio[randomIndex]["date"]
//         let splitObject = portfolio[randomIndex]["date"].split('T');
//         // console.log(splitObject[0]);
//         portfolio[randomIndex]["date"] = splitObject[0];
//         this.allStocks.push(portfolio[randomIndex]);
//         portfolio.splice(randomIndex, 1);
//         length--;
//       }
//       // console.log(this.allStocks);
//       for(let stock of this.allStocks){
//         // console.log(stock);
//         this.http.get(this.apiLink + stock.ticker + this.apiKey).subscribe((stock2:any) => {
//           // console.log(stock2);
//           // console.log(stock2["Time Series (Daily)"][stock["date"]]["4. close"]);
//           setTimeout(() => {
//             stock["Purchase Price"] =  stock2["Time Series (Daily)"][stock["date"]]["4. close"];
//            stock["Current Price"] = stock2["Time Series (Daily)"][todayString]["4. close"];

//            stock['Gain/Loss'] = (stock["Current Price"] - stock["Purchase Price"]) / stock["Purchase Price"];
//           }, 1)
//           // console.log(todayString);
//         })
//       }

//       // console.log(this.allStocks);
      
      

//     })

//   }

// }
