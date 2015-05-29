var squaresize = 55,
	total = 12,
	boardheight= squaresize*(total+1),
	boardwidth= squaresize*(total+1)+10,
	wrapperheight= squaresize*(total+1)+30,
	wrapperwidth= squaresize*(total+1)+10;

module.exports = {
	total: total,
	squarestyles: function(r,c){
		return {
			bottom: (total*squaresize-r*squaresize)+"px",
			right: (total*squaresize-c*squaresize)+"px"
		};
	},
	wrapperstyles: {
		height:wrapperheight+"px",
		width:wrapperwidth+"px"
	},
	boardstyles: {
		height:boardheight+"px",
		width:boardwidth+"px"
	}
};