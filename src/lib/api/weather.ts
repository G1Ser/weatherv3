import { http } from '$lib/api/http';

export type Lang = 'zh' | 'en';
export type Unit = 'm' | 'i';

export interface LocationInfo {
  id: number;
  name: string;
  name_zh: string;
  lon: number;
  lat: number;
}

export interface WeatherNow {
  obsTime: string;
  temp: string;
  feelsLike: string;
  icon: string;
  text: string;
  text_zh?: string;
  wind360: string;
  windDir: string;
  windDir_zh?: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  dew: string;
}

export interface ForecastDailyItem {
  fxDate: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonPhase_zh?: string;
  moonPhaseIcon: string;
  tempMax: string;
  tempMin: string;
  iconDay: string;
  textDay: string;
  textDay_zh?: string;
  iconNight: string;
  textNight: string;
  textNight_zh?: string;
  windDirDay?: string;
  windDirDay_zh?: string;
  windSpeedDay?: string;
  humidity?: string;
  precip?: string;
  pressure?: string;
  uvIndex: string;
}

export interface ForecastResponse {
  daily: ForecastDailyItem[];
}

export interface LifeIndexItem {
  date: string;
  type: string;
  name: string;
  name_zh?: string;
  level: string;
  category: string;
  category_zh?: string;
  text: string;
  text_zh?: string;
}

export interface LifeIndicesResponse {
  daily: LifeIndexItem[];
}

export interface SunAstronomyResponse {
  sunrise: string;
  sunset: string;
}

export interface MoonAstronomyResponse {
  moonrise: string;
  moonset: string;
  moonPhase: Array<{
    fxTime: string;
    value: string;
    name: string;
    name_zh?: string;
    illumination: string;
    icon: string;
  }>;
}

export interface AlertItem {
  id: string;
  issuedTime: string;
  expireTime: string;
  senderName: string;
  senderName_zh?: string;
  headline: string;
  headline_zh?: string;
  description: string;
  description_zh?: string;
  criteria?: string;
  instruction?: string;
  eventType?: {
    name: string;
    name_zh?: string;
    code: string;
  };
}

export interface AlertResponse {
  alerts: AlertItem[];
}

export interface AirResponse {
  indexes: Array<{
    code: string;
    name: string;
    aqi: number;
    aqiDisplay: string;
    level: string;
    category: string;
    category_zh?: string;
    primaryPollutant?: {
      code: string;
      name: string;
    };
  }>;
  pollutants: Array<{
    code: string;
    name: string;
    concentration: {
      value: number;
      unit: string;
    };
  }>;
}

export interface CoordinateResponse {
  data: Array<{
    id: string;
    lat: number;
    lon: number;
    name: string;
    name_zh?: string;
    adcode: string;
    display: string;
    display_zh?: string;
  }>;
}

interface WeatherQuery {
  lon: number | string;
  lat: number | string;
  lang?: Lang;
  unit?: Unit;
}

function mockGet<T>(path: string, searchParams?: Record<string, string | number | undefined>) {
  return http.get(path, { searchParams }).json<T>();
}

export const weatherApi = {
  getIp() {
    return mockGet<LocationInfo>('__mock__/ip.json');
  },

  getNow(query: WeatherQuery) {
    return mockGet<{ now: WeatherNow }>('__mock__/qweather/now.json', { ...query });
  },

  getForecast(query: WeatherQuery) {
    return mockGet<ForecastResponse>('__mock__/qweather/forecast.json', { ...query });
  },

  getIndices(query: Omit<WeatherQuery, 'unit'>) {
    return mockGet<LifeIndicesResponse>('__mock__/qweather/indice.json', { ...query });
  },

  getAstronomy(query: WeatherQuery & { astronomy: 'sun' | 'moon'; date?: string }) {
    const file =
      query.astronomy === 'sun' ? '__mock__/qweather/astronomy-sun.json' : '__mock__/qweather/astronomy-moon.json';

    return mockGet<SunAstronomyResponse | MoonAstronomyResponse>(file, { ...query });
  },

  getAlert(query: Omit<WeatherQuery, 'unit'>) {
    return mockGet<AlertResponse>('__mock__/qweather/alert.json', { ...query });
  },

  getAir(query: Omit<WeatherQuery, 'unit'>) {
    return mockGet<AirResponse>('__mock__/qweather/air.json', { ...query });
  },

  getCoordinate(keyword: string) {
    return mockGet<CoordinateResponse>('__mock__/geo/coordinate.json', { keyword });
  },
};
