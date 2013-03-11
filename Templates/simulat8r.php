<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>simulat8r</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link href="../assets/css/bootstrap.css" rel="stylesheet">
    
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
    
    <style type="text/css">
      body {
        padding-top: 20px;
        padding-bottom: 40px;
      }

      /* Custom container */
      .container-narrow {
        margin: 0 auto;
        max-width: 960px;
      }
      .container-narrow > hr {
        margin: 30px 0;
      }

      
    </style>
    <link href="../assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
    <![endif]-->

  </head>

  <body>

    <div class="container-narrow">

      <div class="masthead">
        <h3 class="muted"><img src="../assets/img/L8smartlight.png"></h3>
       	<form class="form-horizontal">
          	<button class="btn" type="button" onclick="refreshStatus();">Refresh status</button>
        </form>        
      </div>

      <hr>
      
      <div class="row-fluid">
        <div class="span4">
            <span class="label label">L8 id</span> <?php echo $l8['token']; ?>
        </div>
        <div class="span4">
            <span class="label label-success">Hardware version</span> <?php echo $l8['hardware_version']; ?>
        </div>
        <div class="span4">
            <span class="label label-warning">Software version</span> <?php echo $l8['software_version']; ?>
        </div>        
      </div>
      <div class="row-fluid">        
        <div class="span4">
            <span class="label label-important">Memory size</span> <?php echo $l8['memory_size']; ?>
        </div>
        <div class="span4">
            <span class="label label-info">Free memory</span> <?php echo $l8['free_memory']; ?>
        </div>
        <div class="span4">
            <span class="label label-inverse">Battery status</span> <?php echo intval($l8['battery_status']); ?>
        </div>
      </div>
      <hr>
      <div class="row-fluid">
        
        <div class="span4">
          <div id="L8_simulator"></div>
        </div>

        <div class="span8">
        
          <form class="form-horizontal">
          
			<?php $enabled = ($l8['proximity_sensor_enabled'] == 1); ?>
            <div class="control-group">
              <label class="control-label" for="L8_proximity_sensor_data">Proximity</label>
              <div class="controls">
                <button id="L8_proximity_sensor_enabled" onclick="toggleProximitySensor()" class="btn<?php echo $enabled? ' btn-success' : ''; ?>" type="button"><?php echo $enabled? 'Enabled' : 'Disabled'; ?></button>
                <?php if ($enabled) { ?>
				<button id="L8_proximity_sensor_update" class="btn" onclick="updateProximitySensor()">Update</button>
				<?php } ?>                
                <input id="L8_proximity_sensor_data" type="text" placeholder="Proximity" class="span6" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['proximity_sensor_data'] : ''; ?>">
              </div>
            </div>
            
			<?php $enabled = ($l8['temperature_sensor_enabled'] == 1); ?>
            <div class="control-group">
              <label class="control-label" for="L8_temperature_sensor_data">Temperature</label>
              <div class="controls">
                <button id="L8_temperature_sensor_enabled" onclick="toggleTemperatureSensor()" class="btn<?php echo $enabled? ' btn-success' : ''; ?>" type="button"><?php echo $enabled? 'Enabled' : 'Disabled'; ?></button>
                <?php if ($enabled) { ?>
				<button id="L8_temperature_sensor_update" class="btn" onclick="updateTemperatureSensor()">Update</button>
				<?php } ?>                
                <input id="L8_temperature_sensor_data" type="text" placeholder="Temperature" class="span6" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['temperature_sensor_data'] : ''; ?>">
              </div>
            </div>
            
			<?php $enabled = ($l8['noise_sensor_enabled'] == 1); ?>
            <div class="control-group">
              <label class="control-label" for="L8_noise_sensor_data">Noise</label>
              <div class="controls">
                <button id="L8_noise_sensor_enabled" onclick="toggleNoiseSensor()" class="btn<?php echo $enabled? ' btn-success' : ''; ?>" type="button"><?php echo $enabled? 'Enabled' : 'Disabled'; ?></button>
                <?php if ($enabled) { ?>
				<button id="L8_noise_sensor_update" class="btn" onclick="updateNoiseSensor()">Update</button>
				<?php } ?>                
                <input id="L8_noise_sensor_data" type="text" placeholder="Noise" class="span6" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['noise_sensor_data'] : ''; ?>">
              </div>
            </div>
            
			<?php $enabled = ($l8['ambientlight_sensor_enabled'] == 1); ?>
            <div class="control-group">
              <label class="control-label" for="L8_ambientlight_sensor_data">Ambient Light</label>
              <div class="controls">
                <button id="L8_ambientlight_sensor_enabled" onclick="toggleAmbientLightSensor()" class="btn<?php echo $enabled? ' btn-success' : ''; ?>" type="button"><?php echo $enabled? 'Enabled' : 'Disabled'; ?></button>
                <?php if ($enabled) { ?>
				<button id="L8_ambientlight_sensor_update" class="btn" onclick="updateAmbientLightSensor()">Update</button>
				<?php } ?>                
                <input id="L8_ambientlight_sensor_data" type="text" placeholder="Ambient Light" class="span6" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['ambientlight_sensor_data'] : ''; ?>">
              </div>
            </div>
            
			<?php $enabled = ($l8['acceleration_sensor_enabled'] == 1); ?>            
            <div class="control-group">
              <label class="control-label" for="L8_acceleration_sensor_enabled">Acceleration</label>
              <div class="controls">
                <button id="L8_acceleration_sensor_enabled" onclick="toggleAccelerationSensor()" class="btn<?php echo $enabled? ' btn-success' : ''; ?>" type="button"><?php echo $enabled? 'Enabled' : 'Disabled'; ?></button>
                <?php if ($enabled) { ?>
				<button id="L8_acceleration_sensor_update" class="btn" onclick="updateAccelerationSensor()">Update</button>
				<?php } ?>                              
              </div>
              <div class="controls controls-row">
                <input type="text" id="L8_acceleration_sensor_data_rawX" placeholder="X" class="span4" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['acceleration_sensor_data_rawX'] : ''; ?>">
                <input type="text" id="L8_acceleration_sensor_data_rawY" placeholder="Y" class="span4" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['acceleration_sensor_data_rawY'] : ''; ?>">
                <input type="text" id="L8_acceleration_sensor_data_rawZ" placeholder="Z" class="span4" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['acceleration_sensor_data_rawZ'] : ''; ?>">                
              </div>
              <div class="controls controls-row">
                <input type="text" id="L8_acceleration_sensor_data_shake" placeholder="Shake" class="span6" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['acceleration_sensor_data_shake'] : ''; ?>">
                <input type="text" id="L8_acceleration_sensor_data_orientation" placeholder="Orientation" class="span6" <?php echo $enabled? '' : 'disabled'; ?> value="<?php echo $enabled? $l8['acceleration_sensor_data_orientation'] : ''; ?>">
              </div>
            </div>

			<?php $enabled = ($l8['button'] == 1); ?>
            <div class="control-group">
              <label class="control-label" for="L8_button">Button</label>
              <div class="controls">
                <button id="L8_button_enabled" onclick="toggleButton()" class="btn<?php echo $enabled? ' btn-success' : ''; ?>" type="button"><?php echo $enabled? 'Enabled' : 'Disabled'; ?></button>
              </div>
            </div>
                        
          </form>
        </div>
      </div>

      <hr>

      <div class="footer">
        <p>&copy; L8 SmartLight</p>
      </div>

    </div> <!-- /container -->

    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/bootstrap-transition.js"></script>
    <script src="../assets/js/bootstrap-alert.js"></script>
    <script src="../assets/js/bootstrap-modal.js"></script>
    <script src="../assets/js/bootstrap-dropdown.js"></script>
    <script src="../assets/js/bootstrap-scrollspy.js"></script>
    <script src="../assets/js/bootstrap-tab.js"></script>
    <script src="../assets/js/bootstrap-tooltip.js"></script>
    <script src="../assets/js/bootstrap-popover.js"></script>
    <script src="../assets/js/bootstrap-button.js"></script>
    <script src="../assets/js/bootstrap-collapse.js"></script>
    <script src="../assets/js/bootstrap-carousel.js"></script>
    <script src="../assets/js/bootstrap-typeahead.js"></script>
    <script src="../assets/js/holder/holder.js"></script>

    <script src="../assets/js/raphael-min.js"></script>
    <script src="../assets/js/L8.simulator.js"></script>
    
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
		updateL8({proximity_sensor_enabled: <?php echo $l8['proximity_sensor_enabled'] == 1? 'false' : 'true'; ?>});
	}
	
	function updateTemperatureSensor() {
		updateL8({temperature_sensor_data: $(L8_temperature_sensor_data).val()});
	}
	
	function toggleTemperatureSensor() {
		updateL8({temperature_sensor_enabled: <?php echo $l8['temperature_sensor_enabled'] == 1? 'false' : 'true'; ?>});
	}
	
	function updateNoiseSensor() {
		updateL8({noise_sensor_data: $(L8_noise_sensor_data).val()});
	}
	
	function toggleNoiseSensor() {
		updateL8({noise_sensor_enabled: <?php echo $l8['noise_sensor_enabled'] == 1? 'false' : 'true'; ?>});
	}
	
	function updateAmbientLightSensor() {
		updateL8({ambientlight_sensor_data: $(L8_ambientlight_sensor_data).val()});
	}
	
	function toggleAmbientLightSensor() {
		updateL8({ambientlight_sensor_enabled: <?php echo $l8['ambientlight_sensor_enabled'] == 1? 'false' : 'true'; ?>});
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
		updateL8({acceleration_sensor_enabled: <?php echo $l8['acceleration_sensor_enabled'] == 1? 'false' : 'true'; ?>});
	}
	
	function toggleButton() {
		updateL8({button: <?php echo $l8['button'] == 1? 'false' : 'true'; ?>});
	}
	
	</script>    

  </body>
</html>