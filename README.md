#Homebridge-Denon-Soundmode
homebridge-plugin to trigger a switch when a specific input and soundmode is active on the Denon receiver.
Can be used to trigger lights as i.e. an Apple-TV starts streaming (switches from Stereo to Multi Ch In).

#Installation
TODO

#Configuration
Example - config.json

  {
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:51",
        "port": 51826,
        "pin": "031-45-154"
    },
    "accessories": [
      {
        "accessory": "DenonSoundmode",
        "name": "Denon LivingRoom",
        "ip": "192.168.178.18",
        "inputName": "Apple-TV",
        "soundMode": "Multi Ch In",
        "doPolling": true,
        "pollingInterval": 10
      }
    ]
  }

#Inputnames
inputName should be set as shown on your front LCD panel.
Possible settings (besides custom labels):
- 'CD'
- 'SPOTIFY'
- 'CBL/SAT'
- 'SAT/CBL'
- 'DVD'
- 'BD' (Bluray)
- 'GAME'
- 'GAME2'
- 'AUX1'
- 'MPLAY' (Media Player)
- 'USB/IPOD'
- 'TUNER'
- 'NETWORK'
- 'TV'
- 'IRADIO' (Internet Radio)
- 'DOCK'
- 'IPOD'
- 'NET/USB'
- 'RHAPSODY'
- 'PANDORA'
- 'LASTFM'
- 'IRP'
- 'FAVORITES'
- 'SERVER'
- 'FLICKR'
- 'NAPSTER'
- 'HDRADIO'

#Soundmodes
Will also be displayed on the LCD
All modes can be viewed [HERE](http://manuals.denon.com/AVRX1400H/EU/EN/DRDZSYyrtgycpw.php)
