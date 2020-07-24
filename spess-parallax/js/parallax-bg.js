window.addEventListener("load", function () {
  var container = document.querySelector("[data-parallax]");
  var childNodes = container.children;
  for (var n = 0; n < childNodes.length; n++) {
    var compStyle = getComputedStyle(childNodes[n]);
    childNodes[n].setAttribute("data-index", n + 1);
    childNodes[n].setAttribute("initial-x", compStyle.backgroundPositionX);
    childNodes[n].setAttribute("initial-y", compStyle.backgroundPositionY);
  }

  container.addEventListener("mousemove", function (e) {
    var elms = this.children;
    var windowCenterX = window.innerWidth / 2;
    var windowCenterY = window.innerHeight / 2;
    for (var c = 0; c < elms.length; c++) {
      var motion = parseInt(elms[c].getAttribute("data-index")) / 100;
      var initialX = elms[c].getAttribute("initial-x");
      var initialY = elms[c].getAttribute("initial-y");
      var moveX = (windowCenterX - e.pageX) * motion;
      var moveY = (windowCenterY - e.pageY) * motion;
      var x = moveX + "px";
      var y = moveY + "px";
      elms[c].style.backgroundPosition = `calc(${initialX} + ${x}) calc(${initialY} + ${y})`;
      console.log(initialX,x,initialY,y)
    }
  });
});
