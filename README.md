# Weather Monitoring System

A modern, responsive weather monitoring application built with React and TypeScript that provides real-time weather data for cities across India and worldwide.

## 🌟 Weather DashBoard
![Screenshot 2024-12-22 205752](https://github.com/user-attachments/assets/52bb4e5d-98b7-49bb-8e6f-86872beb95b9)




## 🌟 Features

- **Real-Time Weather Data**: Live weather updates using OpenWeatherMap API
- **City Comparison**: Compare weather conditions between different cities
- **Weather Alerts**: Set custom alerts for temperature, humidity, and wind speed
- **Interactive Charts**: Visualize weather trends with Recharts
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Fully responsive across all devices
- **Temperature Units**: Switch between Celsius and Fahrenheit

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **State Management**: React Hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: OpenWeatherMap API
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Code Quality**: ESLint

## 📁 Project Structure

```
weather-monitoring-system/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CityList.tsx     # City selection component
│   │   ├── Header.tsx       # Application header
│   │   ├── Toast.tsx        # Notification component
│   │   ├── WeatherAlert.tsx # Weather alerts form
│   │   ├── WeatherCard.tsx  # Weather information display
│   │   └── WeatherGraph.tsx # Weather data visualization
│   ├── constants/           # Application constants
│   │   └── cities.ts        # List of Indian cities
│   ├── hooks/               # Custom React hooks
│   │   └── useToast.ts      # Toast notification hook
│   ├── pages/               # Application pages
│   │   ├── CompareCities.tsx    # City comparison page
│   │   └── WeatherDashboard.tsx # Main dashboard
│   ├── services/            # API services
│   │   └── weatherApi.ts    # Weather API integration
│   ├── types/               # TypeScript type definitions
│   │   └── weather.ts       # Weather-related types
│   ├── App.tsx             # Root component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-monitoring-system.git
   ```

2. Install dependencies:
   ```bash
   cd weather-monitoring-system
   npm install
   ```

3. Create a `.env` file and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Features in Detail

### Weather Dashboard
- Real-time weather data display
- Temperature, humidity, wind speed, and visibility information
- Sunrise and sunset times
- Cloud coverage percentage
- 5-day temperature forecast

### City Comparison
- Side-by-side weather comparison
- Temperature trend graphs
- Detailed weather metrics comparison
- Quick city search functionality

### Weather Alerts
- Custom alert creation
- Temperature threshold monitoring
- Humidity level alerts
- Wind speed notifications
- Email notifications system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://weathermonitorningtushar.netlify.app/)
- [API Documentation](https://openweathermap.org/api)
