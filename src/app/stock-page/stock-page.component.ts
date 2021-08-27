import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  allStocks:any[] = [];
  cleanStocks:any[] = [];
  apiLink:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  apiKey:string = "&apikey=DB9O2N661D4VQ77Z";

  ngOnInit(): void {
    this.getAllStocks();
  }


  getAllStocks(){
    let today = new Date();
    let todayString = "";
    todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String((today.getDate() -1)).padStart(2, '0');
    this.http.get("http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAllStocks").subscribe((portfolio:any) => {
      // console.log(portfolio);
      console.log(todayString);
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
        this.http.get(this.apiLink + stock.ticker + this.apiKey).subscribe((stock2:any) => {
          console.log(stock2);
          // console.log(stock2["Time Series (Daily)"][stock["date"]]["4. close"]);
          setTimeout(() => {
            let purchasePrice = stock2["Time Series (Daily)"][stock["date"]]["4. close"];
            let currentPrice = stock2["Time Series (Daily)"][todayString]["4. close"];
            stock["Purchase Price"] =  "$" + parseFloat(purchasePrice).toFixed(2);
           stock["Current Price"] = "$" + parseFloat(currentPrice).toFixed(2);
           stock['Gain/Loss'] = ((currentPrice - purchasePrice) / purchasePrice).toFixed(2) + "%";
          }, 1)
          // console.log(todayString);
        })
      }

      console.log(this.allStocks);
      
      

    })

  }

}
