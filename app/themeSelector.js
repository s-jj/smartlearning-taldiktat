const root = document.querySelector(":root");
const rootStyle = getComputedStyle(root);

const primaryForeground = "--foreground-primary";
const primaryBackground = "--background-primary";

let currentForeground = getRootProperty(primaryForeground);
let currentBackground = getRootProperty(primaryBackground);
const light = getRootProperty("--light");
const dark = getRootProperty("--dark");

const sliders = document.querySelectorAll('.sliders input[type="range"]');
const hue = sliders[0];
const brightness = sliders[1];
const saturation = sliders[2];

let baseColor = "#4400ee";

sliders.forEach((slider) => {
  slider.addEventListener("input", updateColor);
});

hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;

updateColor();

function getRootProperty(property) {
  return rootStyle.getPropertyValue(property);
}

function setRootProperty(property, value) {
  root.style.setProperty(property, value);
}

function updateColor() {
  let color = chroma(baseColor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);

  setColor(color);
}

function setColor(color) {
  const noSaturation = color.set("hsl.s", 0);
  const fullSaturation = color.set("hsl.s", 1);
  const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);
  const midBrightness = color.set("hsl.l", 0.5);
  const scaleBrightness = chroma.scale(["black", midBrightness, "white"]);

  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSaturation(0)}, ${scaleSaturation(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBrightness(0)}, ${scaleBrightness(0.5)},  ${scaleBrightness(1)})`;

  setRootProperty(primaryBackground, color);
  checkTextContrast(color);
}

function checkTextContrast(color) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    setRootProperty(primaryForeground, dark);
  } else {
    setRootProperty(primaryForeground, light);
  }
}
