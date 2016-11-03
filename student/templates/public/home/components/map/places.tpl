<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
  <script src='//api.tiles.mapbox.com/mapbox.js/v1.3.1/mapbox.js'></script>
  <link href='//api.tiles.mapbox.com/mapbox.js/v1.3.1/mapbox.css' rel='stylesheet' />
  <!--[if lte IE 8]>
    <link href='//api.tiles.mapbox.com/mapbox.js/v1.3.1/mapbox.ie.css' rel='stylesheet' >
  <![endif]-->
  <style>
    body { margin:0; padding:0; }
    #map { position:absolute; top:0; bottom:0; width:100%; }
  </style>
</head>
<body>
<div id='map'></div>
<script type='text/javascript'>
	try {
		var map = L.mapbox.map('map', 'examples.map-uci7ul8p')
		.setView([40, -74.50], 9);
	}
	catch (e){}
</script>