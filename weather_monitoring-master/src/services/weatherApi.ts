import { WeatherData, DailySummary } from '../types/weather';

const API_KEY = 'f93f58c094c3d0295ee111451259b2e6'; // Replace with actual OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<{ weather: WeatherData; summary: DailySummary }> => {
  try {
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      throw new Error(weatherData.message || 'Failed to fetch weather data');
    }

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const forecastData = await forecastResponse.json();

    if (!forecastResponse.ok) {
      throw new Error(forecastData.message || 'Failed to fetch forecast data');
    }

    const weather: WeatherData = {
      city: weatherData.name,
      countryCode: weatherData.sys.country,
      temperature: weatherData.main.temp,
      visibility: weatherData.visibility / 1000, // Convert to km
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      cloudiness: weatherData.clouds.all,
      sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };

    const temps = forecastData.list.map((item: any) => item.main.temp);
    const avgTemp = temps.reduce((acc: number, temp: number) => acc + temp, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const avgHumidity = forecastData.list.reduce((acc: number, item: any) => acc + item.main.humidity, 0) / forecastData.list.length;
    const avgWindSpeed = forecastData.list.reduce((acc: number, item: any) => acc + item.wind.speed, 0) / forecastData.list.length;
    const dominantCondition = forecastData.list[0].weather[0].main;

    const summary: DailySummary = {
      avgTemp,
      maxTemp,
      minTemp,
      avgHumidity,
      avgWindSpeed,
      dominantCondition
    };

    return { weather, summary };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
