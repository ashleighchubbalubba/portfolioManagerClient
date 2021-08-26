import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private http : HttpClient, @Inject(DOCUMENT) document)
  {
    //  private document: Document
  }

  accounts : any[] = []

  ngOnInit(): void {
    this.getAccountsData();
    this.generateDatesForYear();
    this.generateNetWorthObjects();
    this.generateLabels();
    this.generateCashValues();
    this.generateInvestmentValues();
    this.generateNetWorthValues();
  }

  // THIS WORKS!!!
  getAccountsData(){
    this.http.get('http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts').subscribe((res:any) => {
      
      for (let el of res){
        let splitObject = el["date"].split('T');
        el["date"] = splitObject[0];
      }  

      this.accounts = res
    })
  }

  ////////////////////////////// LOGIC FOR CHART ////////////////////////////////////////

  networth : any = []
  finalNetWorth : any = []
  datesForYear = [] // this will be filled with Date objects
  stringDatesForYear : any[] = [] // this will be filled with dates as strings
  uniqueDatesAsLabels : any = []
  listCashValues : any = []
  listInvestmentValues : any = []
  listNetWorthValues : any = []
  
  months = [1,2,3,4,5,6,7,8,9,10,11,12]
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  years = [2021]
  tempDate : any = ''

  // WORKING CORRECTLY
  generateDatesForYear()
  {
      for (let month in this.months) 
      {
          for (let day in this.days)
          {
                  // if (month != 2 && !(days > 29 && days <= 31))
                  {
                      // this.datesForYear.push(new Date(this.years[0], this.months[month], this.days[day]))
                      this.tempDate = this.tempDate + this.years[0] + '-'
  
                      // if month is between 1 and 9, we append a 0 before it
                      if (this.months[month] > 0 && this.months[month] < 10)
                      {
                          this.tempDate = this.tempDate + '0' + this.months[month] + '-';
  
                          // if day is between 1 and 9, we append a 0 before it
                          if (this.days[day] > 0 && this.days[day] < 10)
                          {
                              this.tempDate = this.tempDate + '0' + this.days[day];
                          }
  
                          // if day is between 10 and 31, we do not append a 0 before it
                          else
                          {
                              this.tempDate = this.tempDate + day[day];
                          }
                      }
                      // if month is between 10 and 12, we do not append a 0 before it
                      else
                      {
                          this.tempDate = this.tempDate + this.months[month] + '-';
  
                          // if day is between 1 and 9, we append a 0 before it
                          if (this.days[day] > 0 && this.days[day] < 10)
                          {
                              this.tempDate = this.tempDate + '0' + this.days[day];
                          }
  
                          // if day is between 10 and 31, we do not append a 0 before it
                          else
                          {
                              this.tempDate = this.tempDate + day[day];
                          }
                      }
                      
                      this.stringDatesForYear.push(this.tempDate)
                  }
          }
      }
  }
  
  generateNetWorthObjects()
  {
      // Iterate through all of the dates in the list
  
      for (let date in this.stringDatesForYear)
      {
          // For some reason, 'date' prints out the indexes instead of the items
          // console.log(date)
  
          // Iterate through all of the accounts
          // { accountNumber: '1', bank: 'Wells Fargo', type: 'Investment', balance: '1306279', date: '1/21/2021' },
          // { accountNumber: '2', bank: 'Capital One', type: 'Cash', balance: '4442876', date: '1/21/2021' }
          //                                                  .
          //                                                  .
          //                                                  .
  
          let nw = { date : '',
              cashValue : 0,
              investmentValue : 0
          }
          
          for (let ac in this.accounts)
          {
              // If the date of any of the accounts match the date in the list, we add a NetWorth object with
              // the matched date to the list of NetWorth objects
              // ['1/1/2021', '1/2/2021', ..., '12/31/2021']
              
              if (this.accounts[ac].date === this.stringDatesForYear[date])
              {
                  nw.date = this.stringDatesForYear[date]
                  
                  if (this.accounts[ac].type === 'Investment')
                  {
                      nw.investmentValue += this.accounts[ac].balance
                  }
                  else if (this.accounts[ac].type === 'Cash')
                  {
                      nw.cashValue += this.accounts[ac].balance
                  }
              }
          }
          this.networth.push(nw)
      }
  
      for (let i = 0; i < this.networth.length; i++) {
          this.finalNetWorth.push(this.networth[i]);
      }
  }
  
  generateLabels()
  {
      for (let nw in this.finalNetWorth)
      {
          this.uniqueDatesAsLabels.push(this.finalNetWorth[nw].date);
      }
  }
  
  generateCashValues()
  {
      for (let nw in this.finalNetWorth)
      {
          this.listCashValues.push(this.finalNetWorth[nw].cashValue);
      }
  }
  
  generateInvestmentValues()
  {
      for (let nw in this.finalNetWorth)
      {
          this.listInvestmentValues.push(this.finalNetWorth[nw].investmentValue);
      }
  }
  
  generateNetWorthValues()
  {
      for (let nw in this.finalNetWorth)
      {
          this.listNetWorthValues.push(this.finalNetWorth[nw].investmentValue + this.finalNetWorth[nw].cashValue);
      }
  }
  

  
  generateChartLastWeek()
  {
    let uniqueDatesAsLabels2 = []
    let listNetWorthValues2 = []
    let listCashValues2 = []
    let listInvestmentValues2 = []
  
    for (let i = 0; i < 7; i++)
    {
      uniqueDatesAsLabels2.push(this.uniqueDatesAsLabels[i])
      listNetWorthValues2.push(this.listNetWorthValues[i])
      listCashValues2.push(this.listCashValues[i])
      listInvestmentValues2.push(this.listInvestmentValues[i])
    }
  // make an Ng Container
  // put code in 
    document.querySelector("#chartReport").innerHTML = '<button (click)="generateChartLastWeek()">Last Week Chart</button>' +
              '<button (click)="generateChartLastMonth()">Last Month Chart</button>' +
              '<button (click)="generateChartLastQuarter()">Last Quarter Chart</button>' +
              '<button (click)="generateChartYearToDate()">Last Year Chart</button>' +
              '<canvas id="myChart"></canvas>';
  
    var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: uniqueDatesAsLabels2,
              datasets: [{
              label: 'Net Worth',
              backgroundColor: 'white',
              borderColor: 'rgb(0,128,0)',
              data: listNetWorthValues2,
              },
              {
              label: 'Cash',
              backgroundColor: 'white',
              borderColor: 'rgb(0,0,128)',
              data: listCashValues2,
              },
              {
              label: 'Investment',
              backgroundColor: 'white',
              borderColor: 'rgb(32,178,170)',
              data: listInvestmentValues2,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              legend: {display: true},
              plugins: {
              title: {
                  display: true,
                  text: 'Changes in Net Worth, Cash, and Investment Last Week'
              }
          }
          }
      });
  
      
  }
  
  generateChartLastMonth()
  {
    uniqueDatesAsLabels2 = []
    listNetWorthValues2 = []
    listCashValues2 = []
    listInvestmentValues2 = []
  
    for (i = 0; i < 30; i++)
    {
      uniqueDatesAsLabels2.push(uniqueDatesAsLabels[i])
      listNetWorthValues2.push(listNetWorthValues[i])
      listCashValues2.push(listCashValues[i])
      listInvestmentValues2.push(listInvestmentValues[i])
    }
    
    document.querySelector("#chartReport").innerHTML = '<button onClick="generateChartLastWeek()">Last Week Chart</button>' +
              '<button onClick="generateChartLastMonth()">Last Month Chart</button>' +
              '<button onClick="generateChartLastQuarter()">Last Quarter Chart</button>' +
                    '<button onClick="generateChartYearToDate()">Last Year Chart</button>' +
              '<canvas id="myChart"></canvas>';
  
    ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: uniqueDatesAsLabels2,
              datasets: [{
              label: 'Net Worth',
              backgroundColor: 'white',
              borderColor: 'rgb(0,128,0)',
              data: listNetWorthValues2,
              },
              {
              label: 'Cash',
              backgroundColor: 'white',
              borderColor: 'rgb(0,0,128)',
              data: listCashValues2,
              },
              {
              label: 'Investment',
              backgroundColor: 'white',
              borderColor: 'rgb(32,178,170)',
              data: listInvestmentValues2,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              legend: {display: true},
              plugins: {
              title: {
                  display: true,
                  text: 'Changes in Net Worth, Cash, and Investment Last Month'
              }
          }
          }
      });
  }
  
  generateChartLastQuarter()
  {
    uniqueDatesAsLabels2 = []
    listNetWorthValues2 = []
    listCashValues2 = []
    listInvestmentValues2 = []
  
    for (i = 0; i < 90; i++)
    {
      uniqueDatesAsLabels2.push(uniqueDatesAsLabels[i])
      listNetWorthValues2.push(listNetWorthValues[i])
      listCashValues2.push(listCashValues[i])
      listInvestmentValues2.push(listInvestmentValues[i])
    }
    
    document.querySelector("#chartReport").innerHTML = '<button onClick="generateChartLastWeek()">Last Week Chart</button>' +
              '<button onClick="generateChartLastMonth()">Last Month Chart</button>' +
              '<button onClick="generateChartLastQuarter()">Last Quarter Chart</button>' +
                    '<button onClick="generateChartYearToDate()">Last Year Chart</button>' +
              '<canvas id="myChart"></canvas>';
  
    ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: uniqueDatesAsLabels2,
              datasets: [{
              label: 'Net Worth',
              backgroundColor: 'white',
              borderColor: 'rgb(0,128,0)',
              data: listNetWorthValues2,
              },
              {
              label: 'Cash',
              backgroundColor: 'white',
              borderColor: 'rgb(0,0,128)',
              data: listCashValues2,
              },
              {
              label: 'Investment',
              backgroundColor: 'white',
              borderColor: 'rgb(32,178,170)',
              data: listInvestmentValues2,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              legend: {display: true},
              plugins: {
              title: {
                  display: true,
                  text: 'Changes in Net Worth, Cash, and Investment Last Month'
              }
          }
          }
      });
  }
  
  generateChartYearToDate()
  {
    uniqueDatesAsLabels2 = []
    listNetWorthValues2 = []
    listCashValues2 = []
    listInvestmentValues2 = []
  
    for (i = 0; i < accounts.length; i++)
    {
      uniqueDatesAsLabels2.push(uniqueDatesAsLabels[i])
      listNetWorthValues2.push(listNetWorthValues[i])
      listCashValues2.push(listCashValues[i])
      listInvestmentValues2.push(listInvestmentValues[i])
    }
    
    document.querySelector("#chartReport").innerHTML = '<button onClick="generateChartLastWeek()">Last Week Chart</button>' +
              '<button onClick="generateChartLastMonth()">Last Month Chart</button>' +
              '<button onClick="generateChartLastQuarter()">Last Quarter Chart</button>' +
                    '<button onClick="generateChartYearToDate()">Last Year Chart</button>' +
              '<canvas id="myChart"></canvas>';
  
    ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: uniqueDatesAsLabels2,
              datasets: [{
              label: 'Net Worth',
              backgroundColor: 'white',
              borderColor: 'rgb(0,128,0)',
              data: listNetWorthValues2,
              },
              {
              label: 'Cash',
              backgroundColor: 'white',
              borderColor: 'rgb(0,0,128)',
              data: listCashValues2,
              },
              {
              label: 'Investment',
              backgroundColor: 'white',
              borderColor: 'rgb(32,178,170)',
              data: listInvestmentValues2,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              legend: {display: true},
              plugins: {
              title: {
                  display: true,
                  text: 'Changes in Net Worth, Cash, and Investment Last Month'
              }
          }
          }
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  }
