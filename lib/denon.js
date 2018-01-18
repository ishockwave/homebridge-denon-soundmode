/**
  * created by ishockwave on 18.01.2018
  * helpers for Denon receiver
  */

var request = require('request');
var parseString = require('xml2js').parseString;

var Denon = function (ipAddr) {
  this.ip = ipAddr;
  this.status_url = '/goform/formMainZone_MainZoneXml.xml';
}

/**
 * Returns the current States
 * @param callback
 */
Denon.prototype.getStates = function (callback) {
    request.get('http://' + this.ip + this.status_url, function (error, response, body) {
        var xml = '';
        if (!error && response.statusCode === 200) {
            parseString(xml + body, function (err, result) {
                callback(null, {
                    soundMode: result.item.selectSurround[0].value[0],
                    inputName: result.item.InputFuncSelect[0].value[0],
                    powerState: result.item.Power[0].value[0]
                  });
            });
        } else {
            callback(error);
        }
    }.bind(this));
};

module.exports = Denon;
