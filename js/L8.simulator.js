
// Defines
var L8_w = 300;
var L8_corner_r;
var L8_canvas_margin;
var L8_canvas_w;
var L8_px_w;
var L8_fr_w;
var L8_px_r;
var L8_px_glow;

var L8_off_color = "#000000";
var L8_selected_color="#ff0000";

var paper;

var L8_simulator;
var L8_pixel;
var L8_pixel_shine;

var playing;
var numFrames = 7;
var frames_array = new Array();  // @#@ <=== aquí meteríamos todos los frames en caso de que sea una animación
var frames_duration_array = new Array(); // @#@ <=== aquí meteremos la duración de cada frame.

$(document).ready(function() {
	// Init L8 Simulator
	L8_init();
	// Load this light:
	L8_load_light();	
});

function L8_play_next_frame() {
		
	if (play_status == "play") {
		if (playing >= numFrames) {
			playing = 0;
		}
			
		L8_load_frame(playing);
		var frame_delay = frames_duration_array[playing];
		setTimeout(L8_play_next_frame, frame_delay);
			
		$("#L8_player img").width(340);
		$("#L8_player img").height(340);
			
		playing++;
	}
	
}
	
function L8_load_frame(idx) {
		
	if (frames_array[idx]) {
		var colors = frames_array[idx];
		var info = colors.split('-');
		for (var i = 0; i < 64; i++) {
			if (info[i] == L8_off_color) {
				L8_clear_pixel(i);
			} else {
				L8_selected_color = info[i];
				L8_set_pixel(i, true);
			}
		}
	}
}
	
var play_status = "stop";
	
function L8_anim8tor_play() {
	play_status = "play";
	playing = 0;
	L8_play_next_frame();		
}
	
function L8_init() {
	
	L8_corner_r = L8_w*0.025;
	L8_canvas_margin = 20;
	L8_canvas_w = L8_w + (L8_canvas_margin*2);
	L8_px_w = L8_w/11;   //    w = (8 * px_w) + (9 * fr_w)        px_w = 3 * p_w
	L8_fr_w = L8_px_w/3;
	L8_px_r = L8_px_w*0.2;
	L8_px_glow = L8_fr_w;

	if( paper ) paper.clear();
	
	paper = Raphael("L8_simulator", L8_canvas_w, L8_canvas_w);
	
	var fondo = paper.rect(0, 0, L8_canvas_w,L8_canvas_w, 0);
	fondo.attr({fill: "#333", stroke:0});
	
	L8_simulator = paper.rect(L8_canvas_margin, L8_canvas_margin, L8_w, L8_w, L8_corner_r);
	L8_simulator.attr({fill: "#111"});
	
	L8_pixel = paper.set();
	L8_pixel_shine = paper.set();

	for (var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			L8_pixel.push(paper.rect(L8_canvas_margin+L8_fr_w+j*(L8_fr_w+L8_px_w), L8_canvas_margin+L8_fr_w+i*(L8_fr_w+L8_px_w), L8_px_w, L8_px_w, L8_px_r));
			L8_pixel_shine.push(paper.circle(L8_canvas_margin+L8_fr_w+j*(L8_fr_w+L8_px_w)+(L8_px_w/2), L8_canvas_margin+L8_fr_w+i*(L8_fr_w+L8_px_w)+(L8_px_w/2), L8_px_w/2-1));
		}
	}
	
	var i = 0;
	L8_pixel.forEach(function (el) {
		el.attr({fill: L8_off_color});
		el.data({'idx' : i++});
	});
	
	i = 0;
	L8_pixel_shine.forEach(function (el) {
		el.attr({fill: L8_off_color, stroke : 0, "fill-opacity":0.1, opacity:0.1 });
		el.data({'idx' : i++});
	});
	
}

function L8_set_pixel(id, force) {
	if (!force && L8_pixel[id].attr('fill') != L8_off_color &&  L8_pixel[id].attr('fill') == L8_selected_color) {
		L8_clear_pixel(id);
		return;
	}
	if (L8_selected_color == L8_off_color) {
		L8_clear_pixel(id);
		return;
	}
	L8_pixel[id].attr({fill: L8_selected_color}); 
	if(L8_pixel[id].g) L8_pixel[id].g.remove();
	L8_pixel[id].g = L8_pixel[id].glow({color:L8_selected_color, width:L8_px_glow});
	L8_pixel_shine[id].attr({fill: "r#fff-"+L8_selected_color }); 
}

function L8_clear_pixel(id) {
	L8_pixel[id].attr({fill: L8_off_color}); 
	if(L8_pixel[id].g) L8_pixel[id].g.remove();
	L8_pixel_shine[id].attr({fill: L8_off_color}); 
}

function L8_set_pixel_color(id, newColor) {
	L8_pixel[id].attr({fill: newColor}); 
	if(L8_pixel[id].g) L8_pixel[id].g.remove();
	L8_pixel[id].g = L8_pixel[id].glow({color:newColor, width:L8_px_glow});
	L8_pixel_shine[id].attr({fill: "r#fff-"+newColor });	
}

function L8_set_backled_color(newColor) {
	if( L8_simulator.g) { L8_simulator.g.remove();   }
	if( newColor == L8_off_color ) return;
	L8_simulator.g = L8_simulator.glow({color:newColor, width:(L8_canvas_margin*2)});
}
