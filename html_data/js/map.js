
function start5(){

var width=840;
var height=790;

//svg
var svg = d3.select("#picture-5")
.append("svg")
.attr("id","svg1")
.attr("width",width)
.attr("height",height);

var projection = d3.geo.mercator()
.center([107,31])
.scale(4000)
.translate([width/2+20,height/2-40]);

var path = d3.geo.path()
.projection(projection);
//让CSV文件的编码为gbk
//var csv = d3.dsv(",","text/csv;charset=gbk");

//var color = d3.scale.category20();
var color = d3.scale.linear()        
//.quantile()
//.range(["rgb(0,0,0)","rgb(255,248,220)","rgb(238,232,205)","rgb(205,200,177)","rgb(205,179,139)","rgb(255,222,173)","rgb(255,114,86)","rgb(255,127,0)","rgb(225,69,0)","rgb(225,0,0)"]);
.range(["rgb(255,248,220)","rgb(255,0,0)"]);

//画出地图，根据json文件
d3.csv("csv/z6.csv",function(csvdata){
	color.domain([d3.min(csvdata,function(d){
		return parseInt(d.value);
	}),d3.max(csvdata,function(d){
		return parseInt(d.value)/3;
	})]);
console.log(d3.max(csvdata,function(d){
	return parseInt(d.value);
}))
d3.json("china.json",function(error,root){
	if(error){
		return console.error(error);
	}
console.log(root.features);

	for(var i=0;i<csvdata.length;i++){
		var dataState = csvdata[i].state;
		var dataValue = parseFloat(csvdata[i].value);
		for(var j=0;j<root.features.length;j++){
			var jsonState = root.features[j].properties.name;
			if(dataState == jsonState){
				root.features[j].properties.value = dataValue;
				break;
			}
		}
	}
var province=svg.append("g").attr("class","province").attr("transform","translate(0,0)");
province.selectAll("path")
.data(root.features)
.enter()
.append("path")
.attr("stroke","#000")
.attr("stroke-width",1)
.style("fill","white")
.transition()
.duration(1500)

.style("fill",function(d){
	var value=d.properties.value;
	if(value){
		return color(value);
	}else{
		return "#fff";
	}
})
province.selectAll("path")
.attr("d",function(d){
	return path(d.geometry);	
})

.on("mouseover",function(d,i){
	d3.select(this)
	.style("fill","yellow");
})
.on("mouseout",function(d,i){
	d3.select(this)
	.style("fill",function(d){
		var value=d.properties.value;
	if(value){
		return color(value);
	}else{
		return "#fff";
	}
	});
})

//根据经纬度计算坐标值
	d3.csv("csv/place.csv",function(data){
	console.log(data);
	var location = svg.selectAll(".location")
	.data(data)
	.enter()
	.append("g")
	.attr("class","location");
	//画圆点
	location.append("circle")
	.attr("cx",function(d){
	return projection([d.lat,d.lon])[0];})
	.attr("cy",function(d){
	return projection([d.lat,d.lon])[1];})
	.attr("r",5)
	.attr("fill","rgba(0,0,0,0.4)")
	.attr("place",function(d){
		return d.place;
	})

	svg.selectAll("circle")
	.on("mouseover",function(d){
		d3.select(this)
		.attr("fill","red");
		var xPosition=parseFloat(d3.select(this).attr("cx"));
		var yPosition=parseFloat(d3.select(this).attr("cy"))+3190;
		d3.select("#tip")
		.style("margin-left",xPosition+"px")
		.style("margin-top",yPosition+"px")
		.select("#place")
		.text(d.place);
		var dName = d3.select(this).attr("place");
		for(var i=0;i<csvdata.length;i++)
		{
			if(csvdata[i].state==dName){
				d3.select("#workvalue")
				.text(csvdata[i].value);
				break;
			}
		}
		var r = d3.select("#tip");
		r.classed("hidden1",false);
	})
	.on("mouseout",function(d){
		d3.select(this)
		.attr("fill","rgba(0,0,0,0.4)");
		d3.select("#tip").classed("hidden1",true);
	});
	
});	
});

});

}





