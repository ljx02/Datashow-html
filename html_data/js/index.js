
var flag=0;
var wd=0;
window.onscroll = function(){
	var w = document.documentElement.scrollTop||document.body.scrollTop;
	wd=w;
	var t = document.documentElement.scrollTop||document.body.scrollTop;
	var t3 = document.documentElement.scrollTop||document.body.scrollTop;
	var t4 = document.documentElement.scrollTop||document.body.scrollTop;
	var t5 = document.documentElement.scrollTop||document.body.scrollTop;
	var t6 = document.documentElement.scrollTop||document.body.scrollTop;
	var l2 = document.documentElement.scrollTop||document.body.scrollTop;
	var l3 = document.documentElement.scrollTop||document.body.scrollTop;
	var l4 = document.documentElement.scrollTop||document.body.scrollTop;
	var l5 = document.documentElement.scrollTop||document.body.scrollTop;
	var l6 = document.documentElement.scrollTop||document.body.scrollTop;
	
	var picture2show = document.getElementById("picture-2")||getElementById("picture-2");
	var top_div = document.getElementById("leftshow-fixed")||getElementById("leftshow-fixed");
	var title2 = document.getElementById("title2")||getElementById("title2");
	
	var picture3show = document.getElementById("picture-3")||getElementById("picture-3");
	var title3 = document.getElementById("title3")||getElementById("title3");
	
	var picture4show = document.getElementById("picture-4")||getElementById("picture-4");
	var title4 = document.getElementById("title4")||getElementById("title4");
	
	var picture5show = document.getElementById("picture-5")||getElementById("picture-5");
	var title5 = document.getElementById("title5")||getElementById("title5");
	
	var picture6show = document.getElementById("picture-6")||getElementById("picture-6");
	var title6 = document.getElementById("title6")||getElementById("title6");
	
	var li2show = document.getElementById("li2")||getElementById("li2");
	var li3show = document.getElementById("li3")||getElementById("li3");
	var li4show = document.getElementById("li4")||getElementById("li4");
	var li5show = document.getElementById("li5")||getElementById("li5");
	var li6show = document.getElementById("li6")||getElementById("li6");
	
	if(l2>=800){
		if(l2<1500){
		li2show.style.backgroundColor="white";
		li2show.style.fontSize="23px";
		li3show.style.backgroundColor="transparent";
		li3show.style.fontSize="18px";
		}
		else{
		li2show.style.backgroundColor="transparent";
		li2show.style.fontSize="18px";
		}		
	}
	if(l3>=1500){
		if(l3<2200){
		li3show.style.backgroundColor="white";
		li3show.style.fontSize="23px";
		li4show.style.backgroundColor="transparent";
		li4show.style.fontSize="18px";
		}
		else{
		li3show.style.backgroundColor="transparent";
		li3show.style.fontSize="18px";
		}
	}
	if(l4>=2200){
		if(l4<2900){
		li4show.style.backgroundColor="white";
		li4show.style.fontSize="23px";
		li5show.style.backgroundColor="transparent";
		li5show.style.fontSize="18px";
		}
		if(l4>=2900){
		li4show.style.backgroundColor="transparent";
		li4show.style.fontSize="18px";
		}
	}
	if(l5>=2900){
		if(l5<3500){
		li5show.style.backgroundColor="white";
		li5show.style.fontSize="23px";
		li6show.style.backgroundColor="transparent";
		li6show.style.fontSize="18px";
		}
		if(l5>=3500){
		li5show.style.backgroundColor="transparent";
		li5show.style.fontSize="18px";
		}
	}
	if(l6>=3500){
		li6show.style.backgroundColor="white";
		li6show.style.fontSize="23px";
	}
	
	if(t>=800){
		if(flag==0){
		start();
		flag=1;
		}
		top_div.style.display="block";
		picture2show.style.display="inline";
		title2.style.display="inline";
	}else{
		top_div.style.display="none";
	}
	
	if(t3>=1500){
		if(flag==1){
			start3();
			flag=2;
		}
		picture3show.style.display="inline";
		title3.style.display="inline";
	}
	
	if(t4>=2200){
		if(flag==2){
			start4();
			flag=3;
		}
		picture4show.style.display="inline";
		title4.style.display="inline";
	}
			
	if(t5>=2900){
		if(flag==3){
			start5();
			flag=4;
		}
		picture5show.style.display="inline";
		title5.style.display="inline";
	}
	
	if(t6>=3500){
		if(flag==4){
			start6();
			//updata();
			flag=5;
		}
		picture6show.style.display="inline";
		title6.style.display="inline";
	}
	
	
}

function seedata(){
	if(wd<800){
		confirm("<月薪最高的计算机职位TOP.10>\n"+"    "+works[0]+":  "+updata[0]+"k\n"+
		"    "+works[1]+":  "+updata[1]+"k\n"+"    "+works[2]+":  "+updata[2]+"k\n"+"    "+works[3]+":  "+updata[3]+"k\n"+
		"    "+works[4]+":  "+updata[4]+"k\n"+"    "+works[5]+":  "+updata[5]+"k\n"+"    "+works[6]+":  "+updata[6]+"k\n"+
		"    "+works[7]+":  "+updata[7]+"k\n"+"    "+works[8]+":  "+updata[8]+"k\n"+"    "+works[9]+":  "+updata[9]+"k\n");
	}
	if(wd>=800){
		if(wd<1500){
			confirm("<大数据职位排行>\n通过提取当今热门大数据职位:\n"+Node[0].name+","+Node[1].name+","+Node[2].name+","+
			Node[3].name+","+Node[4].name+","+Node[5].name+","+Node[6].name+","+Node[7].name+
			"\n通过小球的半径来体现相应职位的需求量");
		}
	}
	if(wd>=1500){
		if(wd<2200){
			confirm("<学籍要求比例>\n"+"数据说明：鼠标落在经验条形图上可以展示每种学籍的百分比;\n"+
			"鼠标落在学籍的图标上可以展示该学籍下各种经验的需求个数\n");
		}
	}
	if(wd>=2200){
		if(wd<2900){
			confirm("<对大数据需求迫切的10大行业>\n"+areas[0]+"\t\t"+nums[0]+"\n"+areas[1]+"\t\t"+nums[1]+"\n"+areas[2]+"\t\t"+nums[2]+"\n"+
			areas[3]+"\t\t"+nums[3]+"\n"+areas[4]+"\t\t"+nums[4]+"\n"+areas[5]+"\t\t"+nums[5]+"\n"+areas[6]+"\t\t"+nums[6]+"\n"+
			areas[7]+"\t\t"+nums[7]+"\n"+areas[8]+"\t\t"+nums[8]+"\n"+areas[9]+"\t\t"+nums[9]+"\n");
		}
	}
	if(wd>=2900){
		if(wd<3500){
			confirm("<计算机职业各省份分布情况>\n"+"通过颜色的深浅来体现该省份的计算机职位数量");
		}
	}
	if(wd>=3500){
			confirm("<大数据最热门城市排名>\n"+c[0]+"\t\t\t"+updata1[0]+"\n"+c[1]+"\t\t\t"+updata1[1]+"\n"+c[2]+"\t\t\t"+updata1[2]+"\n"+c[3]+"\t\t\t"+updata1[3]+"\n"+c[4]+"\t\t\t"+updata1[4]+"\n"+
			c[5]+"\t\t\t"+updata1[5]+"\n"+c[6]+"\t\t\t"+updata1[6]+"\n"+c[7]+"\t\t\t"+updata1[7]+"\n"+c[8]+"\t\t\t"+updata1[8]+"\n"+c[9]+"\t\t\t"+updata1[9]+"\n");
		}
}

