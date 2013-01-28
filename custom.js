// CUSTOM.js. Paperscript fun!

var triangles = new Array();

Triangle.prototype = {
	// Follows the mouse cursor.
	follow : function(a,b) {
		// Distance
		var d = Math.sqrt(Math.pow((b.x - a.x),2) + Math.pow((b.y - a.y),2));
		// Segment ratio
		var r = this.size/d;
		var newX = (r * b.x) + ((1 - r) * a.x);
		var newY = (r * b.y) + ((1 - r) * a.y);
		this.triPath.removeSegments();
		this.draw(new Point(newX,newY));
	},
	// Draws the triangle onto the canvas.
	draw : function(point) {
		this.triPath.add(point);
		this.triPath.add(point.rotate(120,this.center));
		this.triPath.add(point.rotate(240,this.center));
	}
}

function Triangle(size,x,y) {
	this.triPath = new Path();
	this.size = size;
	this.center = {x : x, y : y};
	this.pointer = {x : x, y : y + size}
	this.draw(new Point(this.pointer));
	this.triPath.closed = true;
	this.triPath.fillColor = '#f36666';
	triangles.push(this);
}

var canvas = document.getElementById('myCanvas');
var width = canvas.width;
var height = canvas.height;

for (var i = 30; i < width-30; i+= Math.random()*10+50) {
	for (var j = 30; j < height-30; j += Math.random()*10+50) {
		new Triangle(Math.random()*10+10,i,j);
	}
}

function onMouseMove(event) {
   	for (var i in triangles) {
   		var triangle = triangles[i];
   		triangle.follow(triangle.center,event.point);
   	}
}