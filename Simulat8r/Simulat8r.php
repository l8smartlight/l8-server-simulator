<?php
namespace Simulat8r;
use \SQLite3;

class Simulat8r
{
	protected static $instance;
	protected $db;

	private function __construct($settings = null)
	{	
		$this->db = new SQLite3('DB'.DIRECTORY_SEPARATOR.'simulat8rs.db');
		$this->db->exec('
			create table if not exists simulat8r(
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
	
	public static function getInstance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	
	public function create() 
	{
		$token = md5(time().rand(0, 10000)); 
		$this->db->exec('
			insert into 
				simulat8r
				(token) 
			values 
				(\''.$token.'\')
		');
		return $token;
	}
		
	public function update($token, $column, $value)
	{
		$this->db->exec('
			update
				simulat8r
			set
				'.$this->db->escapeString($column).' = \''.$this->db->escapeString($value).'\'
			where
				token = \''.$this->db->escapeString($token).'\'
		');
	}
	
	public function read($token, $column) 
	{
		return $this->db->querySingle('
			select
				'.$this->db->escapeString($column).'
			from
				simulat8r
			where
				token = \''.$this->db->escapeString($token).'\'				
		');	
	}
	
	public function getL8($token)
	{
		return $this->db->query('
			select
				*
			from
				simulat8r
			where
				token = \''.$this->db->escapeString($token).'\'
		')->fetchArray();
	}
	
}