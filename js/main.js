const paper = Snap('#field');
let startStroke = 20;
let colors = ["rgb(255,15,0)", "rgb(255,30,0)", "rgb(255,45,0)",
    "rgb(255,60,0)", "rgb(255,75,0)", "rgb(255,90,0)",
    "rgb(255,105,0)", "rgb(255,120,0)", "rgb(255,135,0)",
    "rgb(255,150,0)", "rgb(255,165,0)", "rgb(255,180,0)",
    "rgb(255,195,0)", "rgb(255,210,0)", "rgb(255,225,0)",
    "rgb(255,240,0)", "rgb(255,255,0)", "rgb(235,255,0)",
    "rgb(215,255,0)", "rgb(195,255,0)", "rgb(175,255,0)",
    "rgb(155,255,0)", "rgb(135,255,0)", "rgb(115,255,0)",
    "rgb(95,255,0)", "rgb(75,255,0)", "rgb(55,255,0)",
    "rgb(35,255,0)", "rgb(15,255,0)", "rgb(0,255,15)",
    "rgb(0,255,30)", "rgb(0,255,45)", "rgb(0,255,60)",
    "rgb(0,255,75)", "rgb(0,255,90)", "rgb(0,255,105)",
    "rgb(0,255,120)", "rgb(0,255,135)", "rgb(0,255,150)",
    "rgb(0,255,165)", "rgb(0,255,180)", "rgb(0,255,195)",
    "rgb(0,255,210)", "rgb(0,255,225)", "rgb(0,255,240)",
    "rgb(0,255,255)", "rgb(0,255,255)", "rgb(0,235,255)",
    "rgb(0,215,255)", "rgb(0,195,255)", "rgb(0,175,255)",
    "rgb(0,155,255)", "rgb(0,135,255)", "rgb(0,115,255)",
    "rgb(0,95,255)", "rgb(0,75,255)", "rgb(0,55,255)",
    "rgb(0,35,255)", "rgb(0,15,255)", "rgb(0,0,255)",
    "rgb(15,0,255)", "rgb(30,0,255)", "rgb(45,0,255)",
    "rgb(60,0,255)", "rgb(75,0,255)", "rgb(90,0,255)",
    "rgb(105,0,255)", "rgb(120,0,255)", "rgb(135,0,255)",
    "rgb(150,0,255)", "rgb(165,0,255)", "rgb(180,0,255)",
    "rgb(195,0,255)", "rgb(210,0,255)", "rgb(225,0,255)",
    "rgb(240,0,255)", "rgb(255,0,255)"
]

let style = {
    fill: colors[0],
    stroke: colors[0],
    strokeWidth: startStroke,
    radius: 20
}

let ic = 0;

const nextColor = () => {
    style.stroke = colors[ic]
    ic += 5;
    if (ic > colors.length) {
        ic = 0;
    }
}

const lessStroke = () => {
    if (style.strokeWidth > 1) {
        style.strokeWidth = style.strokeWidth - 3
    }
}

const Window = {};

Window.w = $(window).width();
Window.h = $(window).height();
Window.cx = $(window).width() / 2;
Window.cy = $(window).height() / 2;

const showWindowSizeDetail = () => {
    console.log(`Window size: ${Window.w}x${Window.h}; Window center (x, y): (${Window.cx}, ${Window.cy})`);
}

showWindowSizeDetail();

const setCenter = (x, y) => {
    Window.cx = x;
    Window.cy = y;
}

setCenter(Window.w / 2, Window.h / 2);

const getWindowCoord = (coord, name) => {
    switch (name) {
        case 'x':
            return Window.cx - coord;
            break;
        case 'y':
            return Window.cy - coord;
            break;
        default:
            return false;
            break;
    }
}

const fromDegToRad = (deg) => {
    return (2 * deg * Math.PI) / 360;
}

const fromRadToDeg = (rad) => {
    let q = rad;
    let w = rad * 360;
    let e = 2 * Math.PI;
    return w / e;
}

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
        n--
    }
    return f;
}

const draw = (objCoords, angle, l) => {
    let a = objCoords.a,
        b = objCoords.b;

    setCenter(a, b)

    length = l;

    let A = fromDegToRad(angle);

    let x = length * Math.cos(A);
    let y = length * Math.sin(A);

    x = getWindowCoord(x, 'x')
    y = getWindowCoord(y, 'y')

    if (iteratorLevels >= factorial(prevFactorial)) {
        lessStroke();
        prevFactorial++;
    }
    nextColor();

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
            if (num != 5 && num != 4) {
                draw(nextCoords, angle - divAngle, length * cL)
            }
            if (num != 7 && num != 6 && num != 3) {
                draw(nextCoords, angle + divAngle, length * cL)
            }
        }
    })


}

$(window).click((e) => {
    const startCoords = {};

    startCoords.a = e.pageX;
    startCoords.b = e.pageY;

    setCenter(e.pageX, e.pageY);

    const startAngle = Math.floor(Math.random() * 360)
    draw(startCoords, startAngle, length);
})
