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

  top5Gainers:any[] = [];
  top5Losers:any[] = [];


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
        portfolio[randomIndex]["date"] = splitObject[0];
        this.allStocks.push(portfolio[randomIndex]);
        portfolio.splice(randomIndex, 1);
        length--;
      }
      for(let stock of this.allStocks){
        this.http.get(this.apiLink + stock.ticker + this.apiKey).subscribe((stock2:any) => {
          setTimeout(() => {
            let purchasePrice = stock2["Time Series (Daily)"][stock["date"]]["4. close"];
            let currentPrice = stock2["Time Series (Daily)"][todayString]["4. close"];

            stock['percent'] = (currentPrice - purchasePrice) / purchasePrice;
            stock['percent'] = parseFloat(stock['percent'].toFixed(2));
            this.allStocks.sort((a,b) => {return (a.percent - b.percent)})
            let half = Math.ceil(this.allStocks.length / 2); 

            this.top5Losers = this.allStocks.slice(0, half);
            this.top5Gainers = this.allStocks.slice(-half).reverse();
            console.log(this.top5Gainers);
            console.log(this.top5Losers);
          }, 1)
        })
      }
      console.log(this.allStocks);
      console.log(this.top5Gainers);
      console.log(this.top5Losers);
    })
  }

}
