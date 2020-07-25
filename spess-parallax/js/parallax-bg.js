function throttle(func, timeFrame) {
  var lastTime = 0;
  return function (...args) {
    var now = new Date();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

var parallaxContainer = document.querySelector("[data-parallax]");
var parallaxElements = parallaxContainer.children;

window.addEventListener("load", () => {
  initParallax();
});

function initParallax() {
  for (var n = 0; n < parallaxElements.length; n++) {
    var compStyle = getComputedStyle(parallaxElements[n]);
    parallaxElements[n].initialX = compStyle.backgroundPositionX;
    parallaxElements[n].initialY = compStyle.backgroundPositionY;
  }

  document.addEventListener(
    "mousemove",
    throttle((e) => {
      updateParallax(e.pageX, e.pageY);
    }, 50)
  );
}

function updateParallax(inputX, inputY) {
  var windowCenterX = window.innerWidth / 2;
  var windowCenterY = window.innerHeight / 2;
  for (var c = 0; c < parallaxElements.length; c++) {
    var motion = 1 / parseInt(parallaxElements[c].getAttribute("data-depth"));
    var moveX = (windowCenterX - inputX) * motion;
    var moveY = (windowCenterY - inputY) * motion;
    var x = moveX + "px";
    var y = moveY + "px";

    parallaxElements[c].animate([{ transform: `translate(${x}, ${y})` }], {
      duration: 1000,
      fill: "forwards",
    });

    /*
    if (moveX + moveY < 100) {
      parallaxElements[c].style.transform = `translate(${x}, ${y})`;
    } else {
      parallaxElements[c].animate(
        [{ transform: `translate(${x}, ${y})` }],
        {
          duration: 10000,
        }
      );
    }*/

    //parallaxElements[c].style.backgroundPosition = `calc(${parallaxElements[n].initialX} + ${x}) calc(${parallaxElements[n].initialY} + ${y})`;
  }
}
