function generateGraph(ctx,graphLabels,graphMaxData,graphMinData,titleHeader) {
     var data = {
  labels: graphLabels,
  datasets: [{
      label: "Min temp",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)", // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "black",
      pointBackgroundColor: "white",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgba(220,220,220,1)",
      pointHoverBorderColor: "rgba(151,187,205,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: true
      data: graphMinData,
      spanGaps: true,
    }, {
      label: "Max temp",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "white",
      pointBackgroundColor: "black",
      pointBorderWidth: 1,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "rgba(220,220,220,1)",
      pointHoverBorderColor: "rgba(151,187,205,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: false
      data: graphMaxData,
      spanGaps: false,
    }

  ]
};

// Notice the scaleLabel at the same level as Ticks
var options = {
    title: {
            display: true,
            text: titleHeader,
            fontSize: 26,
            fontFamily: 'Saira Condensed',
            fontColor: '#f4b042'
        },
    tooltips: {
    enabled: true
  },
    hover: {mode: null},
    legend: {
             labels: {
                  fontColor: 'white'
                 }
              },
  scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false,
                    fontColor: 'white'
                },
                scaleLabel: {
                     display: true,
                     labelString: '',
                     fontSize: 20 
                  }
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'white'
                },
            }]
        }  
};
    //var myChart;
    console.log((myChart!= undefined));
    if(myChart != undefined) {
        myChart.destroy();
    }
    var myChart = new Chart(ctx, {
    type: 'line',
    data : data,
    options: options,
    showTooltips: false

});
    //myChart.destroy();
}  

//changeDateFormat(date) {
//    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     
//    return date;
//}


function checkWeather() {
    
    var dateField = document.getElementById('datepicker').value;
    console.log(dateField);
    var ctx = document.getElementById("myChart").getContext('2d');
    var ctx1 = document.getElementById("myChart1").getContext('2d');
    ctx.clearRect(0,0, ctx.width, ctx.height);
    ctx.canvas.style.height = '0px';
    ctx1.clearRect(0,0, ctx1.width, ctx1.height);
    ctx1.canvas.style.height = '0px';
    
   // ctx.destroy();
    var splitDate = dateField.split("/");
    var date = splitDate[0];
    var month = splitDate[1];
    var year = splitDate[2];
    var outputDateFormat = year+date+month;
    console.log(outputDateFormat);
    
   
    //var timestamp = moment(outputDateFormat, "YYYYMMDD");
    var timestamp = Date.parse(dateField)/1000;
    console.log(timestamp);
    
    var graphLabels=[];
    var graphMinData = [];
    var graphMaxData =[];
    var titleHeader = "My Forecast Model";
    var responseData;
    ctx.canvas.style.height = '250px';
    
    // http req. to get data from 18.
    
    const xmlHttp = new XMLHttpRequest();
     xmlHttp.open('get', "forecast5/"+outputDateFormat, true)
      xmlHttp.timeout = 2000;
      xmlHttp.onreadystatechange = function(e) {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
           responseData = JSON.parse(xmlHttp.responseText);
            console.log("response:",responseData);
            for(var i=0; i< responseData.length; i++) {
                console.log(responseData[i].DATE);
                //var formattedDate = changeDateFormat(responseData[i].DATE);
                //graphLabels.push(responseData[i].DATE);
                var changedateformat = responseData[i].DATE;
                var yearsplit = changedateformat.substr(0,4);
                var monthsplit = changedateformat.substr(4,2);
                var datesplit = changedateformat.substr(6,2);
                graphLabels.push(monthsplit+"/"+datesplit+"/"+yearsplit);
                graphMinData.push(responseData[i].TMIN);
                graphMaxData.push(responseData[i].TMAX);
            }
              generateGraph(ctx,graphLabels,graphMaxData,graphMinData,titleHeader);
          } else {
           console.log("error"+e);
          }
        }
      xmlHttp.send(null);
    
    // http req. to get data from dark sky
    var graphLabels1=[];
    var graphMinData1 = [];
    var graphMaxData1 =[];
    var titleHeader1 = "Dark Sky API";
    var responseData1;
    ctx1.canvas.style.height = '250px';
    
    const xmlHttp1 = new XMLHttpRequest();
     xmlHttp1.open('get', "darksky/"+outputDateFormat, true)
      xmlHttp1.timeout = 2000;
      xmlHttp1.onreadystatechange = function(e) {
        if (xmlHttp1.status === 200 && xmlHttp1.readyState === 4) {
           responseData1 = JSON.parse(xmlHttp1.responseText);
            console.log("response1 dor timesj:",responseData1);
           for(var i=0; i< responseData1.length; i++) {
               console.log(responseData1[i].DATE);
               //var formattedDate = changeDateFormat(responseData[i].DATE);
               //graphLabels1.push(responseData1[i].DATE);
               var changedateformat = responseData[i].DATE;
               var yearsplit = changedateformat.substr(0,4);
               var monthsplit = changedateformat.substr(4,2);
               var datesplit = changedateformat.substr(6,2);
               graphLabels1.push(monthsplit+"/"+datesplit+"/"+yearsplit);
               graphMinData1.push(responseData1[i].TMIN);
               graphMaxData1.push(responseData1[i].TMAX);
           }
             generateGraph(ctx1,graphLabels1,graphMaxData1,graphMinData1,titleHeader1);
          } else {
           console.log("error"+e);
          }
        }
      xmlHttp1.send(null);
    
}