const backwardBtn = document.querySelector(".backward");
const farwardBtn = document.querySelector(".farward");
const jokePanel = document.querySelector(".joke-panel");
const counter = document.querySelector(".counter");

let jokes = [];
let currentIndex = -1;

getRandomJoke();

farwardBtn.addEventListener("click", () => {
  if (currentIndex < jokes.length - 1) {
    currentIndex++;

    renderJoke(jokes[currentIndex]);
    renderCount(jokes[currentIndex]);

    return;
  }
  getRandomJoke();
});

backwardBtn.addEventListener("click", () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  renderJoke(jokes[currentIndex]);
  renderCount(jokes[currentIndex]);
});

function getRandomJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/random")
    .then((response) => response.json())
    .then((json) => {
      let joke = { ...json, jokeId: jokes.length + 1 };
      jokes.push(joke);
      currentIndex = jokes.length - 1;

      renderJoke(json);
      renderCount(joke);
    });
}

function renderJoke(joke) {
  jokePanel.innerHTML = `<h3>${joke.setup}</h3>
                             <p>${joke.punchline}</p>`;
}

function renderCount(joke) {
  counter.innerHTML = `<p>Шутка ${joke.jokeId} из ${jokes.length}</p>`;
}
