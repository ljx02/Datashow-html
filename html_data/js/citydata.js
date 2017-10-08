c=[];
updata1=[];
var bar_height = 20;
function start6(){
var dataset=[0,0,0,0,0,0,0,0,0,0],
width=840,
margin={top:100,left:50,right:30,bottom:20}
//bar_height=20,
bar_padding=10,
height=500;
var g_width=width-margin.left-margin.right,
g_height=height-margin.top-margin.bottom;

var scale=d3.scale.linear()
.domain([0,d3.max(dataset)])
.range([0,g_width]);

var city=["北京","上海","广州","深圳","陕西","湖南","山东","南京","杭州","大连"];

//var csv=d3.dsv(",","text/csv;charset=gbk");
d3.csv("csv/z4.csv",function(csvdata){
	for(var i=0;i<10;i++){
		city[i]=csvdata[i].city;
		c[i]=city[i];
	}
	console.log(city);


var scale_x=d3.scale.linear()
.domain([0,d3.max(dataset)])
.range([0,g_width]);


var svg=d3.select("#picture-6")
.append("svg")
.attr("width",width)
.attr("height",height);

var g=svg.append("g")
.attr("transform","translate(" + margin.left +"," + margin.top +")");

var bar=svg.selectAll(".bar")
.data(dataset)
.enter()
.append("g")
.attr("class","bar")
.attr("transform",function(d,i){
	return "translate("+margin.left+","+(i*(bar_height+bar_padding)+margin.top)+")";
});

bar.append("rect")
.transition()
.duration(1000)
.ease("bounce")
.attr({
	"height":bar_height,
	"width":function(d){return scale(d);}
})
.style("fill","red")

bar.selectAll("rect")
.on("mouseover",function(d,i){
	d3.select(this)
		.transition()
		.duration(1)
		.style("fill","red");
});

bar.selectAll("rect")
.on("mouseout",function(d,i){
	d3.select(this)
		.transition()
		.duration(500)
		.style("fill","blue");
});

bar.append("text")
.attr("fill","black")
.attr("class","num")
.text(function(d){return d;})
.attr({
	"y":bar_height-5,
	"x":function(d){return scale(d);},
	//"dx":-20,
	"text-anchor":"end"
})

bar.append("text")
.data(city)
.text(function(d){return d;})
.attr({
	"y":bar_height-5,
	"x":-40,
})
	

var x_axis = d3.svg.axis().scale(scale_x);

g.append("g")
.attr("class","x_axis")
.call(x_axis)
.attr("transform","translate(0,-10)")
//.attr("transform","rotate(30)")

svg.selectAll(".tick")
.selectAll("text")
.attr("y","-20")

updata();

function updata(){
//d3.select("#updata")
//.on("click",function(){
	
	var num=dataset.length;
	//updata1=[];
	for(var i=0;i<num;i++){
		updata1[i]=parseInt(csvdata[i].data);
	}
	scale_x.domain([0,d3.max(updata1)]);
	console.log(d3.max(updata1));
	var x_axis=d3.svg.axis().scale(scale_x);
	
	svg.select(".x_axis")
		.transition()
		.duration(1000)
		.call(x_axis)
		.selectAll("text")
		.attr("y","-20");
	
	svg.selectAll("rect")
		.data(updata1)
		.transition()
		.duration(2000)
		//.ease("bounce")
		.delay(function(d,i){return (i+1)*100;})
		.attr("height",bar_height)
		.attr("width",function(d){
		return scale_x(d);})
		.style("fill",function(d){return "rgb(0,0,"+(d*10)+")";})
		
	svg.selectAll(".bar")
		.select(".num")
		.data(updata1)
		.transition()
		.duration(2000)
		.delay(function(d,i){return i*100;})
		.text(function(d){return d;})
		.attr("fill","white")
		.attr("x",function(d){return scale_x(d);})
		.attr("y",bar_height/2+5)
		//.attr("text-anchor",middle);
}



});

}