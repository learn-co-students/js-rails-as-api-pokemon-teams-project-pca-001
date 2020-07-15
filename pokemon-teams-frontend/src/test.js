function paintItRed() { // code to make all text red }

function makeItSmall() { // code to make all text small }

function pickOnLoadAction() {
  // if today is sunday...
  if ((new Date()).getDay() === 0) {
    return makeItSmall
  } else {
    return paintItRed
  }
}

let onLoadAction = pickOnLoadAction()

document.addEventListener("DOMContentLoaded", onLoadAction)
