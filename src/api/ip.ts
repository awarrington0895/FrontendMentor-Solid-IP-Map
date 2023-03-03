import ky from 'ky';

/*

url: https://geo.ipify.org/api/v2/country?apiKey=at_6RgmWWLNtScTQ4Fh1qZ0CX7aeB9IL

Sample response:

{"ip":"136.37.175.56","location":{"country":"US","region":"California","timezone":"-08:00"},"as":{"asn":16591,"name":"GOOGLE-FIBER","route":"136.32.0.0\/11","domain":"http:\/\/fiber.google.com\/about","type":"Cable\/DSL\/ISP"},"isp":"Google Fiber Inc."}
*/

export { getLocation, type IpLocation };

const apiKey = 'at_6RgmWWLNtScTQ4Fh1qZ0CX7aeB9IL';

const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

type ServerIpLocation = Readonly<{
  ip: string;
  location: Readonly<{
    country: string;
    region: string;
    city: string;
    timezone: string;
    lat: number;
    lng: number;
    postalCode: string;
  }>;
  isp: string;
}>;

type IpLocation = Readonly<{
  ip: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  postalCode: string;
  isp: string;
  latitude: number;
  longitude: number;
}>;

function toIpLocation(server: ServerIpLocation): IpLocation {
  return {
    ip: server.ip,
    country: server.location.country,
    region: server.location.region,
    city: server.location.city,
    timezone: server.location.timezone,
    postalCode: server.location.postalCode,
    isp: server.isp,
    latitude: server.location.lat,
    longitude: server.location.lng,
  };
}

async function getLocation(): Promise<IpLocation> {
  const response: ServerIpLocation = await ky(url).json();

  return toIpLocation(response);
}