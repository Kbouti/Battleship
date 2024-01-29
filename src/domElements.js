// idk if we need to import any functions yet

// Need to create the homePage, a form that asks for the users name and how many players

function createElement(type, parentElement, id, classes) {
  console.log(`create Element triggered`);
  const newElement = document.createElement(type);
  console.log(`test1`)
  if (classes !== null) {
    console.log(`test2`)
    for (let i = 0; i < classes.length; i++) {
      newElement.classList.add(classes[i]);
    }
  }
  if (id !== null) {
    newElement.setAttribute("id", id);
  }
  parentElement.appendChild(newElement);
  console.log(`done with createElement`);
  return newElement;
}


function buildPage() {
    const body = document.body;
    const title = createElement("H1", body, "title", ["title"]);
    title.innerHTML = "BattleShip";
}

// *************************************************************************************
module.exports = {
  createElement,
  buildPage,
};
