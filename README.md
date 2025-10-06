# What's The Weather?

A responsive React app that allows users to search for cities and view current weather information in a fast and interactive way.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

Features:

- Search cities with autocomplete suggestions.
- Full keyboard support: navigate suggestions with Arrow keys, confirm selection with Enter, and cancel or close with Escape.
- Normalize city names to avoid duplicates.
- Select a city to view current weather data.
- Display:
  -Temperature and "feels like";
  -Humidity;
  -Wind speed/direction;
  -Weather description and icon;
  -Local date and time;
  -UTC time difference;
- Handle errors for invalid input or failed fetch requests.
- Responsive design with hover animations on the search button.

### Screenshot

![Mobile Version](./screenshots/What's%20The%20Weather%20-%20Mobile.png)

![Desktop Version](./screenshots/What's%20The%20Weather%20-%20Desktop.png)

### Links

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- [Tailwind CSS](https://tailwindcss.com/) – Styling and responsive design
- [React](https://reactjs.org/) – Frontend framework
- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Core language
- [OpenWeatherMap API](https://openweathermap.org/) – Weather and geolocation data

### What I learned

This was my first project in React, and it helped me learn a lot about:

- React fundamentals:
  - Creating components
  - Using props
  - Managing state with useState
  - Handling side effects with useEffect
  - Passing data between components via prop drilling and lifting state up

```js
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
```

- Custom hooks: organizing logic with useCitySearch and useWeather.

```js
const { cityList, setCityList } = useCitySearch({
  city,
  selectedCity,
  setError,
  setPickedCity,
});
```

- Keyboard navigation and accessibility: implementing arrow key navigation, selection with Enter, and closing suggestions with Escape.

```js
onKeyDown={(e) => {
        if (!cityList.length) return;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % cityList.length);
        } /* (...) */}}
```

- String normalization for internationalization: removing accents ensures that duplicate city names are filtered correctly in the autocomplete list.

```js
const normalize = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
```

- Fetching data from APIs: retrieving city coordinates and weather information using async/await, handling successful and failed requests, and updating state accordingly.

```js
export async function getCoordinates(city) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=5&appid=${apiKey}`
  );
  return await res.json();
}
```

### Continued development

Since this was my first React project, I plan to continue improving my skills by focusing on:

- Managing state more efficiently and reducing prop drilling.
- Learning and applying the Context API and useReducer for global state management.
- Building custom hooks to organize and reuse logic across components.
- Improving error handling, loading states, and overall user experience.
- Gaining a deeper understanding of React’s rendering behavior and performance optimization.
- Exploring component testing using Jest and React Testing Library.

### Useful resources

- [React Documentation](https://react.dev/learn) - I spent a lot of time reading the official React docs to truly understand how React works under the hood. It clarified many concepts for me, especially component re-rendering, state updates, and the use of hooks.

## Author

- GitHub - [@BuildAndBreak](https://github.com/BuildAndBreak)
- Linkedin - [Tiago Pereira](https://www.linkedin.com/in/tiago-pereira-5a4698289/)
- Frontend Mentor - [@BuildAndBreak](https://www.frontendmentor.io/profile/BuildAndBreak)

### Acknowledgments

Thanks to the [React documentation](https://react.dev/) for helping me understand the core concepts and guiding me through my first React project.

Special thanks to [@WebDevSimplified](https://www.youtube.com/@WebDevSimplified)
for providing clear and concise React tutorials that helped me grasp key concepts such as components, hooks, and state management.
