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


$(function(){
var uagent = navigator.userAgent.toLowerCase();
var ismobile = ((uagent.search('iphone') != -1)||(uagent.search('android') != -1)||(uagent.search('ipad') != -1)||(uagent.search('webos') != -1)||(uagent.search('blackberry') != -1));

if(ismobile){
//mobile detected
$("#ui").css("width","90%");
$("#gameplay").css("width","90%");

$("#gameplay").css("float","none");
$("#gameplay").css("margin-left","auto");
$("#gameplay").css("margin-right","auto");
$("#gameplay").css("margin-bottom","10%");



$("#scoreCounter").css("float","none");
$("#scoreCounter").css("margin-left","auto");
$("#scoreCounter").css("margin-right","auto");
}


var	cv = new Canvas(8,8,ismobile); //use 10,10 for publish
	cv.createGrid();
var steps = 0;
var before_best= getCookie("before_best");
$("#before_best b").html((before_best=="")?"N/A":before_best);



$(".again").mousedown(function(){
	location.reload();
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

$(".div_cell").mousedown(function(){
			//toggle itself
//			$(this).toggleClass("normal_cell");
//			$(this).toggleClass("flipped_cell");
			steps ++;
			$("#current_steps b").html(steps);
	 		var position = $(this).attr('id').substring(1,$(this).attr('id').length).split('_');
	 		cv.block_map[parseInt(position[0])][parseInt(position[1])].toggle();

			//toggle the neighbor
			$.each(getNeighbor($(this)),function(index,content){
//			$("#"+content).toggleClass("normal_cell");
//			$("#"+content).toggleClass("flipped_cell");

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
})

})



