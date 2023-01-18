var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {

  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

  });

}

document.addEventListener("keypress", function(event) {

  makeSound(event.key);

  buttonAnimation(event.key);

});


function makeSound(key) {

  switch (key) {
    case "1":
      var Sound1 = new Audio("Sounds/1.wav");
      Sound1.play();
      break;

    case "2":
      var Sound2 = new Audio("Sounds/2.wav");
      Sound2.play();
      break;

    case "3":
      var Sound3 = new Audio('Sounds/3.wav');
      Sound3.play();
      break;

    case "4":
      var Sound4 = new Audio('Sounds/4.wav');
      Sound4.play();
      break;

    case "5":
      var Sound5 = new Audio('Sounds/5.wav');
      Sound5.play();
      break;

    case "6":
      var Sound6 = new Audio('Sounds/6.wav');
      Sound6.play();
      break;
    default: console.log(key);

  }
}


function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);

}