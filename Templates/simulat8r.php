<!DOCTYPE html>
<html>
<head>
<title>simulat8r</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js"></script>
<script type="text/javascript" src="../js/L8.simulator.js"></script>
<link rel="stylesheet" type="text/css" href="../css/simulator.css"/>

<?php 
$refresh = 0;
if ($l8['frame0'] != '') { // is anim8tion
	for ($i = 0; $i < 8; $i++) {
		if ($l8['frame'.$i.'_duration'] != 0) {
			$refresh += $l8['frame'.$i.'_duration'];
		}
	}
	$refresh = ($refresh/1000 + 1)*3;
} else {
	$refresh = 3;
}
?>
			
<meta http-equiv="refresh" content="<?php echo $refresh; ?>" />

<script type="text/javascript">

function L8_load_light() {
	<?php if ($l8['frame0'] != '') { // is anim8tion ?>
		<?php for ($i = 0; $i < 8; $i++) { ?>
			<?php if ($l8['frame'.$i.'_duration'] != 0) { ?>
			frames_array[frames_array.length] = "<?php echo $l8['frame'.$i]; ?>";
			frames_duration_array[frames_duration_array.length] = <?php echo $l8['frame'.$i.'_duration']; ?>;
			<?php } ?>
		<?php } ?>
		L8_anim8tor_play();
	<?php } else { // is l8ty ?>
		<?php for ($i = 0; $i < 8; $i++) { ?>
			<?php for ($j = 0; $j < 8; $j++) { ?>
				<?php $idx = $i*8 + $j; ?>	L8_set_pixel_color(<?php echo $idx ?>, "<?php echo $l8['led'.$i.$j] ?>");
			<?php } ?>
		<?php } ?>
	<?php } ?>

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