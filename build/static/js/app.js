requirejs.config({
    "baseUrl": "static/js",
    "paths": {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min"
    }
});

requirejs(['main']);