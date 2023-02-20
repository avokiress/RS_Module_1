const weatherData = [
  { id: 1, name: 'summer', image: 'media/images/summer-bg.jpg', sound: 'media/sounds/summer.mp3', icon: 'media/icons/sun.svg' },
  { id: 2, name: 'rain', image: 'media/images/rainy-bg.jpg', sound: 'media/sounds/rain.mp3', icon: 'media/icons/cloud-rain.svg' },
  { id: 3, name: 'winter', image: 'media/images/winter-bg.jpg', sound: 'media/sounds/winter.mp3', icon: 'media/icons/cloud-snow.svg' },
];

const root = document.querySelector('#app')

let iaPlaying = false;
let iaPaused = false;
let activeWeather = '';


const clickWeather = (e) => {
  const { name, sound, image } = e.target.dataset
  document.querySelectorAll('.icon_pause').forEach(icon => icon.style = 'visibility: hidden')
  e.target.querySelector('.icon_pause').style = 'visibility: visible';

  const isPlayNewSound = (!iaPlaying && !iaPaused) || (activeWeather !== name);
  
  if (isPlayNewSound) {
    activeWeather = name;

    h1.textContent = 'Weather sounds ' + name;
    divWrapper.style = 'background-image: url(' + image + ')';
    audio.src = sound;
  }

  iaPlaying = true;
  iaPaused = false;
  audio.play();
}


const clickPause = (e) => {
  e.stopPropagation();
  e.target.style = 'visibility: hidden';

  iaPlaying = false;
  iaPaused = true;
  audio.pause();
}


const onChangeRange = (e) => {
  const { value } = e.target;
  audio.volume = value; 
}


const renderItem = (weather) => {
  const li = document.createElement('li')
  li.className = 'weather_list__item'
  li.style = 'background-image: url(' + weather.image + ')';
  li.dataset.sound = weather.sound;
  li.dataset.name = weather.name;
  li.dataset.image = weather.image;

  const img = document.createElement('img') 
  img.src = weather.icon;
  img.width = 60;
  li.appendChild(img);

  const iconPause = document.createElement('i')
  iconPause.className = 'icon_pause';
  iconPause.style = 'visibility: hidden';
  iconPause.addEventListener('click', clickPause)

  li.appendChild(iconPause);
  li.addEventListener('click', clickWeather)

  ul.append(li);
}

const divWrapper = document.createElement('div');
divWrapper.className = 'wrapper';
root.append(divWrapper);

const h1 = document.createElement('h1');
h1.textContent = 'Weather sounds';
divWrapper.appendChild(h1);

const ul = document.createElement('ul');
ul.className = 'weather_list'
divWrapper.appendChild(ul);

const divRange = document.createElement('div');
divRange.className = 'range_volume'
const inputRange = document.createElement('input');
inputRange.type = 'range';
inputRange.step = '0.1';
inputRange.min = '0.1';
inputRange.max = '1';
inputRange.value = '0.5';
inputRange.addEventListener('change', onChangeRange)

divRange.appendChild(inputRange);
divWrapper.appendChild(divRange);

const audio = document.createElement('audio');
divWrapper.appendChild(audio);


weatherData.forEach(renderItem)
