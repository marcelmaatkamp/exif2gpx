var util = require('util');
var nmea = require('nmea-0183');
var fs = require( 'fs' );
var path = require( 'path' );
var ExifImage = require('exif').ExifImage;

var convict = require('convict');
var config = convict({
  log: {
    level: {
      doc: 'The winston log level',
      format: 'String',
      default: 'INFO',
      env: 'LOG_LEVEL'
    }
  },
  gpx: {
    dir: {
      doc: 'filename to read',
      format: 'String',
      default: "/images",
      env: 'GPX_DIRECTORY'
    }
  }
});

config.validate({allowed: 'strict'});
var log = require('winston');

fs.readdir(config.get("gpx.dir"), function( err, files){
  if(err) {
    log.error("Could not list the directory.",err);
    process.exit(1);
  } 

  files.forEach(function(file, index) {
    log.info(JSON.stringify(file));
    try {
      new ExifImage({image : config.get("gpx.dir") + "/" + file}, function (error, exifData) { 
        if (error) {
          log.error(error.message);
        } else { 
          log.info(JSON.stringify(exifData)); 
        }
      });
    } catch (error) {
      log.error(error.message);
    }
  });
});


