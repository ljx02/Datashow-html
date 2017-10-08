var data=[0,0,0,0,0,0,0,0,0,0],
width=760,
height =500,
margin={left:50,top:30,right:0,bottom:300};
var svg_width=width+margin.left+margin.right;
var svg_height=height+margin.top+margin.bottom;


var scale_y=d3.scale.linear()
.domain([0,d3.max(data)])
.range([height,0]);

var scale_x=d3.scale.ordinal()
.domain(d3.range(data.length+1))
.rangeRoundBands([0,width],0.05);

//var csv=d3.dsv(",","text/csv;charset=gbk;")


//svg
var svg=d3.select("#picture-1")
.append("svg")
.attr("width",svg_width)
.attr("height",svg_height);

var chart=svg.append("g")
.attr("transform","translate("+margin.left+","+margin.top+")");

var x_axis=d3.svg.axis().scale(scale_x),
y_axis=d3.svg.axis().scale(scale_y).orient("left");

chart.append("g")
.attr("class","x_axis")
.call(x_axis)
.attr("transform","translate(0"+","+height+")")


chart.append("g")
.attr("class","y_axis")
.call(y_axis)

var bar = svg.selectAll("bar")
.data(data)
.enter()
.append("g")
.attr("class","bar")
.attr("transform",function(d,i){return "translate("+(i*1.2*scale_x.rangeBand()+margin.left+3)+",30)";})


bar.append("rect")
.attr({
	"x":function(d,i){return i;},
	"y":function(d){return scale_y(d);},
	"width":scale_x.rangeBand()-20,
	"height":function(d){return height-scale_y(d);}
})
.style("fill","red");

svg.selectAll("rect")
.data(data)
.transition()
.duration(2000)
.ease("bounce")
.delay(function(d,i){return i*100;})
.attr("y",function(d){
		return scale_y(d);})
.attr("height",function(d){
		return height-scale_y(d);})
.style("fill",function(d,i){return "blue";})
.attr({
	"x":function(d,i){return i;},
	"width":scale_x.rangeBand(),
});

bar.append("text")
.text(function(d){return d;})
.attr({
	"y":function(d){return scale_y(d)+15;},
	"x":function(d,i){return (i+scale_x.rangeBand()/2);},
	"text-anchor":"middle",
	"fill":"white",
});
//d3.select("#updata")
function updata(){
	var num=data.length;
	console.log(num);
	updata=[];
	works=[];
	/*
	for(var i=0;i<num;i++){
		var number=Math.ceil(Math.random()*(Math.random()*30));
		updata.push(number);
	}
	*/
	
	d3.csv("csv/z1.csv",function(csvdata){
		for(var i=0;i<num;i++)
		{
			var number = parseInt(csvdata[i].money);
			var work=csvdata[i].work;
			updata[i] = number;
			works[i]=work;
		}
		console.log(works);
	scale_y.domain([0,250]);
	scale_x.domain(works);
	var y_axis=d3.svg.axis().scale(scale_y).orient("left").ticks(7);
	var x_axis=d3.svg.axis().scale(scale_x).ticks(10);
	var yaxis=svg.select(".y_axis")
		.transition()
		.duration(1000)
		.call(y_axis);
	var xaxis=svg.select(".x_axis")
		.transition()
		.duration(1000)
		.call(x_axis);
	xaxis.selectAll("text")
	.attr("transform","rotate(80)")
	.style("text-anchor","start")
	xaxis.selectAll("text")
	.attr("dx",10)
	xaxis.selectAll(".tick")
	.attr("transform",function(d,i){
	return "translate("+(i*scale_x.rangeBand()/0.9-840)+",0)";})
	
	
	yaxis.selectAll("text")
	.text(function(d,i){return d+"k";})
	
	svg.selectAll("rect")
		.data(updata)
		.transition()
		.duration(2000)
		.ease("bounce")
		.delay(function(d,i){return (i+1)*100;})
		.attr("x",function(d,i){
		return i;})
		.attr("y",function(d){
		return scale_y(d);})
		.attr("height",function(d){
		return height-scale_y(d);})
		.style("fill",function(d,i){return "blue";});
	svg.selectAll(".bar")
		.select("text") //类中唯一只有一个text,如果选择ALL则所有的text都变为第一个值
		.data(updata)
		.transition()
		.duration(1000)
		.delay(function(d,i){return i*100;})
		.text(function(d){return d;})
		.style("fill","white")
		.attr("y",function(d){return scale_y(d)+15;})
		.attr("transform","translate(-10,0)");
		//.attr("text-anchor","middle");
		
})
}

svg.selectAll("rect")
.on("mouseover",function(d,i){
	d3.select(this)
		.transition()
		.duration(1)
		.style("fill","red");
		
	var xPosition=i*scale_x.rangeBand()+i*10;
	var yPosition=parseFloat(d3.select(this).attr("y"))/2+height/2;
	
	d3.select("#tooltip")
		.style("margin-left",xPosition+"px")
		.style("margin-top",yPosition+"px")
		.select("#value")
		.text(d);
	d3.select("#work")
	.text(works[i])
	
	var r = d3.select("#tooltip");
	r.classed("hidden",false);
});
svg.selectAll("rect")
.on("mouseout",function(d,i){
	d3.select(this)
		.transition()
		.duration(500)
		.style("fill",function(){return "blue";});
	d3.select("#tooltip").classed("hidden",true);
});
updata();








