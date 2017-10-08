areas=[];
nums=[];
function start4(){

var margin={top:70,right:100,bottom:100,left:190},
width=Math.min(800,window.innerWidth-10)-margin.left-margin.right,
height=Math.min(width,window.innerHeight-margin.top-margin.bottom-20);
//width=800,
//height=700;
//var csv =d3.dsv(",","text/csv;charset=gbk");
d3.csv("csv/z5.csv",function(csvdata){
	var n=csvdata.length;
	top10=[];
	top1=[];
	for(var i=0;i<n;i++){
		var a=csvdata[i].area;
		areas[i]=a;
		var nu=parseInt(csvdata[i].num);
		nums[i]=nu;
		top1[i]=[areas[i],0];
		top10[i]=[areas[i],nums[i]];
	}
	var max=d3.max(nums);
var data=top1;
/*
[  
					  
						["金融",0],
						["IT企业",0],
						["房地产",0],
						["服务型",0],
						["电商",0],
						["医院",0],
						["政府",0],
						["科研型",0],
						["TT",0],
						["型",0]
						
						
					  
	
	];
	*/
	
	console.log(data);
	
var dataset=top10;

var color = d3.scale.ordinal()
.range(["#EDC951","#CC333F","#00A0B0"]);

var radarCharOptions={
	w:width,
	h:height,
	margin:margin,
	maxValue:max,
	levels:10,
	roundStrokes:true,
	color:color
};



var id="#picture-4",
options=radarCharOptions;
	var cfg={
		w:600,
		h:600,
		margin:{top:20,right:20,bottom:20,left:20},
		levels:2,
		maxValue:max,
		labelFactor:1.20,
		wrapWidth:60,
		opacityArea:0.2,
		dotRadius:5,
		opacityCircles:0.1,
		strokeWidth:2,
		roundStrokes:false,
		color:d3.scale.category10()
	};
	if("undefined"!== typeof options){
		for(var i in options){
			if("undefined"!== typeof options[i]){cfg[i]=options[i];}
		}
	}
	var maxValue = max;
	//var allAxis=(data[0].map(function(i,j){return i.axis;})),
	var allAxis=(data.map(function(i,j){return i[0];})),
		total=allAxis.length,
		radius=Math.min(cfg.w/2,cfg.h/2),
		//Format=d3.format("%"),
		angleSlice=Math.PI*2/total;
		console.log(data.length);
		
	var rScale=d3.scale.linear()
	.range([50,radius])
	.domain([1000,maxValue]);
	
	d3.select(id).select("svg").remove();
	
	var svg=d3.select(id).append("svg")
	.attr("width",cfg.w+cfg.margin.left+cfg.margin.right)
	.attr("height",cfg.h+cfg.margin.top+cfg.margin.bottom)
	.attr("class","radar"+id);
	
	var g=svg.append("g")
	.attr("transform","translate("+(cfg.w/2+cfg.margin.left)+","+(cfg.h/2+cfg.margin.top)+")");
	
	var filter=g.append("defs").append("filter").attr("id","glow"),
		feGaussianBlur=filter.append("feGaussianBlur").attr("stdDeviation","2.5").attr("result","coloredBlur"),
		feMerge=filter.append("feMerge"),
		feMergeNode_1=feMerge.append("feMergeNode").attr("in","coloredBlur"),
		feMergeNode_2=feMerge.append("feMergeNode").attr("in","SourceGraphic");
		
	
	var axisGrid=g.append("g").attr("class","axisWrapper");
	
	//画出圆形坐标
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
	.style("filter" , "url(#glow)");
	
	axisGrid.selectAll(".levels")
	.data(d3.range(1,(cfg.levels+1)).reverse())
	.enter()
	.append("text")
	.attr("class","axisLabel")
	.attr("x",4)
	.attr("y",function(d){return -d*radius/cfg.levels;})
	.attr("dy","0.4em")
	.style("font-size","15px")
	.attr("fill","#737373")
	.text(function(d,i){return maxValue*d/cfg.levels;});
	
	var axis=axisGrid.selectAll(".axis")
	.data(allAxis)
	.enter()
	.append("g")
	.attr("class","axis");
	
	axis.append("line")
	.attr("x1",0)
	.attr("y1",0)
	.attr("x2",function(d,i){return rScale(maxValue*1.1)*Math.cos(angleSlice*i-Math.PI/2);})
	.attr("y2",function(d,i){return rScale(maxValue*1.1)*Math.sin(angleSlice*i-Math.PI/2);})	
	.attr("class","line")
	.style("stroke","grey")
	.style("stroke-width","2px");
	
	axis.append("text")
	.attr("class","legend")
	.style("font-size","15px")
	.attr("text-anchor","middle")
	.attr("dy","0.35em")
	.attr("x",function(d,i){return rScale(maxValue*cfg.labelFactor)*Math.cos(angleSlice*i-Math.PI/2);})
	.attr("y",function(d,i){return rScale(maxValue*cfg.labelFactor)*Math.sin(angleSlice*i-Math.PI/2);})
	.text(function(d){return d;})
	//.call(wrap,cfg.wrapWidth);
	
	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d,i) { return rScale(d); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.append("g")
		.attr("class", "radarWrapper");
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(data.map(function(d,i){return d[1];})); })
		.style("fill","blue")
		.style("fill-opacity", cfg.opacityArea)
		.style("stroke","red")
		.style("stroke-width",cfg.strokeWidth+"px")
		.style("filter","url(#glow)")
		.on('mouseover', function (){
			//Dim all blobs
			
			d3.select(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.05); 
				
			//Bring back the hovered over blob
			/*
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.1);	
				*/
		})
		.on('mouseout', function(){
			//Bring back all blobs
			d3.select(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
	
		var blobCircleWrapper=g.append("g")
		.attr("class","radarCircleWrapper");
		
blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d[1]) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d[1]) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill","red")
		.style("opacity",0.4)
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;		
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(d[1])
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);

function updata(){
	
	
	var blob = blobCircleWrapper.selectAll(".radarInvisibleCircle")
	.data(dataset)
	
	blob
	.transition()
	.duration(2000)
	.attr("cx", function(d,i){ return rScale(d[1]) * Math.cos(angleSlice*i - Math.PI/2); })
	.attr("cy", function(d,i){ return rScale(d[1]) * Math.sin(angleSlice*i - Math.PI/2); })
	
	
	var upline =  blobWrapper.select(".radarArea")
	.data(dataset)
	
	upline
	.transition()
	.duration(2000)
	.attr("d",function(d,i) { return radarLine(dataset.map(function(d,i){return d[1];})); })
		
}
updata();

});

}
		
		
		
		
		