import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor() { }
  apiLink:string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  apiKey:string = "&apikey=DB9O2N661D4VQ77Z";
  accountLink:string = 'http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts';
  stocksLink:string = 'http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAllStocks';


  





  
}
