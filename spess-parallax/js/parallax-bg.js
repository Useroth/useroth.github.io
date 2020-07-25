var parallaxContainer = document.querySelector("[data-parallax]");
var parallaxElements = parallaxContainer.children;

window.addEventListener("load", function () {
  initParallax();
});

function initParallax() {
  for (var n = 0; n < parallaxElements.length; n++) {
    var compStyle = getComputedStyle(parallaxElements[n]);
    parallaxElements[n].setAttribute(
      "data-initial-x",
      compStyle.backgroundPositionX
    );
    parallaxElements[n].setAttribute(
      "data-initial-y",
      compStyle.backgroundPositionY
    );
  }

  if (window.Accelerometer) {
    let element = document.getElementById('debug');
    element.innerText = "Gyro detected"

    var accelerometer = new Accelerometer({ frequency: 60 });
    accelerometer.addEventListener("reading", (e) => {
      updateParallax(accelerometer.x, accelerometer.y);
      let element = document.getElementById('debug');
      element.innerText = `${accelerometer.x} ${accelerometer.y}`
    });
    accelerometer.start();
  } else {
    let element = document.getElementById('debug');
    element.innerText = "Gyro not detected"

    parallaxContainer.addEventListener("mousemove", function (e) {
      updateParallax(e.pageX, e.pageY);
      let element = document.getElementById('debug');
      element.innerText = `${e.pageX} ${e.pageY}`
    });
  }
}

function updateParallax(inputX, inputY) {
  var windowCenterX = window.innerWidth / 2;
  var windowCenterY = window.innerHeight / 2;
  for (var c = 0; c < parallaxElements.length; c++) {
    var motion = 1 / parseInt(parallaxElements[c].getAttribute("data-depth"));
    var initialX = parallaxElements[c].getAttribute("data-initial-x");
    var initialY = parallaxElements[c].getAttribute("data-initial-y");
    var moveX = (windowCenterX - inputX) * motion;
    var moveY = (windowCenterY - inputY) * motion;
    var x = moveX + "px";
    var y = moveY + "px";
    parallaxElements[
      c
    ].style.backgroundPosition = `calc(${initialX} + ${x}) calc(${initialY} + ${y})`;
    console.log(initialX, x, initialY, y);
  }
}
