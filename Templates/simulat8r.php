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

<!-- 			
<meta http-equiv="refresh" content="<?php echo $refresh; ?>" />
 -->
 
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

function refreshStatus() {
	location.reload();	
}

function updateL8(value) {
	$.ajax({
	    url: window.location.pathname,
	    type: 'PUT',
	    contentType: 'application/json',
	    data: JSON.stringify(value),
	    dataType: 'json',
		success: function(result) {
			refreshStatus();
		}	    
	});	
}

function updateProximitySensor() {
	updateL8({proximity_sensor_data: $(L8_proximity_sensor_data).val()});
}

function toggleProximitySensor() {
	updateL8({proximity_sensor_enabled: ($(L8_proximity_sensor_enabled).val() == 'ENABLE')});
}

function updateTemperatureSensor() {
	updateL8({temperature_sensor_data: $(L8_temperature_sensor_data).val()});
}

function toggleTemperatureSensor() {
	updateL8({temperature_sensor_enabled: ($(L8_temperature_sensor_enabled).val() == 'ENABLE')});
}

function updateNoiseSensor() {
	updateL8({noise_sensor_data: $(L8_noise_sensor_data).val()});
}

function toggleNoiseSensor() {
	updateL8({noise_sensor_enabled: ($(L8_noise_sensor_enabled).val() == 'ENABLE')});
}

function updateAmbientLightSensor() {
	updateL8({ambientlight_sensor_data: $(L8_ambientlight_sensor_data).val()});
}

function toggleAmbientLightSensor() {
	updateL8({ambientlight_sensor_enabled: ($(L8_ambientlight_sensor_enabled).val() == 'ENABLE')});
}

function updateAccelerationSensor() {
	updateL8({
		acceleration_sensor_data_rawX: $(L8_acceleration_sensor_data_rawX).val(),
		acceleration_sensor_data_rawY: $(L8_acceleration_sensor_data_rawY).val(),
		acceleration_sensor_data_rawZ: $(L8_acceleration_sensor_data_rawZ).val(),
		acceleration_sensor_data_shake: $(L8_acceleration_sensor_data_shake).val(),
		acceleration_sensor_data_orientation: $(L8_acceleration_sensor_data_orientation).val()
	});
}

function toggleAccelerationSensor() {
	updateL8({acceleration_sensor_enabled: ($(L8_acceleration_sensor_enabled).val() == 'ENABLE')});
}

function toggleButton() {
	updateL8({button: ($(L8_button).val() == 'ENABLE')});
}

</script>

</head>
<body>
<div id="L8_simulator_container">
	<div id="L8_player" style="display:none; width:340px; height:340px; position:absolute;  left:20px; z-index:1000; top:20px; background-color:#333;" ></div>
	<div id="L8_simulator"></div>
	
	<div id="L8_status">
	
		<input type="button" id="L8_refresh" value="REFRESH STATUS" onclick="refreshStatus();"/>
		
		<div id="L8_id">L8 ID: <?php echo $l8['token']; ?></div>
		<div id="L8_hardware_version">Hardware version: <?php echo $l8['hardware_version']; ?></div>
		<div id="L8_software_version">Software version: <?php echo $l8['software_version']; ?></div>
		<div id="L8_memory size">Memory size: <?php echo $l8['memory_size']; ?></div>
		<div id="L8_free_memory">Free memory: <?php echo $l8['free_memory']; ?></div>
		<div id="L8_battery_status">Battery status: <?php echo intval($l8['battery_status']); ?></div>
		
		<div id="L8_proximity_sensor">
		PROXIMITY (<?php echo $l8['proximity_sensor_enabled'] == 0? 'DISABLED' : 'ENABLED'; ?>):
		<input type="button" id="L8_proximity_sensor_enabled" value="<?php echo $l8['proximity_sensor_enabled'] == 0? 'ENABLE' : 'DISABLE'; ?>" onclick="toggleProximitySensor()"/>
		<input type="text" id="L8_proximity_sensor_data" value="<?php echo $l8['proximity_sensor_data']; ?>"/>
		<input type="button" id="L8_proximity_sensor_update" value="UPDATE" onclick="updateProximitySensor()"/>
		</div>
		
		<div id="L8_temperature_sensor">
		TEMPERATURE (<?php echo $l8['temperature_sensor_enabled'] == 0? 'DISABLED' : 'ENABLED'; ?>):
		<input type="button" id="L8_temperature_sensor_enabled" value="<?php echo $l8['temperature_sensor_enabled'] == 0? 'ENABLE' : 'DISABLE'; ?>" onclick="toggleTemperatureSensor()"/>
		<input type="text" id="L8_temperature_sensor_data" value="<?php echo $l8['temperature_sensor_data']; ?>"/>
		<input type="button" id="L8_temperature_sensor_update" value="UPDATE" onclick="updateTemperatureSensor()"/>
		</div>
		
		<div id="L8_noise_sensor">
		NOISE (<?php echo $l8['noise_sensor_enabled'] == 0? 'DISABLED' : 'ENABLED'; ?>): 
		<input type="button" id="L8_noise_sensor_enabled" value="<?php echo $l8['noise_sensor_enabled'] == 0? 'ENABLE' : 'DISABLE'; ?>" onclick="toggleNoiseSensor()"/>
		<input type="text" id="L8_noise_sensor_data" value="<?php echo $l8['noise_sensor_data']; ?>"/>
		<input type="button" id="L8_noise_sensor_update" value="UPDATE" onclick="updateNoiseSensor()"/>
		</div>
		
		<div id="L8_ambientlight_sensor">
		AMBIENT LIGHT (<?php echo $l8['ambientlight_sensor_enabled'] == 0? 'DISABLED' : 'ENABLED'; ?>): 
		<input type="button" id="L8_ambientlight_sensor_enabled" value="<?php echo $l8['ambientlight_sensor_enabled'] == 0? 'ENABLE' : 'DISABLE'; ?>" onclick="toggleAmbientLightSensor()"/>
		<input type="text" id="L8_ambientlight_sensor_data" value="<?php echo $l8['ambientlight_sensor_data']; ?>"/>
		<input type="button" id="L8_ambientlight_sensor_update" value="UPDATE" onclick="updateAmbientLightSensor()"/>
		</div>
		
		<div id="L8_acceleration_sensor">
		ACCELERATION (<?php echo $l8['acceleration_sensor_enabled'] == 0? 'DISABLED' : 'ENABLED'; ?>): 
		<input type="button" id="L8_acceleration_sensor_enabled" value="<?php echo $l8['acceleration_sensor_enabled'] == 0? 'ENABLE' : 'DISABLE'; ?>" onclick="toggleAccelerationSensor()"/>
		RawX: <input type="text" id="L8_acceleration_sensor_data_rawX" value="<?php echo $l8['acceleration_sensor_data_rawX']; ?>"/>
		RawY: <input type="text" id="L8_acceleration_sensor_data_rawY" value="<?php echo $l8['acceleration_sensor_data_rawY']; ?>"/>
		RawZ: <input type="text" id="L8_acceleration_sensor_data_rawZ" value="<?php echo $l8['acceleration_sensor_data_rawZ']; ?>"/>
		Shake: <input type="text" id="L8_acceleration_sensor_data_shake" value="<?php echo $l8['acceleration_sensor_data_shake']; ?>"/>
		Orientation: <input type="text" id="L8_acceleration_sensor_data_orientation" value="<?php echo $l8['acceleration_sensor_data_orientation']; ?>"/>
		<input type="button" id="L8_acceleration_sensor_update" value="UPDATE" onclick="updateAccelerationSensor()"/>
		</div>
		
		<div id="L8_button_div">
		BUTTON (<?php echo $l8['button'] == 0? 'DISABLED' : 'ENABLED'; ?>):
		<input type="button" id="L8_button" value="<?php echo $l8['button'] == 0? 'ENABLE' : 'DISABLE'; ?>" onclick="toggleButton()"/>
		</div>

	</div>
	
</div>

</body>
</html>