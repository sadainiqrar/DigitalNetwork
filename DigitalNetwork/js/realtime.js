$.getScript('js/charts/flot/jquery.flot.min.js', function(){
  $.getScript('js/charts/flot/jquery.flot.pie.min.js',function(){
    $.getScript('js/charts/flot/jquery.flot.resize.min.js',function(){
            
      // styles for all charts
      gridStyle = {borderColor:'#ddd',borderWidth:1,hoverable:true,clickable:true};
      
      // static charts
      var d1 = [];
      for (var i = 0; i < 14; i += 0.2) {
         d1.push([i, Math.sin(i)]);
      } 
      var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
      var d3 = [[0, 12], [7, 12], [12, 13]];
      
      // line
      $.plot("#chart1",[d1],{yaxis:{show:false},xaxis:{font:'#ddd'},grid:gridStyle,series:{color:'#f0ad4e',lines:{show:true}}});
      $.plot("#chart3",[d2,d3],{yaxis:{show:false},xaxis:{font:'#ddd'},grid:gridStyle,series:{color:'#ff4444',lines:{show:true},points:{show:true}}});
      $.plot("#chart4",[d3],{yaxis:{show:false},xaxis:{font:'#ddd'},grid:gridStyle,series:{color:'#4444ff'}});
      $.plot("#chart5",[d3,d2],{yaxis:{show:false},xaxis:{font:'#ddd'},grid:gridStyle,series:{color:'#55ff44',lines:{show:true},points:{show:true}}});
      
      // pie
      $.plot("#donut1",[{data:70,color:'#5bc0de'},{data:20,color:'#ddd'}],{series:{pie:{show:true,innerRadius:0.7}},grid:{hoverable:true}});
      $.plot("#donut2",[{data:20,color:'#5bc0de'},{data:55,color:'#ddd'}],{series:{pie:{show:true,innerRadius:0.7}},grid:{hoverable:true}});
      $.plot("#donut3",[{data:4,color:'#5bc0de'},{data:70,color:'#ddd'}],{series:{pie:{show:true,innerRadius:0.7}},grid:{hoverable:true}});
      $.plot("#donut4",[{data:30,color:'#5bc0de'},{data:70,color:'#ddd'}],{series:{pie:{show:true,innerRadius:0.7}},grid:{hoverable:true}});
      
      // bar
      var b1 = [[0, 3], [1, 5], [2, 2], [3, 9], [4, 10], [5, 8], [6, 6], [7, 4], [8, 2]];
      var b2 = [[0, 3], [1, 8], [2, 5], [3, 13], [4, 10], [5, 3], [6, 5], [7, 8], [8, 2]];
      var b3 = [[0, 1], [1, 4], [2, 4], [3, 6], [4, 7], [5, 3], [6, 5], [7, 11], [8, 9]];
      
      $.plot("#bar1",[b1],{
                series:{color:'#ffffff',bars:{show:true}},
                bars:{lineWidth:3,fillColor:'#000055'},
                grid:{show:false,hoverable:true}});
      $.plot("#bar2",[b2],{
                series:{color:'#ffffff',bars:{show:true}},
                bars:{lineWidth:3,fillColor:'#57889c'},
                grid:{show:false,hoverable:true}});
      $.plot("#bar3",[b3],{
                series:{color:'#ffffff',bars:{show:true}},
                bars:{lineWidth:3,fillColor:'#005500'},
                grid:{show:false,hoverable:true}});
      
      // pie
      $.plot("#p1",[12,78,90],{series:{pie:{show:true}},grid:{hoverable:true}});
      $.plot("#p2",[33,66,8],{series:{pie:{show:true}},grid:{hoverable:true}});
      $.plot("#p3",[19,34,77],{series:{pie:{show:true}},grid:{hoverable:true}});
      
      
      // real-time chart
      // we use an inline data source in the example, usually data would
      // be fetched from a server
      var data = [], totalPoints = 200;
      function getRandomData() {
        
        if (data.length > 0)
          data = data.slice(1);
        
        // do a random walk
        while (data.length < totalPoints) {
          var prev = data.length > 0 ? data[data.length - 1] : 50;
          var y = prev + Math.random() * 10-5;
          if (y < 0)
            y = 0;
          if (y > 100)
            y = 100;
          data.push(Math.round(y*100)/100);
        }
      
        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i){
          res.push([i, data[i]])
        }
        return res;
        
        
      }
      
      // setup control widget
      var updateInterval = 300;
      $("#updateInterval").val(updateInterval).change(function () {
      var v = $(this).val();
      if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1)
            updateInterval = 1;
            if (updateInterval > 2000)
             updateInterval = 2000;
             $(this).val("" + updateInterval);
            }
      });
      
      // realtime plot
      var options = {
        grid:gridStyle,
        //series:{shadowSize:0,lines:{show:true,fill:true,fillColor:'rgba(40,200,40,.5)'},color:'#5cb85c'},
		series:{shadowSize:0,lines:{show:true,fill:true,fillColor:'rgba(200,220,200,.6)'},color:'#99bb99'},       
        yaxis:{min:0,max:100,font:'#ddd'},
        xaxis:{show:true}
      };
       
      var plot = $.plot($("#chart1"), [ getRandomData() ], options);
      var realTime;
      function update() {
        plot.setData([ getRandomData() ]);
        plot.draw();
        realTime = setTimeout(update, updateInterval);
      }
      
      update();
      
      $("#chart1").bind("plothover", function (event, pos, item) {
        $("#tooltip").remove();
        if (item) {
            var tooltip = item.series.data[item.dataIndex][1];
            $('<a href="#" class="tooltip" id="tooltip">' + tooltip + '</a>')
            .css({
              top: item.pageY + 5,
              left: item.pageX + 5
            })
            .appendTo("body").fadeIn(200);
        }
	  });
      
      $('.realtime').click(function() {
        var activeBtn = $(this).find(".active");
        
        if (activeBtn.text()==="off"){
          update();
          $(this).find(":contains('off')").removeClass("btn-danger");
        }
        else {
          clearTimeout(realTime);
          $(this).find(":contains('off')").addClass("btn-danger");
        }
        
        $('.realtime>.btn').toggleClass("active btn-success");
        
      });//toggle click

    });// end getScript (resize)
  });// end getScript (pie)
});// end getScript
