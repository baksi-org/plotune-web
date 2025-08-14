// Mock extensions data
const extensionsData = [
    {
        "name": "Simple Reader",
        "id": "simple_reader",
        "version": "1.0.0",
        "description": "Reads table data from CSV files with advanced parsing capabilities.",
        "mode":"hybrid",
        "author": "Plotune Official",
        "os":"Windows, Linux, macOS",
        "cmd": [
            "python",
            "__main__.py"
        ],
        "enabled": true,
        "last_updated": "2025-06-15",
        "git_path": "https://github.com/plotune/simple-reader",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": [
            "csv"
        ],
        "ask_form": false,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8105,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "file_path": {
                "type": "string",
                "description": "Path to CSV file",
                "default": ""
            }
        },
        "installed": true
    },
    {
        "name": "Advanced Plotter",
        "id": "advanced_plotter",
        "version": "2.3.1",
        "description": "Professional plotting tools with real-time visualization and customization.",
        "mode":"offline",
        "author": "Plotune Official",
        "os":"Windows, Linux, macOS",
        "cmd": [
            "python",
            "plotter.py"
        ],
        "enabled": false,
        "last_updated": "2025-07-22",
        "git_path": "https://github.com/plotune/advanced-plotter",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": [
            "csv",
            "json",
            "bin"
        ],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8200,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "plot_type": {
                "type": "select",
                "description": "Type of plot",
                "options": ["Line", "Scatter", "Bar", "Histogram"],
                "default": "Line"
            }
        },
        "installed": true
    },
    {
        "name": "CAN Bus Analyzer",
        "id": "can_analyzer",
        "version": "1.5.2",
        "description": "Connect to CAN bus devices and analyze communication in real-time.",
        "mode":"hybrid",
        "author": "Automotive Solutions",
        "os":"Linux",
        "cmd": [
            "python",
            "can_main.py"
        ],
        "enabled": true,
        "last_updated": "2025-05-30",
        "git_path": "https://github.com/automotive-solutions/can-analyzer",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": [
            "log",
            "csv"
        ],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8300,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "baud_rate": {
                "type": "number",
                "description": "CAN bus baud rate",
                "default": "500000"
            }
        },
        "installed": false
    },
    {
        "name": "3D Visualization",
        "id": "3d_visualizer",
        "version": "1.2.0",
        "description": "Create stunning 3D visualizations of complex datasets.",
        "mode":"offline",
        "author": "DataViz Pro",
        "os":"Windows, Linux",
        "cmd": [
            "python",
            "visualizer_3d.py"
        ],
        "enabled": false,
        "last_updated": "2025-08-01",
        "git_path": "https://github.com/dataviz-pro/3d-visualizer",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": [
            "csv",
            "json",
            "obj"
        ],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8400,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "resolution": {
                "type": "select",
                "description": "Render resolution",
                "options": ["Low", "Medium", "High", "Ultra"],
                "default": "Medium"
            }
        },
        "installed": false
    },
    {
        "name": "Bluetooth Sensor Hub",
        "id": "bluetooth_sensors",
        "version": "0.9.5",
        "description": "Connect to multiple Bluetooth sensors simultaneously and stream data.",
        "mode":"hybrid",
        "author": "IoT Devices Inc.",
        "os":"Windows, Linux, macOS",
        "cmd": [
            "python",
            "bt_hub.py"
        ],
        "enabled": true,
        "last_updated": "2025-07-15",
        "git_path": "https://github.com/iot-devices/bluetooth-sensor-hub",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": [
            "csv",
            "bin"
        ],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8500,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "device_limit": {
                "type": "number",
                "description": "Max connected devices",
                "default": "5"
            }
        },
        "installed": true
    },
    {
        "name": "AI Data Insights",
        "id": "ai_insights",
        "version": "2.0.0",
        "description": "AI-powered data analysis with automatic pattern detection and insights.",
        "mode":"offline",
        "author": "Neural Analytics",
        "os":"Windows, Linux",
        "cmd": [
            "python",
            "ai_insights.py"
        ],
        "enabled": false,
        "last_updated": "2025-08-10",
        "git_path": "https://github.com/neural-analytics/ai-insights",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": [
            "csv",
            "json",
            "parquet"
        ],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8600,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "analysis_depth": {
                "type": "select",
                "description": "AI analysis depth",
                "options": ["Basic", "Standard", "Advanced"],
                "default": "Standard"
            }
        },
        "installed": false
    },
	{
        "name": "Serial Data Logger",
        "id": "serial_logger",
        "version": "1.1.0",
        "description": "Log and visualize serial port data with customizable baud rates and protocols.",
        "mode": "hybrid",
        "author": "Plotune Official",
        "os": "Windows, Linux, macOS",
        "cmd": ["python", "serial_logger.py"],
        "enabled": true,
        "last_updated": "2025-08-20",
        "git_path": "https://github.com/plotune/serial-data-logger",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["csv", "txt"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8700,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "baud_rate": {
                "type": "number",
                "description": "Serial port baud rate",
                "default": "9600"
            }
        },
        "installed": true
    },
    {
        "name": "Time Series Analyzer",
        "id": "time_series_analyzer",
        "version": "1.4.2",
        "description": "Analyze and visualize time-series data with advanced forecasting tools.",
        "mode": "offline",
        "author": "Data Dynamics",
        "os": "Windows, macOS",
        "cmd": ["python", "time_series.py"],
        "enabled": false,
        "last_updated": "2025-07-30",
        "git_path": "https://github.com/data-dynamics/time-series-analyzer",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["csv", "json", "tsv"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8800,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "forecast_horizon": {
                "type": "number",
                "description": "Number of future periods to forecast",
                "default": "12"
            }
        },
        "installed": false
    },
    {
        "name": "MQTT Connector",
        "id": "mqtt_connector",
        "version": "1.0.3",
        "description": "Stream and visualize data from MQTT brokers for IoT applications.",
        "mode": "hybrid",
        "author": "IoT Solutions",
        "os": "Linux, macOS",
        "cmd": ["python", "mqtt_connect.py"],
        "enabled": true,
        "last_updated": "2025-06-25",
        "git_path": "https://github.com/iot-solutions/mqtt-connector",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["json", "csv"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 8900,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "broker_url": {
                "type": "string",
                "description": "MQTT broker URL",
                "default": "mqtt://localhost"
            }
        },
        "installed": true
    },
    {
        "name": "Heatmap Generator",
        "id": "heatmap_generator",
        "version": "2.0.1",
        "description": "Create interactive heatmaps for spatial and matrix data analysis.",
        "mode": "offline",
        "author": "VizTools",
        "os": "Windows, Linux, macOS",
        "cmd": ["python", "heatmap.py"],
        "enabled": false,
        "last_updated": "2025-08-05",
        "git_path": "https://github.com/viztools/heatmap-generator",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["csv", "json", "xlsx"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9000,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "color_scheme": {
                "type": "select",
                "description": "Heatmap color scheme",
                "options": ["Viridis", "Plasma", "Inferno", "Magma"],
                "default": "Viridis"
            }
        },
        "installed": false
    },
    {
        "name": "Database Connector",
        "id": "db_connector",
        "version": "1.3.0",
        "description": "Connect to SQL and NoSQL databases for real-time data extraction and visualization.",
        "mode": "hybrid",
        "author": "Plotune Official",
        "os": "Windows, Linux, macOS",
        "cmd": ["python", "db_connect.py"],
        "enabled": true,
        "last_updated": "2025-07-10",
        "git_path": "https://github.com/plotune/db-connector",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["sql", "json", "csv"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9100,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "db_type": {
                "type": "select",
                "description": "Database type",
                "options": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
                "default": "SQLite"
            }
        },
        "installed": true
    },
    {
        "name": "Signal Processor",
        "id": "signal_processor",
        "version": "1.8.0",
        "description": "Apply signal processing techniques like FFT and filtering to data streams.",
        "mode": "offline",
        "author": "SignalTech",
        "os": "Windows, Linux",
        "cmd": ["python", "signal_processor.py"],
        "enabled": false,
        "last_updated": "2025-08-12",
        "git_path": "https://github.com/signaltech/signal-processor",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["csv", "wav"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9200,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "filter_type": {
                "type": "select",
                "description": "Signal filter type",
                "options": ["Low-pass", "High-pass", "Band-pass"],
                "default": "Low-pass"
            }
        },
        "installed": false
    },
    {
        "name": "Network Traffic Monitor",
        "id": "network_monitor",
        "version": "1.0.5",
        "description": "Monitor and visualize network traffic with real-time packet analysis.",
        "mode": "hybrid",
        "author": "NetSec Solutions",
        "os": "Linux, macOS",
        "cmd": ["python", "network_monitor.py"],
        "enabled": true,
        "last_updated": "2025-06-10",
        "git_path": "https://github.com/netsec-solutions/network-monitor",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["pcap", "csv"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9300,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "interface": {
                "type": "string",
                "description": "Network interface name",
                "default": "eth0"
            }
        },
        "installed": true
    },
    {
        "name": "Geo Data Plotter",
        "id": "geo_plotter",
        "version": "1.2.3",
        "description": "Visualize geospatial data with interactive maps and coordinate plotting.",
        "mode": "offline",
        "author": "GeoViz",
        "os": "Windows, Linux, macOS",
        "cmd": ["python", "geo_plotter.py"],
        "enabled": false,
        "last_updated": "2025-08-15",
        "git_path": "https://github.com/geoviz/geo-data-plotter",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["geojson", "csv", "shp"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9400,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "map_style": {
                "type": "select",
                "description": "Map visualization style",
                "options": ["Satellite", "Roadmap", "Terrain"],
                "default": "Roadmap"
            }
        },
        "installed": false
    },
    {
        "name": "Data Cleaner",
        "id": "data_cleaner",
        "version": "1.1.1",
        "description": "Clean and preprocess datasets with automated outlier detection and normalization.",
        "mode": "hybrid",
        "author": "Plotune Official",
        "os": "Windows, Linux, macOS",
        "cmd": ["python", "data_cleaner.py"],
        "enabled": true,
        "last_updated": "2025-07-05",
        "git_path": "https://github.com/plotune/data-cleaner",
        "category": "Recorder",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["csv", "json", "xlsx"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9500,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "outlier_threshold": {
                "type": "number",
                "description": "Threshold for outlier detection",
                "default": "3"
            }
        },
        "installed": true
    },
    {
        "name": "Custom Script Runner",
        "id": "script_runner",
        "version": "1.0.0",
        "description": "Run custom Python scripts to process and visualize data within Plotune.",
        "mode": "offline",
        "author": "ScriptWorks",
        "os": "Windows, Linux, macOS",
        "cmd": ["python", "script_runner.py"],
        "enabled": false,
        "last_updated": "2025-08-08",
        "git_path": "https://github.com/scriptworks/custom-script-runner",
        "category": "Visualization",
        "post_url": "http://localhost:8000/api/extension_click",
        "file_formats": ["py", "csv"],
        "ask_form": true,
        "connection": {
            "ip": "127.0.0.1",
            "port": 9600,
            "target": "127.0.0.1",
            "target_port": 8000
        },
        "configuration": {
            "script_path": {
                "type": "string",
                "description": "Path to custom Python script",
                "default": ""
            }
        },
        "installed": false
    }
];