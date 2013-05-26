<?php
namespace Persistence;
use \PDO;

class Persistence
{
	protected $db;
	
	public function __construct()
	{
		$this->db = new PDO('sqlite:Persistence/simul8tors.db');
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
				
		$this->db->exec(
			'create table if not exists simul8tor(
				token text primary key,
				superled text default "#000000",
				led00 text default "#000000", led01 text default "#000000", led02 text default "#000000", led03 text default "#000000", led04 text default "#000000", led05 text default "#000000", led06 text default "#000000", led07 text default "#000000",
				led10 text default "#000000", led11 text default "#000000", led12 text default "#000000", led13 text default "#000000", led14 text default "#000000", led15 text default "#000000", led16 text default "#000000", led17 text default "#000000",
				led20 text default "#000000", led21 text default "#000000", led22 text default "#000000", led23 text default "#000000", led24 text default "#000000", led25 text default "#000000", led26 text default "#000000", led27 text default "#000000",
				led30 text default "#000000", led31 text default "#000000", led32 text default "#000000", led33 text default "#000000", led34 text default "#000000", led35 text default "#000000", led36 text default "#000000", led37 text default "#000000",
				led40 text default "#000000", led41 text default "#000000", led42 text default "#000000", led43 text default "#000000", led44 text default "#000000", led45 text default "#000000", led46 text default "#000000", led47 text default "#000000",
				led50 text default "#000000", led51 text default "#000000", led52 text default "#000000", led53 text default "#000000", led54 text default "#000000", led55 text default "#000000", led56 text default "#000000", led57 text default "#000000",
				led60 text default "#000000", led61 text default "#000000", led62 text default "#000000", led63 text default "#000000", led64 text default "#000000", led65 text default "#000000", led66 text default "#000000", led67 text default "#000000",
				led70 text default "#000000", led71 text default "#000000", led72 text default "#000000", led73 text default "#000000", led74 text default "#000000", led75 text default "#000000", led76 text default "#000000", led77 text default "#000000",
				frame0 text default null,
				frame0_duration integer default 0,
				frame1 text default null,
				frame1_duration integer default 0,
				frame2 text default null,
				frame2_duration integer default 0,
				frame3 text default null,
				frame3_duration integer default 0,
				frame4 text default null,
				frame4_duration integer default 0,
				frame5 text default null,
				frame5_duration integer default 0,
				frame6 text default null,
				frame6_duration integer default 0,
				frame7 text default null,
				frame7_duration integer default 0,
				proximity_sensor_enabled integer default 1, proximity_sensor_data real default 0,
				temperature_sensor_enabled integer default 1, temperature_sensor_data real default 0,
				noise_sensor_enabled integer default 1, noise_sensor_data real default 0,
				ambientlight_sensor_enabled integer default 1, ambientlight_sensor_data real default 0,
				acceleration_sensor_enabled integer default 1, 
				acceleration_sensor_data_rawX real default 0, acceleration_sensor_data_rawY real default 0, acceleration_sensor_data_rawZ real default 0,
				acceleration_sensor_data_shake integer default 0, acceleration_sensor_data_orientation int default 0, 
				bluetooth_enabled integer default 1,
				battery_status real default 100,
				button integer default 0,
				memory_size integer default 100,
				free_memory integer default 100,
				software_version integer default 1,
				hardware_version integer default 1
			)'
		);
	}

	public function createL8()
	{
		$token = md5(time().rand(0, 10000));
		$stmt = $this->db->prepare('insert into simul8tor(token) values (:token)');
		$stmt->execute(array(':token' => $token));
		return $token;
	}
	
	public function getL8($token)
	{
		$stmt = $this->db->prepare('select * from simul8tor where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();		
	}
		
	public function updateL8($token, $column, $value)
	{
		$column = $this->db->quote($column);
		$stmt = $this->db->prepare('update simul8tor set '.$column.' = :value where token = :token');
		$stmt->execute(array(':value' => $value, ':token' => $token));
	}
	
	public function readL8($token, $column)
	{
		$stmt = $this->db->prepare('select '.$column.' from simul8tor where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetchColumn();
	}
	
	public function readL8Multiple($token, $columns)
	{
		$stmt = $this->db->prepare('select '.$columns.' from simul8tor where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();
	}
	
	public function readAcceleration($token)
	{
		$stmt = $this->db->prepare('
			select 
				acceleration_sensor_enabled, acceleration_sensor_data_rawX, acceleration_sensor_data_rawY, acceleration_sensor_data_rawZ,
				acceleration_sensor_data_shake, acceleration_sensor_data_orientation 
		 	from 
				simul8tor 
			where 
				token = :token
		');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();
	}
	
	public function readTemperature($token)
	{
		$result = $this->readL8Multiple($token, 'temperature_sensor_enabled, temperature_sensor_data as temperature_sensor_data_celsius');
		$result['temperature_sensor_data_fahrenheit'] = $result['temperature_sensor_data_celsius']; // TODO.
		return $result;
	}	
	
	public function readSensor($token, $sensor)
	{
		$result = $this->readL8Multiple($token, $sensor.'_sensor_enabled, '.$sensor.'_sensor_data');
		return $result;
	}
	
	public function readVersions($token)
	{
		$stmt = $this->db->prepare('
			select
				software_version, hardware_version 
		 	from 
				simul8tor 
			where 
				token = :token
		');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();
	}
	
	public function readSuperLED($token)
	{
		$stmt = $this->db->prepare('select superled from simul8tor where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();		
	}
	
	public function updateSuperLED($token, $value)
	{
		$stmt = $this->db->prepare('update simul8tor set superled = :value where token = :token');
		$stmt->execute(array(':value' => $value, ':token' => $token));
	}	
	
	public function readLED($token, $led)
	{
		$stmt = $this->db->prepare('select '.$led.' from simul8tor where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();		
	}
	
	public function readLEDs($token)
	{
		$stmt = $this->db->prepare('
			select 
				led00, led01, led02, led03, led04, led05, led06, led07,
				led10, led11, led12, led13, led14, led15, led16, led17,
				led20, led21, led22, led23, led24, led25, led26, led27,
				led30, led31, led32, led33, led34, led35, led36, led37,
				led40, led41, led42, led43, led44, led45, led46, led47,
				led50, led51, led52, led53, led54, led55, led56, led57,
				led60, led61, led62, led63, led64, led65, led66, led67,
				led70, led71, led72, led73, led74, led75, led76, led77
			from 
				simul8tor 
			where 
				token = :token'
		);
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();
	}	
	
}