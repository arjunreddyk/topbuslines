const BASE_URL = "https://api.sl.se/api2/LineData.json";

const url1 = `${BASE_URL}?model=jour&key=${process.env.TRAFIK_KEY}&DefaultTransportModeCode=BUS`;

const url2 = `${BASE_URL}?model=stop&key=${process.env.TRAFIK_KEY}&DefaultTransportModeCode=BUS`;

module.exports.url1 = url1;
module.exports.url2 = url2;
