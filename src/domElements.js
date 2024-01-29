// idk if we need to import any functions yet

// Need to create the homePage, a form that asks for the users name and how many players

console.log(`something`);

function createElement(type, parentElement, id, classes) {
  const newElement = document.createElement(type);
  for (let i = 0; i < classes.length; i++) {
    newElement.classList.add(classes[i]);
  }
  if (id !== null) {
    newElement.setAttribute("id", id);
  }
  parentElement.appendChild(newElement);
  console.log(`done with createElement`);
  return;
}

const body = document.body;
createElement("div", body, "id", ["class1", "class2"]);

// *************************************************************************************
module.exports = {
  createElement,
};
