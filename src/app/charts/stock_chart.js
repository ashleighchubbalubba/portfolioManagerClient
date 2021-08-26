

networth = []
finalNetWorth = []
datesForYear = [] // this will be filled with Date objects
stringDatesForYear = [] // this will be filled with dates as strings
uniqueDatesAsLabels = []
listCashValues = []
listInvestmentValues = []
listNetWorthValues = []

// http://stockportfoliomanager-stockportfoliomanager.namdevops14.conygre.com/getAccounts
// const api_get_accounts = 'http://localhost:8080/getAccounts'
// const response = fetch(api_get_accounts).then(function(response) {
//   accounts = response.json();
//   console.log(accounts)
// })
// .catch(function(error) {
//   console.log('Looks like there was a problem: \n', error);
// });


// WORKING CORRECTLY
function generateDatesForYear()
{
    months = [1,2,3,4,5,6,7,8,9,10,11,12]
    days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    years = [2021]

    for (month in months) 
    {
        for (day in days)
        {
                // if (month != 2 && !(days > 29 && days <= 31))
                {
                    datesForYear.push(new Date(years[0], months[month], days[day]))
                    stringDatesForYear.push(months[month] + '/' + days[day] + '/' + years[0])
                }
        }
    }
}

generateDatesForYear()

function generateNetWorthObjects()
{
    // Iterate through all of the dates in the list

    for (date in stringDatesForYear)
    {
        // For some reason, 'date' prints out the indexes instead of the items
        // console.log(date)

        // Iterate through all of the accounts
        // { accountNumber: '1', bank: 'Wells Fargo', type: 'Investment', balance: '1306279', date: '1/21/2021' },
        // { accountNumber: '2', bank: 'Capital One', type: 'Cash', balance: '4442876', date: '1/21/2021' }
        //                                                  .
        //                                                  .
        //                                                  .

        nw = { date : '',
            cashValue : 0,
            investmentValue : 0
        }
        
        for (ac in accounts)
        {
            // If the date of any of the accounts match the date in the list, we add a NetWorth object with
            // the matched date to the list of NetWorth objects
            // ['1/1/2021', '1/2/2021', ..., '12/31/2021']
            
            if (accounts[ac].date === stringDatesForYear[date])
            {
                nw.date = stringDatesForYear[date]
                
                if (accounts[ac].type === 'Investment')
                {
                    nw.investmentValue += accounts[ac].balance
                }
                else if (accounts[ac].type === 'Cash')
                {
                    nw.cashValue += accounts[ac].balance
                }
            }
        }
        networth.push(nw)
    }

    for (let i = 0; i < networth.length; i++) {
        if (!(networth[i].date === '' && networth[i].cashValue === 0 && networth[i].investmentValue === 0)) {
            finalNetWorth.push(networth[i]);
        }
      }
}

generateNetWorthObjects()

function generateLabels()
{
    for (nw in finalNetWorth)
    {
        uniqueDatesAsLabels.push(finalNetWorth[nw].date);
    }
}

function generateCashValues()
{
    for (nw in finalNetWorth)
    {
        listCashValues.push(finalNetWorth[nw].cashValue);
    }
}

function generateInvestmentValues()
{
    for (nw in finalNetWorth)
    {
        listInvestmentValues.push(finalNetWorth[nw].investmentValue);
    }
}

function generateNetWorthValues()
{
    for (nw in finalNetWorth)
    {
        listNetWorthValues.push(finalNetWorth[nw].investmentValue + finalNetWorth[nw].cashValue);
    }
}

generateLabels()
generateCashValues()
generateInvestmentValues()
generateNetWorthValues()

function generateChartLastWeek()
{
  uniqueDatesAsLabels2 = []
  listNetWorthValues2 = []
  listCashValues2 = []
  listInvestmentValues2 = []

  for (i = 0; i < 7; i++)
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

function generateChartLastMonth()
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

function generateChartLastQuarter()
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

function generateChartYearToDate()
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