function onReady(callback) {
  const intervalId = window.setInterval(function() {
    if ($('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? $(selector).fadeIn(400) : $(selector).fadeOut(400);

}

onReady(function() {
  setVisible('.page', true);
  setVisible('#loading', false);
});
