import { Component, OnInit, Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-top5-lists',
  templateUrl: './top5-lists.component.html',
  styleUrls: ['./top5-lists.component.css']
})
export class Top5ListsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  allStocks:any[] = [];
  cleanStocks:any[] = [];
  apiLink:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  apiKey:string = "&apikey=DB9O2N661D4VQ77Z";
  fruits = [{name: 'Ashleigh', num: 0.1390582305}, {name: 'bubby', num: -0.45}, {name: 'chubby', num: 0.24}];
  percentages:any[] = [];

  gain = "Top 5 Gainers";
  loss = "Top 5 Losers";

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks(){
    let today = new Date();
    let todayString = "";
    todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String((today.getDate() -1)).padStart(2, '0');
    this.http.get("http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAllStocks").subscribe((portfolio:any) => {
      // console.log(portfolio);
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
      for(let stock of this.allStocks){
        // console.log(stock);
        this.http.get(this.apiLink + stock.ticker + this.apiKey).subscribe((stock2:any) => {
          // console.log(stock2);
          // console.log(stock2["Time Series (Daily)"][stock["date"]]["4. close"]);
          setTimeout(() => {
            let purchasePrice = stock2["Time Series (Daily)"][stock["date"]]["4. close"];
            let currentPrice = stock2["Time Series (Daily)"][todayString]["4. close"];

            stock['percent'] = (currentPrice - purchasePrice) / purchasePrice;
            //  stock['percent'] = parseFloat(stock['percent'].toFixed(2));
            console.log(stock['percent']);
            
          }, 1)
          // console.log(todayString);
        })
      }
      
      this.fruits.forEach(stock => this.percentages.push(stock.num));
      console.log(this.percentages);
      this.allStocks = this.allStocks.sort((a,b) => {return (a.percent - b.percent)})
      this.fruits = this.fruits.sort((a,b) => {return (a.num - b.num)})
      console.log(this.fruits);

      // this.allStocks.sort((a, b) => a['Gain/Loss'] < b['Gain/Loss'] ? -1 : a['Gain/Loss'] > b['Gain/Loss'] ? 1 : 0)
      // this.allStocks.sort(this.compare);
      console.log(this.allStocks);
    })
  }

  // compare( a:any,b:any ) {
  //   if ( a['Gain/Loss'] < b['Gain/Loss'] ){
  //     return -1;
  //   }
  //   if ( b['Gain/Loss'] < a['Gain/Loss'] ){
  //     return 1;
  //   }
  //   return 0;
  // }

}
