# driver-netatmo-weather

A driver for fetching data from netatmo weather station and indoor modules, make use of https://github.com/karbassi/netatmo

The data obtained from a base module, 2 internal additional modules and an outdoor module is below, you could use this to add additional data to the databox beyond what is done by the driver.

```
{
	"_id": "70:ee:50:12:84:aa",
	"cipher_id": "enc:16:emevozS2a4yCmgOg7CxnGZuosTpgb5LknTA9ivklxtp5SNTXK+EYP3wa/lQUJbgE",
	"last_status_store": 1508771227,
	"modules": [{
		"_id": "03:00:00:02:44:90",
		"type": "NAModule4",
		"last_message": 1508771227,
		"last_seen": 1508771227,
		"dashboard_data": {
			"time_utc": 1508771176,
			"Temperature": 22.8,
			"temp_trend": "stable",
			"Humidity": 51,
			"CO2": 530,
			"date_max_temp": 1508758580,
			"date_min_temp": 1508713668,
			"min_temp": 22.2,
			"max_temp": 23.1
		},
		"data_type": ["Temperature", "CO2", "Humidity"],
		"module_name": "Kitchen",
		"last_setup": 1434030084,
		"battery_vp": 4590,
		"battery_percent": 22,
		"rf_status": 41,
		"firmware": 44
	}, {
		"_id": "03:00:00:01:fd:4a",
		"type": "NAModule4",
		"last_message": 1508771220,
		"last_seen": 1508771176,
		"dashboard_data": {
			"time_utc": 1508771176,
			"Temperature": 22.6,
			"temp_trend": "stable",
			"Humidity": 52,
			"CO2": 610,
			"date_max_temp": 1508770612,
			"date_min_temp": 1508732945,
			"min_temp": 20.6,
			"max_temp": 22.6
		},
		"data_type": ["Temperature", "CO2", "Humidity"],
		"module_name": "Bathroom",
		"last_setup": 1432133063,
		"battery_vp": 4991,
		"battery_percent": 44,
		"rf_status": 66,
		"firmware": 44
	}, {
		"_id": "02:00:00:12:55:20",
		"type": "NAModule1",
		"last_message": 1508771227,
		"last_seen": 1508771227,
		"dashboard_data": {
			"time_utc": 1508771176,
			"Temperature": 16.5,
			"temp_trend": "stable",
			"Humidity": 81,
			"date_max_temp": 1508764673,
			"date_min_temp": 1508732073,
			"min_temp": 8.4,
			"max_temp": 16.7
		},
		"data_type": ["Temperature", "Humidity"],
		"module_name": "Outdoor",
		"last_setup": 1432132063,
		"battery_vp": 5040,
		"battery_percent": 60,
		"rf_status": 74,
		"firmware": 44
	}],
	"place": {
		"altitude": 34,
		"city": "Nottingham",
		"country": "GB",
		"timezone": "Europe/London",
		"location": [-1.187157, 52.953518]
	},
	"station_name": "MRL-Databox",
	"type": "NAMain",
	"dashboard_data": {
		"AbsolutePressure": 1008.9,
		"time_utc": 1508771213,
		"Noise": 37,
		"Temperature": 22.2,
		"temp_trend": "stable",
		"Humidity": 56,
		"Pressure": 1012.9,
		"pressure_trend": "stable",
		"CO2": 600,
		"date_max_temp": 1508763989,
		"date_min_temp": 1508713377,
		"min_temp": 21.5,
		"max_temp": 22.8
	},
	"data_type": ["Temperature", "CO2", "Humidity", "Noise", "Pressure"],
	"co2_calibrating": false,
	"date_setup": 1432132077,
	"last_setup": 1432132077,
	"module_name": "Living Room",
	"firmware": 124,
	"last_upgrade": 1440391246,
	"wifi_status": 26,
	"friend_users": []
}
```




