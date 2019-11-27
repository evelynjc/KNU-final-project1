window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        scaleGridLineColor : "rgb(255,80,80)",
        theme: "light2",
        axisY:{
            includeZero: false
        },
        data: [{        
            type: "line",lineColor:"rgb(255,80,80)", color: "rgba(83, 223, 128, .6)",     
            dataPoints: [    
                { y: 61 },
                { y: 62},
                { y: 66},
                { y: 81 },
                { y: 90 },
                { y: 75 },
                { y: 63 },
                { y: 80 },
                { y: 88 },
                { y: 75 },
                { y: 84 },
                { y: 67 }
            ]
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
            type: "line",lineColor:"rgb(255,80,80)", color: "rgba(83, 223, 128, .6)",     
            dataPoints: [    
                { y: 25 },
                { y: 26},
                { y: 20},
                { y: 19 },
                { y: 17 },
                { y: 20 },
                { y: 14 },
                { y: 17 },
                { y: 21 },
                { y: 22 },
                { y: 20 },
                { y: 17 }
            ]
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
            type: "line",lineColor:"rgb(255,80,80)", color: "rgba(83, 223, 128, .6)",     
            dataPoints: [    
                { y: 61 },
                { y: 62},
                { y: 66},
                { y: 81 },
                { y: 90 },
                { y: 75 },
                { y: 63 },
                { y: 80 },
                { y: 88 },
                { y: 75 },
                { y: 84 },
                { y: 67 }
            ]
        }]
    });
    chart2.render();
    
    }