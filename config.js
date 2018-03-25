/* Magic Mirror Config - Roberto Giungato (C) 2018
 *
 * MIT Licensed.
 *
 */

var config = {
	address: "0.0.0.0", // Address to listen on
	port: 8080,
	ipWhitelist: ["127.0.0.1", "10.0.0.0/24", "192.168.10.0/24", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	language: "it",
	timeFormat: 24,
	units: "metric",
	zoom: 1.2,
	modules: [
	    {
			module: 'MMM-pages',
			config: {
					modules:
						[[ "calendar_monthly", "weatherforecast", "newsfeed", "MMM-MQTT", "MMM-AirQuality"],
						[ "MMM-Globe", "MMM-Launch", "mmm-moon-phases", "MMM-SunRiseSet"],
						[ "MMM-Wunderlist-Enhanced"]
						],
					excludes: ["alert", "updatenotification", "clock", "currentweather", "MMM-page-indicator", "MMM-Buttons", "MMM-TelegramBot", "MMM-Remote-Control"],
					rotationTime: 15000
			}
		},
		{
			module: "alert",
		},
		{
			module: "MMM-Remote-Control"
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: 'MMM-Buttons',
			config: {
				buttons: [
					{
						pin: 5,
						name: "page_control",
						shortPress: {
							notification: "PAGE_INCREMENT"
						},
                        longPress: {
                            notification: "PAGE_INCREMENT"
                        },
					}
				]
			}
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				displayType: "both",
				timezone: "Europe/Rome",
				analogPlacement: "top"
			}
		},
/*		{
			module: 'MMM-Tools',
			position: 'bottom_left',
			config: {
				device : "RPI", 
				refresh_interval_ms : 10000,
				warning_interval_ms : 1000 * 60 * 5,
				enable_warning : true,
				warning : {
					CPU_TEMPERATURE : 65,
					GPU_TEMPERATURE : 65,
					CPU_USAGE : 75,
					STORAGE_USED_PERCENT : 80,
					MEMORY_USED_PERCENT : 80
				}
			}
		},
*/
		{
		module: 'MMM-Globe',
		position: 'top_center',
			config: {
				style: 'europeDiscNat',
				imageSize: 300,
				ownImagePath:'',
				updateInterval: 10*60*1000
			}
		},
		{
			module: "calendar_monthly",
			position: "top_left",
			config: {
					showHeader: true
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			header: "Situazione meteo",
			config: {
				location: "Torino",
				locationID: "3165524",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: ""
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Previsioni meteo",
			config: {
                        	fadePoint: 1,
				location: "Torino",
				locationID: "3165524",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: ""
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Repubblica Homepage",
						url: "http://www.repubblica.it/rss/homepage/rss2.0.xml"
					},
					{
						title: "Repubblica Tecnologia",
						url: "http://www.repubblica.it/rss/tecnologia/rss2.0.xml"
					},
					{
						title: "La Stampa Tecnologia",
						url: "http://feed.lastampa.it/tecnologia.rss"
					},
					{
						title: "Hacker News",
						url: "https://news.ycombinator.com/rss"
					},
					{
						title: "The Guardian - Europe",
						url: "https://www.theguardian.com/world/europe-news/rss"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
                {
                        module: 'MMM-MQTT',
                        position: 'top_center',
                        header: 'MQTT',
                        config: {
                                mqttUser: '',         // Leave out for no user
                                mqttPassword: '', // Leave out for no password
                                mqttServer: '',
                                subscriptions: [
                                        {
                                                topic: 'tele/sonoff/SENSOR',
                                                label: 'Salotto - Temperatura',
                                                decimals: 1,
						                                    jsonpointer: '/DHT11/Temperature',
						                                    suffix: '°C' 
                                        },
                                        {
                                                topic: 'tele/sonoff/SENSOR',
                                                label: 'Salotto - Umidit&agrave;',
                                                decimals: 1,
                                                jsonpointer: '/DHT11/Humidity',
                                                suffix: '%'
                                        },
                                        {
                                                topic: 'fv/irms',
                                                label: 'FotoVoltaico - IRMS',
                                                decimals: 0,
                                                suffix: 'A'
                                        },
                                       {
                                                topic: 'fv/realpower',
                                                label: 'FotoVoltaico - RealPower',
                                                decimals: 1,
                                                suffix: 'kW'
                                        },
					{
                                                topic: 'fv/temp',
                                                label: 'FotoVoltaico - Temperatura',
                                                decimals: 1,
                                                suffix: '°C'
                                        },
                                        {
                                                topic: '/vigna/temp',
                                                label: 'Vigna - Temperatura',
                                                decimals: 1,
                                                suffix: '°C'
                                        },
					{
                                                topic: '/vigna/umi',
                                                label: 'Vigna - Umidit&agrave; (aria)',
                                                decimals: 1,
                                                suffix: '%'
                                        },
                                        {
                                                topic: '/vigna/volt',
                                                label: 'Vigna - Volt batteria',
                                                decimals: 0,
                                                suffix: 'V'
                                        },
                                        {
                                                topic: '/vigna/soc',
                                                label: 'Vigna - Soc batteria',
                                                decimals: 0,
                                                suffix: '%'
                                        },
					{
                                                topic: '/ESP0/sensore1/Temperature',
                                                label: 'Orto - temperatura',
                                                decimals: 1,
                                                suffix: '°C'
                                        },
					{
                                                topic: '/ESP0/sensore1/Humidity',
                                                label: 'Orto - Umidit&agrave; (aria)',
                                                decimals: 1,
                                                suffix: '%'
                                        },
					{
                                                topic: '/ESP0/humG/Analog',
                                                label: 'Orto - Umidit&agrave; (terra)',
                                                decimals: 1,
                                                suffix: '%'
                                        },
                                        {
                                                topic: 'tele/sonoffPOW/SENSOR',
                                                label: 'Frigo - consumo inst.',
                                                decimals: 0,
                                                jsonpointer: '/ENERGY/Power',
                                                suffix: 'W'
                                        },
                                        {
                                                topic: 'tele/sonoffPOW/SENSOR',
                                                label: 'Frigo - consumo ieri',
                                                decimals: 2,
                                                jsonpointer: '/ENERGY/Yesterday',
                                                suffix: 'W/h'
                                        }
                                ]
                        }
        	},
		{
			module: 'MMM-page-indicator',
			position: 'bottom_bar',
			config: {
				pages: 3
			}
		},
		{
    			module: 'MMM-Launch',
    			position: 'top_right',               // Best in left or right region
    			config: {
				showPix: "Yes",                 // No = No picture
				showAgency: "Yes",              // No = Launch Agency not shown
				showDescription: "No",          // Yes = full description of mission under picture
				useHeader: false,               // false if you don't want a header
				header: "We have liftoff!",     // Any text you want. useHeader must be true
				maxWidth: "250px"
    			}
		},
		{
			disabled: false,
			module: "MMM-SunRiseSet",
			position: "top_center",
			config: {
        lat: "",      // Your latitude (for the data)
        lng: "",     // Your longitude (for the data)
				image: "map",          // "world" (animation), "map" (animation), "static" (graph)
				imageOnly: "no",       // no = all data, yes = only animated world or map
				dayOrNight: "night",   // "night" approaching, "day" approaching (imageOnly: must be "yes", image: must be "world") 
				useHeader: false,      // true if you want a header
				header: "Header",      // useHeader must be true
				maxWidth: "300px",
    			}
		},
		{
			module: 'MMM-AirQuality',
			position: 'top_right', // you may choose any location
			config: {
	  			location: 'italy/piemonte/torino/rebaudengo/' // the location to check the index for
			}
		},
		{
                	module: 'mmm-moon-phases',
                	header: 'Fase lunare',
                	position: 'bottom_left', 
                	config: {
                	}
        	},
		{
			module: 'MMM-Wunderlist-Enhanced',
			position: 'top_center',	// This can be any of the regions. Best results in left or right regions.
			header: 'Wunderlist', // This is optional
			config: {
                        	accessToken: "",  
                        	clientID: "",   
				fade: false,
				fadePoint: 1,
				spaced: true,
				iconPosition: "left",
               		        lists: ["inbox","Progetti", "Famiglia", "Spesa"]
			}
		}
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}

