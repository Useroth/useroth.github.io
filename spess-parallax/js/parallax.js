window.addEventListener("load", function () {
  var container = document.querySelector("[data-parallax]");
  var childNodes = container.children;
  for (var n = 0; n < childNodes.length; n++) {
    childNodes[n].setAttribute("data-index", n + 1);
  }
  container.addEventListener("mousemove", function (e) {
    var elms = this.children;
    var windowCenterX = window.innerWidth / 2;
    var windowCenterY = window.innerHeight / 2;
    for (var c = 0; c < elms.length; c++) {
      var motion = parseInt(elms[c].getAttribute("data-index")) / 100;
      var moveX = (windowCenterX - e.pageX) * motion;
      var moveY = (windowCenterY - e.pageY) * motion;
      var x = (windowCenterX + moveX) + "px";
      var y = (windowCenterY + moveY) + "px";
      elms[c].style.backgroundPosition = x + " " + y;
      console.log(e.pageX,e.pageY, moveX, moveY, x, y)
    }
  });
});
