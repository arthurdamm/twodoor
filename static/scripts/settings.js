const _settings = {};
const settings = () => _settings;

const assignSettings = (settings) => Object.assign(_settings, settings);


const putSetting = (key, val) => _settings[key] = val;

const getSetting = (key) => _settings[key];

