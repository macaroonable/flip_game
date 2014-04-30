function Block(height_index,wid_index){
//block of the canvas
this.x = wid_index;
this.y = height_index;
this.id = "b" + height_index+"_"+wid_index;
this.value = false;
$("#div_row"+this.y).append($("<div></div>").attr("id",this.id).attr('class','div_cell normal_cell border_norm'));

}
Block.prototype.reset = function(){
	this.value = false;
	$("#"+this.id).attr('class','div_cell normal_cell border_norm');
}

Block.prototype.toggle = function(){
	this.value = !this.value;
	$("#"+this.id).toggleClass("normal_cell");
	$("#"+this.id).toggleClass("flipped_cell");
}