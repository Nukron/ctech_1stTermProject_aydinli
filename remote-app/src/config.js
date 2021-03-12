class Config {
  constructor (defaultConfig, userConfig) {
    this.cachedConfigDefaults = defaultConfig.cachedConfigDefaults
    this.configDefaults = defaultConfig.configDefaults
    this.userConfig = userConfig

    this._initialize()
  }

  _initialize () {

 
  }



 

  _createDefaultServerURL () {
    if (!this.cachedConfigDefaults.serverUrl) {
      let serverUrl = window.location.origin
      if (window.location.origin.split(':').length > 2) {
        serverUrl = serverUrl.replace('localhost', '127.0.0.1')
        this.cachedConfigDefaults.serverUrl = serverUrl.substr(0, window.location.origin.lastIndexOf(':')) + ':30010'
      }
    }
  }

  
}

// eslint-disable-next-line no-undef
export default new Config(require('../defaultConfig.json'), require('../userConfig.json'))
