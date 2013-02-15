<!DOCTYPE html>
<html>
<head>
<title>simulat8r</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js"></script>
<script type="text/javascript" src="../L8.simulator.js"></script>
<link rel="stylesheet" type="text/css" href="../simulator.css"/>

<script type="text/javascript">
function loadL8() {

	<?php for($i=0; $i<8; $i++) { ?>
		<?php for($j=0; $j<8; $j++) { ?>
			<?php $idx = $i*8 + $j; ?>
				// Formato: "#ff00ff"
				L8_set_pixel_color(<?php echo $idx ?>, "<?php echo $l8['led'.$i.$j] ?>");
		<?php } ?>
	<?php } ?>
	/*
	for (var i = 0; i < 64; i++) {
		//<?php echo $l8['token'] ?>
		L8_set_pixel_color(i, "#ff00ff");		
	}
	*/
}
</script>

</head>
<body>
<div id="L8_simulator_container">
	<div id="L8_simulator" ></div>
	
	<!-- 
	<div id="L8_start" > <input id="L8_btn_start" type="button" value=":: Start ::" class="preorder_button" style="display:none; padding-left:15px; margin-top:140px; margin-left:30px; height:60px; width:100px; " /> </div>
	
	<div id="L8_colorpicker_container">
		<div style="height:220px;">
			<div id="colorsHolder" style="float:left; width:190px; height:210px;">
				<div class="L8_color_box" title="White" rel="#ffffff"></div>
				<div class="L8_color_box" title="Red" rel="#ff0000"></div>
				<div class="L8_color_box" title="Light Red" rel="#ff8888"></div>
				<div class="L8_color_box" title="Magenta" rel="#ff0088"></div>
				<div class="L8_color_box" title="Pink" rel="#ff00ff"></div>
				<div class="L8_color_box" title="Purple" rel="#8800ff"></div>
				<div class="L8_color_box" title="Dark purple" rel="#880088"></div>
				<div class="L8_color_box" title="Blue" rel="#0000ff"></div>
				<div class="L8_color_box" title="Light Blue" rel="#8888ff"></div>
				<div class="L8_color_box" title="Cyan" rel="#00ffff"></div>
				<div class="L8_color_box" title="Lime" rel="#00ff00"></div>
				<div class="L8_color_box" title="Olive Green" rel="#88ff00"></div>
				<div class="L8_color_box" title="Light Green" rel="#88ff88"></div>
				<div class="L8_color_box" title="Yellow" rel="#ffff00"></div>
				<div class="L8_color_box" title="Light Yellow" rel="#ffff88"></div>
				<div class="L8_color_box" title="Orange" rel="#ff8800"></div>
				<div class="L8_color_box" title="Gray 75%" rel="#cccccc"></div>
				<div class="L8_color_box" title="Gray 50%" rel="#888888"></div>
				<div class="L8_color_box" title="Gray 25%" rel="#444444"></div>
				<div class="L8_color_box" title="Black (Off)" rel="#000000"></div>
			</div>
			<div id="farbasticHolder" style="float:right; width:195px;  height:210px;"></div>
			<div style="width:380px;">
					Current color: &nbsp; <input type="text" id="L8_current_color" value="#ff0000" style="width:250px;">
			</div>
		</div>
		
		<br><br>
		<input id="L8_btn_setAll" type="button" value="Set All" class="preorder_button" style="padding:2px; margin-right:5px; font-size:12px;" />
		<input id="L8_btn_clearAll" type="button" value="Clear All" class="preorder_button" style="padding:2px; margin-right:20px; font-size:12px;" />
		<input id="L8_btn_rand" type="button" value="Random" class="preorder_button" style="padding:2px; margin-right:20px; font-size:12px;" />
		<input id="L8_btn_setBackLed" type="button" value="Set back LED" class="preorder_button" style="padding:2px; margin-right:5px; font-size:12px;" />
		<input id="L8_btn_clearBackLed" type="button" value="Clear back LED" class="preorder_button" style="padding:2px; margin-right:5px; font-size:12px;"  />
		<br><br>
		<i>Pick a color and light the pixels!</i>
	</div>
	
	-->

</div>

</body>
</html>