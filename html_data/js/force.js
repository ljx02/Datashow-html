Node=[];
function start(){
var width=839,
height=600;

//var csv=d3.dsv(",","text/csv;charset=gbk;");
d3.csv("csv/z2.csv",function(csvdata){
	console.log(csvdata);
	Node=[];
	Num=[];
	var len=csvdata.length;
	for(var i=0;i<len;i++){
		var node=csvdata[i].name;
		var n=csvdata[i].num;
		Node.push({
			"name":node
		})
		Num.push({
			"num":n
		})
	}
	
var dataset={
	nodes:Node
	/*[
	{name:"IT"},
	{name:"BAT"},
	{name:"算法分析师"},
	{name:"Hadoop架构师"},
	{name:"Spark架构师"},
	{name:"数据分析师"},
	{name:"数据挖掘工程师"}
							]*/
							,
							edges:[
							/*
							{source:0,target:1},
								{source:0,target:2},
								{source:0,target:5},
								{source:0,target:6},
								
								
								*/],
								
	counts:Num
	/*[
	
	{num:300},
	{num:200},
	{num:120},
	{num:80},
	{num:90},
	{num:70},
	{num:100}
						]*/
};

console.log(dataset.nodes);

var svg = d3.select("#picture-2")
.append("svg")
.attr("width",width)
.attr("height",height)
.style("margin-top","-50px");

var forces = d3.layout.force()
.nodes(dataset.nodes)
.links(dataset.edges)
.size([width,height])

//.chargeDistance(300)

.linkDistance([100])//保证线条的距离
.charge([-1100])//相互排斥系数
.start();

//console.log(dataset.nodes);

var edges = svg.selectAll("line")
.data(dataset.edges)
.enter()
.append("line")
//.style("stroke","white")
.style("stroke","#ccc")
.style("stroke-width",1);

var scale = d3.scale.linear()
.domain([0,20000])
.range([20,21]);

var color = d3.scale.category20();
var nodes = svg.selectAll("circle")
.data(dataset.nodes)
.enter()
.append("circle")
//.attr("r","15")

.attr("r",function(d,i){
	return scale(dataset.counts[i].num*100);
})
.style("fill",function(d,i){
	return color(i);
})
.call(forces.drag);


var textnum = svg.selectAll(".num")
.data(dataset.nodes)
.enter()
.append("text")

forces.on("tick",function(){
		edges.attr("x1",function(d){return d.source.x;})
		.attr("y1",function(d){return d.source.y;})
		.attr("x2",function(d){return d.target.x;})
		.attr("y2",function(d){return d.target.y;});
		nodes.attr("cx",function(d){return d.x;})
		.attr("cy",function(d){return d.y;});
		
svg.selectAll("circle")
.on("mouseover",function(d,i){
	var xPosition=parseFloat(d3.select(this).attr("cx"));
	var yPosition=parseFloat(d3.select(this).attr("cy"));
	var text1 = d3.select("#Bigdatatip")
		.style("margin-left",xPosition+"px")
		.style("margin-top",(yPosition+950)+"px")
		text1.select("#workname")
		.text(d.name)
		text1.select("#number")
		.text(dataset.counts[i].num);
	var r = d3.select("#Bigdatatip");
	r.classed("hidden2",false);
})
.on("mouseout",function(d,i){
	d3.select("#Bigdatatip").classed("hidden2",true);
})		

textnum.text(function(d,i){
	return dataset.counts[i].num;
})
.attr("x",function(d){
	return d.x-20;
})
.attr("y",function(d){
	return d.y;
})
.attr("fill","black")
.attr("font-size","20px");

		
});
	
})


}



