export interface WeatherData {
  city: string;
  countryCode: string;
  temperature: number;
  visibility: number;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
  sunrise: string;
  sunset: string;
}

export interface DailySummary {
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  avgHumidity: number;
  avgWindSpeed: number;
  dominantCondition: string;
}

export interface WeatherAlert {
  city: string;
  email: string;
  alertType: 'Temperature' | 'Humidity' | 'WindSpeed';
  condition: 'above' | 'below';
  threshold: number;
}