<!DOCTYPE html>
<html>
<head>
<title>simulat8r</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js"></script>
<script type="text/javascript" src="../js/L8.simulator.js"></script>
<link rel="stylesheet" type="text/css" href="../css/simulator.css"/>

<script type="text/javascript">

function L8_load_light() {
	// TODO: Si es animación cargar y lanzar, lanzarla, y si no load this light.
	// LEDs 
<?php for($i=0; $i<8; $i++) { ?>
<?php for($j=0; $j<8; $j++) { ?>
<?php $idx = $i*8 + $j; ?>	L8_set_pixel_color(<?php echo $idx ?>, "<?php echo $l8['led'.$i.$j] ?>");
<?php } ?>
<?php } ?>

	// El superLED siempre se muestra, tanto en L8ty como en Anim8tion:
	// superLED
	L8_set_backled_color("<?php echo $l8['superled']?>");
}
</script>

</head>
<body>
<div id="L8_simulator_container">
	<div id="L8_player" style="display:none; width:340px; height:340px; position:absolute;  left:20px; z-index:1000; top:20px; background-color:#333;" ></div>
	<div id="L8_simulator"></div>
</div>

</body>
</html>