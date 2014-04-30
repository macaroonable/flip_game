function Canvas(canvas_height,canvas_width,ismobile){
	this.width = canvas_width;
	this.height = canvas_height;
	this.ismobile = ismobile;
	this.block_map = new Array(this.width);
	for(var i=0;i<this.block_map.length;i++){
	this.block_map[i] = new Array(this.height);
	}
}

Canvas.prototype.createGrid = function(){
var cell_dim ;

//set the dimension of each cell
if(this.ismobile)
{
	cell_dim = ((($("#gamePlay").height()>$("#gamePlay").width())? $("#gamePlay").width():$("#gamePlay").height())*0.8)/(this.width)
}
else{
	cell_dim = ((($("#gamePlay").height()>$("#gamePlay").width())? $("#gamePlay").width():$("#gamePlay").height())*0.8)/(this.width)
}
	cell_dim = (cell_dim > 30)?cell_dim:30;


	for(var i = 0; i<this.height;i++){
			$("#canvas-container").append($("<div></div>").attr('id',('div_row'+i)).attr('class','div_row')) 
			for(var j = 0; j<this.width; j++){
			this.block_map[i][j] = new Block(i,j);
				
		}	
	}


	if(this.ismobile){
	$(".div_cell").css("border-radius","3px");
	$(".div_cell").css("margin","1px");
}
	$(".div_cell").css({"height":parseInt(cell_dim, 10) + "px","width":parseInt(cell_dim, 10) + "px"})
//	}
	$(".div_row").css({"height":$(".div_cell").outerHeight(true)+"px","width":this.width*($(".div_cell").outerWidth(true))+"px"});
	$("#canvas-container").css({"height":$(".div_row").outerHeight(true)*this.height + "px","width":($(".div_row").outerWidth(true))+"px"})
}

Canvas.prototype.checkFinish = function(){
	var finished = true;
	for (var i =0; i< this.height;i++){
		for (var j = 0; j< this.width;j++){
			finished = (finished && this.block_map[i][j].value)
		}
	}
	return finished;
}

Canvas.prototype.reset = function(){
//reset the internal block and the UI display
		for(var i = 0; i<this.height;i++){
			for(var j = 0; j<this.width; j++){
			this.block_map[i][j].reset();}	
}
}


//input the dom and return the id of the neighboring in the array
function getNeighbor(cell_jdom){
	 var position = cell_jdom.attr('id').substring(1,cell_jdom.attr('id').length).split('_');
	//position[0] and position[1] are the matrix location of the element
	 var row_id = parseInt(position[0]);
 	 var col_id = parseInt(position[1]); 
 	
 	 var up_id = "b" + (row_id-1) +"_" + col_id;
 	 var down_id = "b" + (row_id+1) +"_" + col_id;
 	 var left_id = "b" + row_id +"_" + (col_id-1);
	 var right_id = "b" + row_id +"_" + (col_id+1);

	 var neighbor_id = [];
	 //verify if all the neighbor exists;
	 if( document.getElementById(up_id)){neighbor_id.push(up_id)}
	 if( document.getElementById(down_id)){neighbor_id.push(down_id)}
	 if( document.getElementById(left_id)){neighbor_id.push(left_id)}
	 if( document.getElementById(right_id)){neighbor_id.push(right_id)}
	 return neighbor_id;
}

