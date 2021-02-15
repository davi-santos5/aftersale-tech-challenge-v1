//selecting DOM elements
const buildingDiv = document.querySelector(".building");
const switchBtn = document.querySelector(".switch");
const windowDivArr = document.querySelectorAll(".window");

//functions to controls "lights"
const turnOnLights = () => {
  windowDivArr.forEach((windowDiv) =>
    windowDiv.classList.remove("window-light-off")
  );
};

const turnOffLights = () => {
  windowDivArr.forEach((windowDiv) =>
    windowDiv.classList.add("window-light-off")
  );
};

const toggleSwitchLight = () => {
  if (switchBtn.classList.contains("switch-light-off")) {
    switchBtn.classList.remove("switch-light-off");
    turnOnLights();
  } else {
    switchBtn.classList.add("switch-light-off");
    turnOffLights();
  }
};

const toggleWindowLight = (target) => {
  target.classList.contains("window-light-off")
    ? target.classList.remove("window-light-off")
    : target.classList.add("window-light-off");
};

//triggering functions with event listeners
switchBtn.addEventListener("click", toggleSwitchLight);

windowDivArr.forEach((windowDiv) => {
  windowDiv.addEventListener("click", ({ target }) =>
    toggleWindowLight(target)
  );
});
