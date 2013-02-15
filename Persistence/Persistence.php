<?php
namespace Persistence;
use \PDO;

class Persistence
{
	protected $db;
	
	public function __construct()
	{
		$this->db = new PDO('sqlite:Persistence/simulat8rs.db');
		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
				
		$this->db->exec(
			'create table if not exists simulat8r(
				token text primary key,
				led00 text default "#000000", led01 text default "#000000", led02 text default "#000000", led03 text default "#000000", led04 text default "#000000", led05 text default "#000000", led06 text default "#000000", led07 text default "#000000",
				led10 text default "#000000", led11 text default "#000000", led12 text default "#000000", led13 text default "#000000", led14 text default "#000000", led15 text default "#000000", led16 text default "#000000", led17 text default "#000000",
				led20 text default "#000000", led21 text default "#000000", led22 text default "#000000", led23 text default "#000000", led24 text default "#000000", led25 text default "#000000", led26 text default "#000000", led27 text default "#000000",
				led30 text default "#000000", led31 text default "#000000", led32 text default "#000000", led33 text default "#000000", led34 text default "#000000", led35 text default "#000000", led36 text default "#000000", led37 text default "#000000",
				led40 text default "#000000", led41 text default "#000000", led42 text default "#000000", led43 text default "#000000", led44 text default "#000000", led45 text default "#000000", led46 text default "#000000", led47 text default "#000000",
				led50 text default "#000000", led51 text default "#000000", led52 text default "#000000", led53 text default "#000000", led54 text default "#000000", led55 text default "#000000", led56 text default "#000000", led57 text default "#000000",
				led60 text default "#000000", led61 text default "#000000", led62 text default "#000000", led63 text default "#000000", led64 text default "#000000", led65 text default "#000000", led66 text default "#000000", led67 text default "#000000",
				led70 text default "#000000", led71 text default "#000000", led72 text default "#000000", led73 text default "#000000", led74 text default "#000000", led75 text default "#000000", led76 text default "#000000", led77 text default "#000000",
				proximity_sensor_enabled integer default 1, proximity_sensor_data real default 0,
				temperature_sensor_enabled integer default 1, temperature_sensor_data real default 0,
				noise_sensor_enabled integer default 1, noise_sensor_data real default 0,
				ambientlight_sensor_enabled integer default 1, ambientlight_sensor_data real default 0,
				acceleration_sensor_enabled integer default 1, acceleration_sensor_data real default 0,
				bluetooth_enabled integer default 1,
				battery_status real default 100
			)'
		);
	}

	public function createL8()
	{
		$token = md5(time().rand(0, 10000));
		$stmt = $this->db->prepare('insert into simulat8r(token) values (:token)');
		$stmt->execute(array(':token' => $token));
		return $token;
	}
	
	public function getL8($token)
	{
		$stmt = $this->db->prepare('select * from simulat8r where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetch();		
	}
		
	public function updateL8($token, $column, $value)
	{
		$column = $this->db->quote($column);
		$stmt = $this->db->prepare('update simulat8r set '.$column.' = :value where token = :token');
		$stmt->execute(array(':value' => $value, ':token' => $token));
	}
	
	public function readL8($token, $column)
	{
		$stmt = $this->db->prepare('select '.$column.' from simulat8r where token = :token');
		$stmt->execute(array(':token' => $token));
		return $stmt->fetchColumn();
	}
	
}