


    $("#chart2").shieldChart();
    $("#chart3").shieldChart({
        theme: "light",
        backgroundColor: '#f8f8f8',
        primaryHeader: {
            text: "Earning overview"
        },
        exportOptions: {
            image: false,
            print: false
        },
        axisX: {

            axisType: 'linear',
            min: '1',
            max: '32'
        },
        tooltipSettings: {
            chartBound: true,
            axisMarkers: {
                enabled: true,
                mode: 'xy'
            }
        },
        dataSeries: [{
            seriesType: 'splinearea',
            color: '#9539ca',
            collectionAlias: "Traffic and revenue generated",
            data: [100, 320, 453, 234, 553, 665, 345, 123, 432, 545, 654, 345, 332, 456, 234, 100, 320, 453, 234, 553, 665, 345, 123, 432, 545, 654, 345, 332, 456, 234, 400, 300]
        }]
    });


