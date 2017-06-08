function newOpen(url) {
  window.open(url, "example", "windth=320,height=480");
}


window.onload = function() {
  if (!document.getElementsByTagName) return false;
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("class") == "popup") {
      links[i].onclick = function() {
        newOpen(this.getAttribute("href"));
        return false;
      }
    }
  }
};
