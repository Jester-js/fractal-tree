const paper = Snap('#field');
const startStroke = 20;
const color = '#191917';

const style = {
  fill: color,
  stroke: color,
  strokeWidth: startStroke,
  radius: 20
};

const lessStroke = () => {
  if (style.strokeWidth > 1)
    style.strokeWidth = style.strokeWidth - 3
};

const Window = {
  w: window.innerWidth,
  h: window.innerHeight,
  cx: window.innerWidth / 2,
  cy: window.innerHeight / 2,
};

const showWindowSizeDetail = _ => {
  console.log(`Window size: ${Window.w}x${Window.h}; Window center (x, y): (${Window.cx}, ${Window.cy})`);
};

showWindowSizeDetail();

const setCenter = (x, y) => {
  Window.cx = x;
  Window.cy = y;
};

setCenter(Window.w / 2, Window.h / 2);

const getWindowCoord = (coord, name) => {
  switch (name) {
    case 'x': return Window.cx - coord;
    case 'y': return Window.cy - coord;
    default: return false;
  }
};

const fromDegToRad = deg => (2 * deg * Math.PI) / 360;

const fromRadToDeg = rad => rad * 360 / 2 * Math.PI;

let slength = 100,
    length = slength,
    divAngle = 30,
    minLength = 2,
    cL = .9999;

let iteratorLevels = 1;

let prevFactorial = 1;

const factorial = (n) => {
  let f = 1;
  while (n != 0) {
    f = f * n;
    n--;
  };
  return f;
};

const draw = (objCoords, angle, l) => {
  let a = objCoords.a,
      b = objCoords.b;

  setCenter(a, b);

  length = l;

  let A = fromDegToRad(angle);

  let x = length * Math.cos(A);
  let y = length * Math.sin(A);

  x = getWindowCoord(x, 'x');
  y = getWindowCoord(y, 'y');

  if (iteratorLevels >= factorial(prevFactorial)) {
    lessStroke();
    prevFactorial++;
  };

  const line = paper.path(`M${a} ${b}L${a} ${b}`);
  line.attr(style);

  line.animate({ d: `M${a} ${b}L${x} ${y}` }, 200, () => {

    iteratorLevels++;
    iteratorLevels++;

    if (length > minLength) {
      let num = Math.floor(Math.random() * 10);
      const nextCoords = {};
      nextCoords.a = x;
      nextCoords.b = y;
      if (num != 5 && num != 4)
        draw(nextCoords, angle - divAngle, length * cL);

      if (num != 7 && num != 6 && num != 3)
        draw(nextCoords, angle + divAngle, length * cL);
    };
  })
};

window.onclick = (e) => {
  const startCoords = {};

  startCoords.a = e.pageX;
  startCoords.b = e.pageY;

  setCenter(e.pageX, e.pageY);

  const startAngle = Math.floor(Math.random() * 360);
  draw(startCoords, startAngle, length);
};
