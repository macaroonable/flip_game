var steps;
var his_step;
var before_best;
var	cv;
var ismobile;
var game_width = 8;
var game_height = 8;


$(function(){
steps = 0;
his_step = [];
before_best = getCookie("before_best");
$("#before_best b").html((before_best=="")?"N/A":before_best);
var uagent = navigator.userAgent.toLowerCase();
ismobile = ((uagent.search('iphone') != -1)||(uagent.search('android') != -1)||(uagent.search('ipad') != -1)||(uagent.search('webos') != -1)||(uagent.search('blackberry') != -1));
var longbrowser =  ($(window).height() > $(window).width());

if(longbrowser){
	//long browser
	$("#gamePlay").css("clear", "left");
	$("#scoreCounter").css("clear","right");
	$("body").css("padding-top","1%");
	
	$(".ui").css("height","150%");
	$(".ui").css("width","100%");	
	$("#gamePlay").css("width","100%");
	$("#gamePlay").css("height", "50%");
	$("#scoreCounter").css("width","100%");
	$("#scoreCounter").css("margin-left","auto");
	$("#scoreCounter").css("margin-right","auto");
	$("#scoreCounter").css("height","60%");
	$("#scoreCounter div").css("height","15%");
}

if((!longbrowser)&&(ismobile)){
//mobile landscape

	$("#gamePlay").css("clear", "left");
	$("#scoreCounter").css("clear","right");
	$("body").css("padding-top","1%");
	
	$(".ui").css("margin-top","0");
	$(".ui").css("height","140%");
	$(".ui").css("width","100%");
	
	$("#gamePlay").css("width","100%");
	$("#gamePlay").css("height", "68%");
	
	$("#scoreCounter").css("width","100%");
	$("#scoreCounter").css("margin-left","auto");
	$("#scoreCounter").css("margin-right","auto");
	$("#scoreCounter").css("height","60%");
	$("#scoreCounter div").css("height","15%");
}



cv = new Canvas(game_height,game_width,ismobile); 
cv.createGrid();

$(".again").mousedown(function(){
		resetGame();
});
$(".div_cell").mouseenter(function(){
		$(this).toggleClass("border_norm");
		$(this).toggleClass("border_hover");
		$.each(getNeighbor($(this)),function(index,content){
			$("#"+content).toggleClass("border_norm");
			$("#"+content).toggleClass("border_hover");
		})	
})
$(".div_cell").mouseleave(function(){
		$(this).toggleClass("border_norm");
		$(this).toggleClass("border_hover");
			$.each(getNeighbor($(this)),function(index,content){
			$("#"+content).toggleClass("border_norm");
			$("#"+content).toggleClass("border_hover");
		})

})

$(".div_cell").mousedown(
			function(){	
			flip($(this));}
)


})
function resetGame(){
	cv.reset();
	steps = 0;
	$("#current_steps b").html(steps);
	his_step = [];
}

function flip(selector){
			steps ++;
			$("#current_steps b").html(steps);
	 		var position = selector.attr('id').substring(1,selector.attr('id').length).split('_');
	 		cv.block_map[parseInt(position[0])][parseInt(position[1])].toggle();
	 		his_step.push([parseInt(position[0]),parseInt(position[1])]);
			$.each(getNeighbor(selector),function(index,content){

	 		var position = $("#"+content).attr('id').substring(1,$("#"+content).attr('id').length).split('_');
	 		cv.block_map[parseInt(position[0])][parseInt(position[1])].toggle();

		})

			 		if(cv.checkFinish()){
				 		setTimeout(function(){
					 		//gameFinished
					 	$("#finish_wrap").css("display","block");
					 	//update cookie
					 	if((before_best== "")||(parseInt(before_best) > steps)){
						setCookie("before_best",steps,200)					 	
						$("#before_best b").html(steps);
					 	}
											 	
					 }, 200);}
}



function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
}
return "";
}



