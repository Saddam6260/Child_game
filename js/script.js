const cardList = [
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
  {
    name: "saddam",
  },
];

const cardListContainer = document.getElementById("card_list");

// create div 

const divCreator = (div_class) => {
    const imgTag = document.createElement('img');
    imgTag.src = "https://cdn-icons-png.flaticon.com/512/686/686751.png";
    imgTag.alt = "No image show";

    const divTage = document.createElement("div");
    divTage.className = `item item_${div_class}`;
    divTage.appendChild(imgTag);
    cardListContainer.appendChild(divTage);
}

// genaret div

cardList.map((name, num) => {
    divCreator(num+1);
});
