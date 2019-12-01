function drawChart(data1, data2, data3){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        scaleGridLineColor : "rgb(255,80,80)",
        theme: "light2",

        axisY:{
            includeZero: false
        },
        data: [{        
            type: "line",lineColor:"rgb(255,80,80)", color: "rgba(120,130,240,0.5)",     
	dataPoints:data1
        }]
    });
    chart.render();

    var chart1 = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        scaleGridLineColor : "rgb(255,80,80)",
        theme: "light2",
        axisY:{
            includeZero: false
        },
        data: [{        
            type: "line",lineColor:"rgb(255,80,80)", color: "rgba(120,130,240,0.5)",
            dataPoints:data2
        }]
    });
    chart1.render();

    var chart2 = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        scaleGridLineColor : "rgb(255,80,80)",
        theme: "light2",
        axisY:{
            includeZero: false
        },
        data: [{        
            type: "line",lineColor:"rgb(255,80,80)", color: "rgba(120,130,240,0.5)",     
            dataPoints: data3
        }]
    });
    chart2.render();
    
}
