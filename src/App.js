import {useEffect} from "react"
import logo from './logo.svg';
import './App.css';

function App() {

  let weather =  {
    "apiKey":process.env.REACT_APP_API_KEY,
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
              + city 
              + "&units=metric&appid=" 
              + this.apiKey
            )
         .then((response) => response.json())
         .then((data) => this.displayWeather(data));
    },
    displayWeather:function(data){  
        const {name} = data;
        const { icon, description} = data.weather[0];
        const {temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/900×700/?" + name + "')"
    },

    search: function () { 
        this.fetchWeather(document.querySelector(".search-bar").value); 
    }
};


useEffect(()=>{

  document.querySelector(".search button").addEventListener("click", function (){
      weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function(event){
      if(event.key == "Enter"){
          weather.search();
      }
  })
  
  weather.fetchWeather("London");
}, [])

  

  return (
    <div className="App">
    {/* <!-- Weather card--> */}
    
    <div className="card">
      <div className="search">
        <input type="text" className="search-bar" placeholder="Search" />
        <button className="search-button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="weather loading">
        <h2 className="city">Weather in London</h2>
        <h1 className="temp">1°C</h1>
        <div className="flex">
          <div className="description">Cloudy</div>
        </div>
        <div className="humidity">Humidity : 60%</div>
        <div className="wind">Wind Speed: 2.5km/h</div>
      </div>
    </div>
    </div>
  );
}

export default App;

