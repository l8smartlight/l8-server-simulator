
// Defines
var L8_w = 300;
var L8_corner_r;
var L8_canvas_margin;
var L8_canvas_w;
var L8_px_w;   //    w = (8 * px_w) + (9 * fr_w)        px_w = 3 * p_w
var L8_fr_w;
var L8_px_r;
var L8_px_glow;

var L8_off_color = "#000000";
var L8_selected_color="#ff0000";

var farb;


// Elements vars
var paper;

var L8_simulator;
var L8_pixel;
var L8_pixel_shine;

var L8_FB_user_name = ""
var L8_FB_userID = "";

var img_str = "#6dffff-#71ffff-#68fdff-#ffffff-#57f8ff-#55ecff-#50ecff-#4febff-#ffffff-#d2ffff-#ffffff-#81ffff-#78f8ff-#5beeff-#55eaff-#d3ffff-#328cff-#328aff-#5ee3ff-#3d91ff-#44edff-#39d7ff-#35d4ff-#4a8fff-#787d78-#788278-#787878-#788678-#787a78-#92a478-#819578-#787a78-#7f9e7e-#8baf8b-#7d9b7f-#8eb387-#71925d-#7c9b62-#85ad55-#8da85b-#ffffff-#f1ffff-#ffffff-#6ffaff-#faffff-#60f9ff-#65f6ff-#eaffff-#64f7ff-#84ffff-#6af6ff-#feffff-#73f9ff-#5cebff-#6ee7ff-#6adff3-#9ff950-#98fc67-#7b9b58-#8ebd78-#7cd266-#8fae5e-#99f750-#a3f750";

// Anim8tor
var numFrames = 7;
var frames_array = new Array(); 


$(document).ready(function() {

	// Init L8 Simulator
	L8_Init();
	
	
	var userAgent = navigator.userAgent;
	
	
		// Init color-picker for not ipad devices
		
		
		if( $('#colorpickerHolder').length )
		{
			$('#colorpickerHolder').ColorPicker({
											flat: true,
											color: L8_selected_color,
											onChange:function(hsb, hex, rgb, el) {
													L8_selected_color = "#"+hex;
													},
											onSubmit:function(hsb, hex, rgb, el) {
													L8_selected_color = "#"+hex;
													}
											});
		}
		else if( $('#farbasticHolder').length )
		{
			farb = $.farbtastic('#farbasticHolder', '#L8_current_color');
		}
		
			
		// Init basic color boxes
		$(".L8_color_box").each( function() {
				$(this).css("background-color", $(this).attr("rel") );	
			});
		
		$(".L8_color_box").click( function() {
				L8_selected_color = $(this).attr("rel");
				
				if( $('#colorpickerHolder').length )
				{
					$('#colorpickerHolder').ColorPickerSetColor(L8_selected_color);
				}
				else if( $('#farbasticHolder').length )
				{
					farb.setColor(L8_selected_color);
				}
				
				
				if( $('#L8_current_color') )
				{
					$('#L8_current_color').css("background-color", L8_selected_color);
					$('#L8_current_color').val(L8_selected_color);
				}
			});
			
			
		$('#farbasticHolder').mouseup( function() {
				
				L8_selected_color = farb.color; 
				});
	
		/*$('#L8_current_color').change( function() {
				var color = $('#L8_current_color').val();
				color = color.replace("#", "");
				if( color.length == 5 ) color = "0" + color;
				else if( color.length == 4 ) color = "00" + color;
				else if( color.length == 3 ) color = "000" + color;
				else if( color.length == 2 ) color = "0000" + color;
				else if( color.length == 1 ) color = "00000" + color;
				else if( color.length == 0 ) color = "000000";
				L8_selected_color = "#" + color;
				
				$('#L8_current_color').css("background-color", L8_selected_color);
				
				$('#L8_current_color').val(L8_selected_color);
				
			});*/
			
			$('#L8_current_color').keyup( function() {
				
				var strValidChars = "0123456789abcdefABCDEF#";
				var strChar;
			
				var color = $('#L8_current_color').val();
				strChar = color[color.length-1];
				
				if( strValidChars.indexOf(strChar) == -1)
				{
					$('#L8_current_color').val(color.substring(0, color.length-1));
					color = $('#L8_current_color').val();
				}
				
				
				if( color[0] != "#" ) $('#L8_current_color').val( "#" + color ); 
				else color = color.substring(1);
				
				if( color.length == 6 )
				{
					L8_selected_color = "#" + color;
					$('#L8_current_color').css("background-color", L8_selected_color);
				}
				else if( color.length == 3 )
				{
					L8_selected_color = "#" + color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
					$('#L8_current_color').css("background-color", L8_selected_color);
				}
				/*
				if( color.length == 5 ) color = "#0" + color;
				else if( color.length == 4 ) color = "#00" + color;
				else if( color.length == 3 ) color = "#"+color[1]+color[1]+color[2]+color[2]+color[3]+color[3];
				else if( color.length == 2 ) color = "#0000" + color;
				else if( color.length == 1 ) color = "#00000" + color;
				else if( color.length == 0 ) color = "#000000";
				
				L8_selected_color = color;
								
				$('#L8_current_color').css("background-color", L8_selected_color);
				//$('#L8_current_color').val(L8_selected_color);
				*/
				
				return;
				
				
			});
			
			
	
		
	
	// We're in the SimuL8tor
	if( window.location.pathname.indexOf("anim8tor") == -1 )
	{
		L8_8x8_dir_popular("l8ty");
	}
	else
	{
		// We're in the Anim8tor
		
		L8_anim8tor_init();
		
		L8_8x8_dir_popular("anim8tion");
			
	}

	

	// Init Buttons
	$("#L8_btn_clearAll").click(function() {
			var i=0;
			L8_pixel.forEach(function (el) { L8_clear_pixel(i++);  });
			});
	
	$("#L8_btn_setAll").click(function() {
				var i=0;
				L8_pixel.forEach(function (el) { L8_set_pixel(i++, true) });
			});
			
	$("#L8_btn_LoadImage").click(function() {
				var colors = img_str.split('-');
				for(var i=0; i<64; i++)
				{
					L8_selected_color = colors[i];
					L8_set_pixel(i, true)
				}
					
			});
	
	$("#L8_btn_rand").click(function() {
			var i=0;
			L8_pixel.forEach(function (el) {L8_selected_color = "#"+ random_color();  L8_set_pixel(i++, true) });
			
			L8_selected_color = "#"+random_color();
			$("#L8_btn_setBackLed").click();
			
		});
		



	$("#L8_btn_setBackLed").click(function() {
			// Back LED glow
			if( L8_simulator.g) { L8_simulator.g.remove();   }
			if( L8_selected_color == L8_off_color ) return;
			
			L8_simulator.g = L8_simulator.glow({color:L8_selected_color, width:(L8_canvas_margin*2)});
		});
	$("#L8_btn_clearBackLed").click(function() {
			// Back LED glow
			if( L8_simulator.g) L8_simulator.g.remove();
		});
		
	
	$('#L8_btn_start').click( btn_start_click);
	
	$("#L8_btn_save").click(function() {			
		
			var blank_img = true;
			// Check if all colors are black
			L8_pixel.forEach(function (el) { if( el.attr('fill') != L8_off_color ) blank_img = false; });
			
			if( L8_simulator.g && L8_simulator.g[0].attr("stroke")  != L8_off_color ) blank_img = false; 
			
			if( blank_img )
			{
				alert("Please, draw a L8ty in the SimuL8tor  ;)");
				return;
			} 
			
			//if( $('#save_name').val() == "" && $('#save_tags').val() == "")
			//{
			//	alert("Please, enter a name and some tags for this im8  ;)");
			//	return;
			//}
			
			if( $('#save_name').val() == "" )
			{
				alert("Please, enter a name for this L8ty  ;)");
				return;
			}
			//if( $('#save_tags').val() == "" )
			//{
			//	alert("Please, enter some tags for this im8");
			//	return;
			//}
			
			
			var svg_XML_NoSpace = $("#L8_simulator").html();
			
			//convert svg to canvas
			canvg(document.getElementById("aux-canvas"), svg_XML_NoSpace, { 
				ignoreMouse: true, ignoreAnimation: true, 
				renderCallback: function () {
						 // Save canvas as image
						var oImgPNG = Canvas2Image.saveAsPNG(document.getElementById("aux-canvas"), true, 200, 200);  
					
						$('#div_new_img').html('<img src="'+oImgPNG.src+'" width="100" />');
						
						L8_Save(oImgPNG.src);
					 }
			} );

			
	
			});
			
		
	$("#L8_btn_save_anim").click(function() {
		
			var blank_img = true;
			
			// Check if all frames are black
			for(var i=0; i<numFrames; i++)
			{
				if( frames_array[i] ) { blank_img=false; break }
			}
					
			
			if( blank_img )
			{
				alert("Please, add some frames to your Anim8tion  ;)");
				return;
			} 
						
			
			if( $('#save_name').val() == "" )
			{
				alert("Please, enter a name for this Anim8tion  ;)");
				return;
			}
						
		 
			L8_Save_anim();	
	
		});
	
	loadL8();	
	
});

	
	var playing = 0;
	
	function L8_Play_next_frame()
	{
		if( play_status == "play" )
		{
			if( playing >= numFrames)
			{
				playing = 0;
			}
			
			var frame_delay = intval($("#sel_delay_"+ playing).val());
			setTimeout(L8_Play_next_frame, frame_delay);
			
			$(".div_frame").removeClass("div_frame_active");
			$("#div_frame_"+ playing).addClass("div_frame_active");
			
			$("#L8_player").html( $("#div_frame_"+ playing).html() );
			$("#L8_player img").width(340);
			$("#L8_player img").height(340);
			
			playing++;
			
			return;

		}
		else if( play_status == "stop" )
		{
			$(".div_frame").removeClass("div_frame_active");
			$("#L8_player").hide();
		}
	}
	
	function L8_load_frame(idx)
	{
		if( frames_array[idx] )
		{
			var colors = frames_array[idx];
			var info = colors.split('-');
			for(var i=0; i<64; i++)
			{
				if( info[i] == L8_off_color )
				{
					L8_clear_pixel(i);
				}
				else
				{
					L8_selected_color = info[i];
					L8_set_pixel(i, true);
				}
			}
			
			// Back LED
			if( info[64] && info[64] != L8_off_color )
			{
				L8_selected_color = info[64];
				$("#L8_btn_setBackLed").trigger('click');
			}
			else
				$("#L8_btn_clearBackLed").trigger('click');
					
		}
		else
		{
			// Clear simul8tor
			$("#L8_btn_clearAll").trigger('click');
			$("#L8_btn_clearBackLed").trigger('click');
		}
	}
	
	var play_status = "stop";
	
	function L8_anim8tor_init() {
	
		$("#L8_btn_play").click(function() {
			
			if( play_status == "stop" )
			{
				play_status = "play";
				$('#L8_btn_play').val(":: Stop ::");
				
				playing = 0;
				
				$("#L8_player").show();
				L8_Play_next_frame();
			}
			else if( play_status == "play" )
			{
				play_status = "stop";
				$('#L8_btn_play').val(":: Play > ::");
			}
			
		});
		
		
		$("#L8_btn_startAnim").click(function() {
			
			//numFrames = $("#L8_new_num_frames").val();
			
			$("#L8_timeline_frames").html("");
			
			for(var i=0; i<numFrames; i++)
			{
				var frame = '<div class="L8_lighty L8_lighty_frame">';
				frame += '<a id="set"><input type="button" value=" Set " title="Save L8ty to this frame" onclick="frame_save('+ i +');" /><span></span></a> ';
				frame += '<a id="get"><input type="button" value=" Get " title="Load this frame on the editor" onclick="frame_load('+ i +');" /><span></span></a> ';
				frame += '<a title="Frame '+ i +'" alt="" onclick="frame_click('+ i +');" style="margin:5px; cursor:default;"><div class="div_frame" id="div_frame_'+ i +'"><img src="L8_blank_200.png" height="100"></div></a>';
				frame += '<span>Duration:<br><select id="sel_delay_'+ i +'" class="L8_select_time"><option value="100">0,1 s</option><option selected value="200">0,2 s</option><option value="300">0,3 s</option><option value="400">0,4 s</option><option value="500">0,5 s</option><option value="700">0,7 s</option><option value="1000">1 s</option></select></span></div>';
				
				$("#L8_timeline_frames").html( $("#L8_timeline_frames").html() + frame);
			}
			
		
			var frame = '<div class="L8_lighty L8_add_f" style="vertical-align:top; padding-top:45px;">';
			frame += '<a href="javascript:void(0);" title="Add blank frame" onclick="L8_AddFrame();" ><img src="../images/L8_add_frame.png" ></a>';
			frame += '&nbsp;<a href="javascript:void(0);" title="Remove last frame" onclick="L8_RemoveFrame();" ><img src="../images/L8_remove_frame.png" ></a>';
			frame += '</div>';
			
			$("#L8_timeline_frames").html( $("#L8_timeline_frames").html() + frame);
			
			
		});
		
		
		$("#L8_btn_startAnim").trigger('click');
		
	}
	
	function L8_AddFrame()
	{
		$('#L8_timeline_frames .L8_add_f').remove();
		
		var frame = '<div class="L8_lighty L8_lighty_frame">';
		frame += '<a id="set"><input type="button" value=" Set " title="Save L8ty to this frame" onclick="frame_save('+ numFrames +');" /><span></span></a> ';
		frame += '<a id="get"><input type="button" value=" Get " title="Load this frame on the editor" onclick="frame_load('+ numFrames +');" /><span></span></a> ';
		frame += '<a title="Frame '+ numFrames +'" alt="" onclick="frame_click('+ numFrames +');" style="margin:5px; cursor:default;"><div class="div_frame" id="div_frame_'+ numFrames +'"><img src="L8_blank_200.png" height="100"></div></a>';
		frame += '<span>Duration:<br><select id="sel_delay_'+ numFrames +'" class="L8_select_time"><option value="100">0,1 s</option><option selected value="200">0,2 s</option><option value="300">0,3 s</option><option value="400">0,4 s</option><option value="500">0,5 s</option><option value="700">0,7 s</option><option value="1000">1 s</option></select></span></div>';
		
		numFrames++;
		 
		$("#L8_timeline_frames").html( $("#L8_timeline_frames").html() + frame);	 
		
		frame = '<div class="L8_lighty L8_add_f" style="vertical-align:top; padding-top:45px;">';
		frame += '<a href="javascript:void(0);" title="Add blank frame" onclick="L8_AddFrame();" ><img src="../images/L8_add_frame.png" ></a>';
		frame += '&nbsp;<a href="javascript:void(0);" title="Remove last frame" onclick="L8_RemoveFrame();" ><img src="../images/L8_remove_frame.png" ></a>';
		frame += '</div>';
				
		$("#L8_timeline_frames").html( $("#L8_timeline_frames").html() + frame);
				
	}
	
	function L8_RemoveFrame()
	{
		if( numFrames > 0 )
		{
			$('#L8_timeline_frames .L8_lighty_frame:last').remove();
		
			numFrames--;
		}
	}
	
	function frame_click(idx)
	{
	}
	
	function frame_load(idx)
	{
		L8_load_frame(idx);
	}
	
	function frame_save(idx)
	{
		var svg_XML_NoSpace = $("#L8_simulator").html();
			
		//convert svg to canvas
		canvg(document.getElementById("aux-canvas"), svg_XML_NoSpace, { 
			ignoreMouse: true, ignoreAnimation: true, 
			renderCallback: function () {
					 // Save canvas as image
					var oImgPNG = Canvas2Image.saveAsPNG(document.getElementById("aux-canvas"), true, 200, 200);  
				
					$('#div_frame_'+idx).html('<img src="'+oImgPNG.src+'" width="100" />');
					
					
					var current_colors = "";
					L8_pixel.forEach(function (el) {
										current_colors += el.attr("fill")+"-";
									 });
					
					 // Back led
					if( !L8_simulator.g || !L8_simulator.g[0].attr("stroke") )
						current_colors += L8_off_color; 
					else
						current_colors += L8_simulator.g[0].attr("stroke"); 
			
					frames_array[idx] = current_colors;
					
					//L8_Save(oImgPNG.src);
				 }
		} );

	}
	
	
	function btn_start_click() {	
			
			// If already visible, return
			
			if( $('#L8_div_save').is(":visible") ) return;
			
			// Don't clear current image, so you can edit an existing one
			// $("#L8_btn_clearBackLed").trigger('click');
			// $("#L8_btn_clearAll").trigger('click');
			
			$('#span_img_title').html( ' ' );
			$('#span_img_author').html( ' ' );
			$('#span_img_tags').html( ' ' );
			
			$('#save_name').val( '' );
			$('#save_tags').val( '' );
			$('#save_author').val( '' );
				
			$('#L8_div_share').hide();
			$('#L8_div_save').show();
	}
		
	function L8_FB_Init_Login(){

		if( typeof(FB) == "undefined" ){ setTimeout(L8_FB_Init_Login, 100); return; }

					FB.getLoginStatus(function(response) {
					
					  if (response.status === 'connected') {
						
							  $("#l8-fb-login").hide();
							   L8_FB_userID = FB._userID;

							  FB.api('/me', function(response) {
									$("#l8-fb-status").html( response.name + ' &middot; <a href="javascript:void(0)" onclick="L8_FB_hide();">Don\'t show</a>' );
									 L8_FB_user_name = response.name;
									 L8_FB_userID = response.id;
								});

						// the user is logged in and has authenticated your
						// app, and response.authResponse supplies
						// the user's ID, a valid access token, a signed
						// request, and the time the access token 
						// and signed request each expire
						var uid = response.authResponse.userID;
						var accessToken = response.authResponse.accessToken;
					  } else if (response.status === 'not_authorized') {
						// the user is logged in to Facebook, 
						// but has not authenticated your app
						$("#l8-fb-login").css("display", "inline-block");
					  } else {
						// the user isn't logged in to Facebook.
						$("#l8-fb-login").css("display", "inline-block");
					  }
					 });
	
			}
				
	
function L8_FB_hide()
{
	L8_FB_userID = "";
	L8_FB_user_name = "";
	$("#l8-fb-status").html('<a href="javascript:void(0);" onclick="L8_FB_Init_Login()">Connect with Facebook</a> ');
}
function L8_Init()
{
	// Init Dimensions:
	L8_corner_r = L8_w*0.025;
	L8_canvas_margin = 20;
	L8_canvas_w = L8_w + (L8_canvas_margin*2);
	L8_px_w = L8_w/11;   //    w = (8 * px_w) + (9 * fr_w)        px_w = 3 * p_w
	L8_fr_w = L8_px_w/3;
	L8_px_r = L8_px_w*0.2;
	L8_px_glow = L8_fr_w;


	// Init canvas
	if( paper ) paper.clear();
	
	paper = Raphael("L8_simulator", L8_canvas_w, L8_canvas_w);
	
	
	// Add colored background for GIF preview
	var fondo = paper.rect(0, 0, L8_canvas_w,L8_canvas_w, 0);
	fondo.attr({fill: "#333", stroke:0});
	
	// Init L8
	L8_simulator = paper.rect(L8_canvas_margin, L8_canvas_margin, L8_w, L8_w, L8_corner_r);
	L8_simulator.attr({fill: "#111"});
	
	L8_pixel = paper.set();
	L8_pixel_shine = paper.set();
	// Init L8 pixels
	for( var i=0; i<8; i++ )
	{
		for( var j=0; j<8; j++)
		{
			L8_pixel.push( paper.rect(L8_canvas_margin+L8_fr_w+j*(L8_fr_w+L8_px_w), L8_canvas_margin+L8_fr_w+i*(L8_fr_w+L8_px_w), L8_px_w, L8_px_w, L8_px_r) );
			L8_pixel_shine.push( paper.circle(L8_canvas_margin+L8_fr_w+j*(L8_fr_w+L8_px_w)+(L8_px_w/2), L8_canvas_margin+L8_fr_w+i*(L8_fr_w+L8_px_w)+(L8_px_w/2), L8_px_w/2-1) );
		}
	}
	
	var i=0;
	L8_pixel.forEach(function (el) {
						el.attr({fill: L8_off_color});
						el.data({'idx' : i++});
						el.click(function(){ L8_set_pixel(this.data('idx')); });
						el.mouseover( function(){ this.attr({stroke: L8_selected_color}); } );
						el.mouseout( function(){ this.attr({stroke: L8_off_color}); } );
						
					 });
	
	i=0;
	L8_pixel_shine.forEach(function (el) {
						el.attr({fill: L8_off_color, stroke : 0, "fill-opacity":0.1, opacity:0.1 });
						el.data({'idx' : i++});
						el.click(function(){ L8_set_pixel(this.data('idx')); });
						el.mouseover( function(){ L8_pixel[this.data('idx')].attr({stroke: L8_selected_color}); } );
						el.mouseout( function(){ L8_pixel[this.data('idx')].attr({stroke: L8_off_color}); } );
					 });
	
}


function L8_set_pixel(id, force)
{

	btn_start_click();
	
	if( !force && L8_pixel[id].attr('fill') != L8_off_color &&  L8_pixel[id].attr('fill') == L8_selected_color)
	{
		L8_clear_pixel(id);
		return;
	}
	if( L8_selected_color == L8_off_color )
	{
		L8_clear_pixel(id);
		return;
	}
	
	L8_pixel[id].attr({fill: L8_selected_color}); 
	if(L8_pixel[id].g) L8_pixel[id].g.remove();
	L8_pixel[id].g = L8_pixel[id].glow({color:L8_selected_color, width:L8_px_glow});
	L8_pixel_shine[id].attr({fill: "r#fff-"+L8_selected_color }); 
	//L8_pixel_shine[id].attr({fill: L8_selected_color}); 
}
function L8_clear_pixel(id){
	L8_pixel[id].attr({fill: L8_off_color}); 
	if(L8_pixel[id].g) L8_pixel[id].g.remove();
	L8_pixel_shine[id].attr({fill: L8_off_color}); 
}


function L8_Save_anim()
{

	$("#L8_div_save").hide();
	$("#L8_div_saving").show();
	
	var frames = "";
	
	var postData = {};
	
	postData['numFrames'] = numFrames;
	postData['title'] = base64_encode( $('#save_name').val() );
	postData['author_name'] = base64_encode( L8_FB_user_name );
	postData['author_fb_id'] = base64_encode( L8_FB_userID );
	postData['tags'] = base64_encode( $('#save_tags').val() );	
	
	for( var i=0; i<numFrames; i++ )
	{
		if( frames_array[i] )
		{
			frames += frames_array[i] + "**";
			var imgRawData = $("#div_frame_"+i+" img").attr("src");
			postData['thumb_'+i] = base64_encode( imgRawData );
		}
		else
		{
			frames += "blank**";
			postData['thumb_'+i] = "blank";
		}
		
		var frame_delay = intval($("#sel_delay_"+i).val());
		postData['delay_'+i] = frame_delay;
	}
		
	
	postData['frames'] =  base64_encode(frames);
	
	
	$.ajax({
		  type: "POST",
		  url: "ajax/L8_ajax_save_anim.php",
		  data : postData,
		  //data: { frames: base64_encode(frames), title : base64_encode( $('#save_name').val() ), author_name : base64_encode( L8_FB_user_name ), author_fb_id : base64_encode( L8_FB_userID ), tags : base64_encode( $('#save_tags').val() ), numFrames: numFrames, thumb: base64_encode( imgRawData ) }
		}).done(function( msg ) {
		
				var info = msg.split("-");
				var img_id = info[0].replace(" ", "");
				var img_dir = info[1];
				
				$('#div_new_img_url').html('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id);
				
				$('#span_img_title').html( $('#save_name').val() );
				$('#span_img_author').html( (L8_FB_user_name != "" ? L8_FB_user_name : "-" ) );
				$('#span_img_tags').html( $('#save_tags').val() );
				
						
				$('#div_new_img_url').html('http://www.l8smartlight.com/simul8tor/anim8tor?anim8tion='+img_id);
				
				$("#div_new_img").html( '<img src="img8x8/'+img_dir+'/f'+img_id+'_0.png" width="150" >' );
					
					
				
				// Facebook
				//$('#div_shares').html('Share your L8ty to push it into the Top Chart!!&nbsp;&nbsp;&nbsp;&nbsp;<a style="height:18px;" name="fb_share" type="button" share_url="'+'http://www.l8smartlight.com/simul8tor/?l8ty='+img_id+'" href="http://www.facebook.com/sharer.php?u=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) +'">Share on Facebook</a><script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"></script>');
				
				// Twitter
				//$('#div_shares').html( $('#div_shares').html() + '&nbsp;&nbsp;&nbsp;&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) + '&text='+urlencode(  $('#save_name').val() )+' in the SimuL8tor'+'&hashtags=L8,im8" style="width:130px; height:20px;"></iframe>');
				
				$('#L8_div_saving').hide();
				$('#L8_div_share').show();
				
				// Reload 8x8 images DIV
				L8_8x8_dir_popular("anim8tion");		
		
			});
}

function L8_Save(imgRawData)
{
	var current_colors = "";
	L8_pixel.forEach(function (el) {
						current_colors += el.attr("fill")+"-";
					 });
	
	 // Back led
	if( !L8_simulator.g || !L8_simulator.g[0].attr("stroke") )
		current_colors += L8_off_color; 
	else
		current_colors += L8_simulator.g[0].attr("stroke"); 
			
	
	// Save image in server
	$.ajax({
		  type: "POST",
		  url: "ajax/L8_ajax_save.php",
		  data: { colors: base64_encode(current_colors), title : base64_encode( $('#save_name').val() ), author_name : base64_encode( L8_FB_user_name ), author_fb_id : base64_encode( L8_FB_userID ), tags : base64_encode( $('#save_tags').val() ), imgData: base64_encode( imgRawData ) }
		}).done(function( msg ) {
			
				var img_id = msg;
				
				$('#div_new_img_url').html('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id);
				
				$('#span_img_title').html( $('#save_name').val() );
				$('#span_img_author').html( (L8_FB_user_name != "" ? L8_FB_user_name : "-" ) );
				$('#span_img_tags').html( $('#save_tags').val() );
				
				
				// Facebook
				//$('#div_shares').html('Share your L8ty to push it into the Top Chart!!&nbsp;&nbsp;&nbsp;&nbsp;<a style="height:18px;" name="fb_share" type="button" share_url="'+'http://www.l8smartlight.com/simul8tor/?l8ty='+img_id+'" href="http://www.facebook.com/sharer.php?u=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) +'">Share on Facebook</a><script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"></script>');
				
				// Twitter
				//$('#div_shares').html( $('#div_shares').html() + '&nbsp;&nbsp;&nbsp;&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) + '&text='+urlencode(  $('#save_name').val() )+' in the SimuL8tor'+'&hashtags=L8,im8" style="width:130px; height:20px;"></iframe>');
				
				
				// Facebook
				$('#div_shares').html('<div style="display:inline-block;">Share your L8ty!&nbsp;&nbsp;&nbsp;&nbsp;</div>');
				
				//$('#div_shares').html( $('#div_shares').html() + '<a style="height:18px;" target="_blank" href="http://www.facebook.com/sharer.php?u=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) +'">Share on Facebook</a>');
				$('#div_shares').html( $('#div_shares').html() + '<a target="_blank" href="http://www.facebook.com/sharer.php?u=' + urlencode('http://www.l8smartlight.com/simul8tor/l8ties_competition?l8ty=' + img_id) + '"><div  class="L8_fb_share" style="display:inline-block; margin-top:1px; margin-right:10px"  ></div></a>' );
							
				
				// Twitter
				$('#div_shares').html( $('#div_shares').html() + '&nbsp;&nbsp;&nbsp;&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) + '&text='+urlencode( $('#save_name').val() )+' in the SimuL8tor'+'&hashtags=L8,L8Smartlight,L8ty" style="width:130px; height:20px;"></iframe>');
				
				$('#div_shares').html( $('#div_shares').html() + '<div style="display:inline-block;">&nbsp;&nbsp;&nbsp;Like it!&nbsp;&nbsp;&nbsp;&nbsp;</div>');
				$('#div_shares').html( $('#div_shares').html() + '<div style="display:inline-block;"><div class="fb-like" data-href="http://www.l8smartlight.com/simul8tor/?l8ty=' + img_id + '" data-send="false" data-layout="button_count" data-width="80" data-show-faces="false" data-colorscheme="light"></div></div>');
				
				//if( L8_FB_user_name != "" )
				//	$('#div_shares').html( $('#div_shares').html() + '<div style="display:inline-block;">&nbsp;&nbsp;&nbsp;<a href="l8ties_competition?l8ty='+ img_id +'" >View in the competition</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>');
				
				FB.XFBML.parse( document.getElementById('div_shares') );
					
					
					
				$('#L8_div_save').hide();
				$('#L8_div_share').show();
				
				// Reload 8x8 images DIV
				L8_8x8_dir_popular("l8ty");
		});
	
}



var temp_src;
function L8_anim_enter(id)
{
	temp_src = $("#img_th_"+id).attr("src");
	var dir = temp_src.split("/");
	var id2 = id; id2=id2.replace("_popular",""); id2 = id2.replace("_recent","");
	$("#img_th_"+id).attr("src" , "anim8tions/"+dir[1]+"/g"+id2+"_th1.gif");
	$("#vid_"+id).hide();
}
function L8_anim_leave(id)
{
	$("#img_th_"+id).attr("src" , temp_src);
	$("#vid_"+id).show();
}




function img_onclick(img_id)
{
		$.ajax({
		  type: "POST",
		  url: "ajax/L8_ajax_load.php",
		  data: { img_id: img_id }
		}).done(function( msg ) {
				var info = msg.split('-');
				if( info[0] == "l8ty" )
				{
				
					for(var i=1; i<65; i++)
					{
						if( info[i] == L8_off_color )
						{
							L8_clear_pixel( (i-1) );
						}
						else
						{
							L8_selected_color = info[i];
							L8_set_pixel( (i-1) , true);
						}
					}
					
					// Back LED
					if( info[65] && info[65] != L8_off_color )
					{
						L8_selected_color = info[65];
						$("#L8_btn_setBackLed").trigger('click');
					}
					else
						$("#L8_btn_clearBackLed").trigger('click');
						
						
					var img_name = base64_decode(info[66]);
					var img_author = base64_decode(info[67]);
					var img_tags = base64_decode(info[68]);
					var img_views = info[69];
					var img_author_fb_id = info[70];
					var img_id = info[71];
					var img_created = base64_decode(info[72]);
					var img_dir = info[73];
					
					if( img_author == "" ) img_author = "-";
					
					// Show image info: links, shares
					$('#span_img_title').html(img_name);
					
					if( img_author_fb_id == "" )
						$('#span_img_author').html(img_author);
					else
						$('#span_img_author').html('<a href="http://facebook.com/people/@/' + img_author_fb_id + '" target="_blank">' + img_author + '</a>');
						
					$('#span_img_tags').html(img_tags);
								
					$('#div_new_img').html('<img src="img8x8/'+img_dir+'/f'+img_id+'.png" width="100" /><br>'+img_views+' views');
					$('#div_new_img_url').html('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id);
							
					// Facebook
					$('#div_shares').html('<div style="display:inline-block;">Share this L8ty!&nbsp;&nbsp;&nbsp;&nbsp;</div>');
					
					//$('#div_shares').html( $('#div_shares').html() + '<a style="height:18px;" target="_blank" href="http://www.facebook.com/sharer.php?u=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) +'">Share on Facebook</a>');
					$('#div_shares').html( $('#div_shares').html() + '<a target="_blank" href="http://www.facebook.com/sharer.php?u=' + urlencode('http://www.l8smartlight.com/simul8tor/l8ties_competition?l8ty=' + img_id) + '"><div  class="L8_fb_share" style="display:inline-block; margin-top:1px; margin-right:10px"  ></div></a>' );
								
					
					// Twitter
					$('#div_shares').html( $('#div_shares').html() + '&nbsp;&nbsp;&nbsp;&nbsp;<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url=' + urlencode('http://www.l8smartlight.com/simul8tor/?l8ty='+img_id) + '&text='+urlencode(img_name)+' in the SimuL8tor'+'&hashtags=L8,L8Smartlight,L8ty" style="width:130px; height:20px;"></iframe>');
					
					$('#div_shares').html( $('#div_shares').html() + '<div style="display:inline-block;">&nbsp;&nbsp;&nbsp;Like it!&nbsp;&nbsp;&nbsp;&nbsp;</div>');
					$('#div_shares').html( $('#div_shares').html() + '<div style="display:inline-block;"><div class="fb-like" data-href="http://www.l8smartlight.com/simul8tor/?l8ty=' + img_id + '" data-send="false" data-layout="button_count" data-width="80" data-show-faces="false" data-colorscheme="light"></div></div>');
					
					//if( img_author_fb_id != "" )
					//	$('#div_shares').html( $('#div_shares').html() + '<div style="display:inline-block;">&nbsp;&nbsp;&nbsp;<a href="l8ties_competition?l8ty='+ img_id +'" >View in the competition</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>');
					
					
					if(FB) FB.XFBML.parse( document.getElementById('div_shares') );
					
					//Comments
					//$('#div_new_img_comments').html('<div id="div_comments" class="fb-comments" data-href="http://www.l8smartlight.com/simul8tor/?l8ty='+img_id+'" data-num-posts="2" data-width="345" data-colorscheme="dark"></div>');
					//$('#div_new_img_comments').html('<iframe src="http://www.facebook.com/plugins/comments.php?href=l8smartlight.com/simul8tor/?l8ty=' + img_id + '&permalink=1" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:130px; height:16px;" allowTransparency="true"></iframe>');
					//	$('#div_new_img_comments').html('<iframe src="http://www.facebook.com/plugins/comments.php?api_key=451640618182879&numposts=4&title=Social%20Plugin%20%E2%80%93%20Comments%20en%20iframe&href=l8smartlight.com/simul8tor/?l8ty=' + img_id + '" frameborder="0" allowtransparency="allowtransparency" scrolling="no" style="width:345px;"></iframe>');
				
					$('#L8_div_save').hide();
					$('#L8_div_share').show();
					
					//FB.XFBML.parse($('#div_comments'));

					
					L8_8x8_dir_popular("l8ty");
			
					// Scroll to the simuL8tor
					 $('html, body').animate({scrollTop:320}, 'slow');
				 
				}
				else
				{
					// Anim8tion
					var img_name = base64_decode(info[1]);
					var img_author = base64_decode(info[2]);
					var img_tags = base64_decode(info[3]);
					var img_views = info[4];
					var img_author_fb_id = info[5];
					var img_id = info[6];
					var img_created = base64_decode(info[7]);
					var img_dir = info[8];
					var img_num_frames = parseInt(info[9]);
					
					
					// Check if there are enough frames to load this anim.
					if( img_num_frames > numFrames )
					{
						// Add frames
						var add = img_num_frames-numFrames;
						for( var i=0; i<add; i++)
							L8_AddFrame();
					}
					else if( img_num_frames < numFrames )
					{
						// Remove frames
						var rem = numFrames-img_num_frames;
						for( var i=0; i<rem; i++)
							L8_RemoveFrame();
						
					}
					
					for(var i=0; i<img_num_frames; i++)
					{						
						var rawData = base64_decode(info[10+img_num_frames+i]);
						
						if( rawData == "blank" )
						{
							$('#div_frame_'+i).html('<img src="L8_blank_200.png" width="100" />');
						}
						else
						{
							frames_array[i] = base64_decode(info[10+i]);
							$('#div_frame_'+i).html('<img src="' + rawData + '" width="100" />');
						}
						
						$('#sel_delay_'+i).val(info[10+img_num_frames+img_num_frames+i]);
						
					}
					
					if( img_author == "" ) img_author = "-";
					
					// Show image info: links, shares
					$('#span_img_title').html(img_name);
					
					if( img_author_fb_id == "" )
						$('#span_img_author').html(img_author);
					else
						$('#span_img_author').html('<a href="http://facebook.com/people/@/' + img_author_fb_id + '" target="_blank">' + img_author + '</a>');
						
					$('#span_img_tags').html(img_tags);
					
					$('#div_new_img_url').html('http://www.l8smartlight.com/simul8tor/anim8tor?anim8tion='+img_id);
					
					$("#div_new_img").html( '<img src="img8x8/'+img_dir+'/f'+img_id+'_0.png" width="150" >' );
					
					$('#L8_div_saving').hide();
					$('#L8_div_save').hide();
					$('#L8_div_share').show();
					
				}
		});
}


function imgError(idx)
{
	$('#div_frame_'+idx).html('<img src="L8_blank_200.png" width="100" />');
}

function img_delete(img_id)
{
	if( !confirm( "Sure?") ) return;
	
		$.ajax({
		  type: "POST",
		  url: "ajax/L8_ajax_delete.php",
		  data: { img_id: img_id }
		}).done(function( msg ) {
			
			L8_8x8_dir_popular("l8ty");
			
		});
}


var L8_type = "";
function L8_8x8_dir_popular(type)
{
	L8_type = type;
	
	$.ajax({
		  type: "POST",
		  url: "ajax/L8_ajax_list.php",
		  data: { view: 18, sort: "popular", type:L8_type }
		}).done(function( msg ) {
				// Reload 8x8 images DIV
				$("#L8_img_popular").html( msg );

				// Now grab last uploaded
				L8_8x8_dir_last(L8_type);
		});
}

function L8_8x8_dir_last(type)
{
	$.ajax({
		  type: "POST",
		  url: "ajax/L8_ajax_list.php",
		  data: { view:18, sort: "recent" ,  type:type}
		}).done(function( msg ) {
				// Reload 8x8 images DIV
				$("#L8_img_last").html( msg );
				
				$(".L8_anim").mouseover( function() { L8_anim_enter( $(this).attr("alt") ) });
				$(".L8_anim").mouseout( function() { L8_anim_leave( $(this).attr("alt") ) });

		});
}


/*
function L8_get_image_url()
{
		$.ajax({
		  type: "POST",
		  url: "L8_ajax_download_img.php",
		   data: { img_url: $("#input_img_url").val() }
		}).done(function( msg ) {
				// Reload images DIV
				if( msg.indexOf("8x8") != -1 )
					L8_8x8_dir_popular("img8x8");
				else
					L8_8x8_dir_popular("../samples");
					
				$("#input_img_url").val("");				
		});
}
*/


function random_color()
{
    var text = "";
    var possible = "0123456789ABCDEF";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



function setMT(metaName, name, value) {
        var t = 'meta['+metaName+'='+name+']';
        var mt = $(t);
        if (mt.length === 0) {
            t = '<meta '+metaName+'="'+name+'" />';
            mt = $(t).appendTo('head');
        }
        mt.attr('content', value);
    }

function L8_set_pixel_color (id, newColor) {
	L8_pixel[id].attr({fill: newColor}); 
	if(L8_pixel[id].g) L8_pixel[id].g.remove();
	L8_pixel[id].g = L8_pixel[id].glow({color:newColor, width:L8_px_glow});
	L8_pixel_shine[id].attr({fill: "r#fff-"+newColor });	
}
