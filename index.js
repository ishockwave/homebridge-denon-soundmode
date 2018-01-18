var Service, Characteristic;
var Denon = require('./lib/denon');
var inherits = require('util').inherits;
var pollingtoevent = require('polling-to-event');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-denon-soundmode', 'DenonSoundmode', DenonAVRAccessory);
};

function DenonAVRAccessory(log, config) {
  this.log = log;
	var that = this;

  this.config = config;
  this.ipAddr = config['ip'];
  this.name = config['name'];

  this.inputName = config['inputName'] || null;
  this.soundMode = config['soundMode'] || null;
	this.doPolling = config['doPolling'] || false;

  this.pollingInterval = config['pollingInterval'] || "60";
  this.pollingInterval = parseInt(this.pollingInterval)

  this.denon = new Denon(this.ipAddr);

	this.setAttempt = 0;
	this.state = false;
	if (this.interval < 10 && this.interval > 100000) {
		this.log("polling interval out of range.. disabled polling");
		this.doPolling = false;
	}

	// Status Polling
	if (this.doPolling) {
		that.log("start polling...");
		var statusemitter = pollingtoevent(function(done) {
			that.log("do poll..")
			that.getIsPlaying( function( error, response) {
        that.log("Response:"+response);
				done(error, response, this.setAttempt);
			});
		}, {longpolling:true,interval:that.pollingInterval * 1000,longpollEventName:"statuspoll"});

		statusemitter.on("statuspoll", function(data) {
			that.state = data;
			that.log("poll end, state: "+data);

			if (that.switchService ) {
				that.switchService.getCharacteristic(Characteristic.On).updateValue(that.state, null, "statuspoll");
			}
		});
	}
}

/**
 * Retrieves relevant States from receiver and checks with preconfigured values
 * @param callback
 */
DenonAVRAccessory.prototype.getIsPlaying = function (callback) {
  this.denon.getStates(function (err, retval) {
      if (err) {
          this.log('get InputName error: ' + err)
          callback(err);
      } else {
          callback(null, (retval.powerState = 'ON') && (retval.inputName.indexOf(this.inputName) >= 0) && (retval.soundMode.indexOf(this.soundMode) >= 0));
      }
  }.bind(this))
};

DenonAVRAccessory.prototype.getServices = function () {
    var informationService = new Service.AccessoryInformation();

    informationService
        .setCharacteristic(Characteristic.Name, this.name)
        .setCharacteristic(Characteristic.Manufacturer, this.type || 'Denon');

    this.switchService = new Service.Switch(this.name);
    this.switchService.getCharacteristic(Characteristic.On)
        .on('get', this.getIsPlaying.bind(this))
        .on('set', this.getIsPlaying.bind(this));

    return [informationService, this.switchService];
};
