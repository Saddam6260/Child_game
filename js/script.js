// console.log(variantList.color);
const colorList = ["blue", "orange", "violet", "green"];
const shapeList = ["circle", "triangle", "squre", "star"];
const styleList = ["dot", "scale", "non", "fill"];
const imageList = [];
let i = 0;

colorList.forEach((color) => {
  shapeList.forEach((shape) => {
    styleList.forEach((style) => {
      imageList.push({
        img: `${color}-${shape}-${style}.png`,
        color: color,
        shape: shape,
        style: style,
      });
      i += 1;

      const word = imageList[i - 1];
      const letter = word.img.charAt(0);

      // if (letter == "b") {
      //     variantList.color[0].value.push(`${color}-${shape}-${style}`);
      //     variantList.shape[0].value.push(`${color}-${shape}-${style}`);
      //     variantList.style[0].value.push(`${color}-${shape}-${style}`);
      // } else if (letter == "o") {
      //     variantList.color[1].value.push(`${color}-${shape}-${style}`);
      //     variantList.shape[1].value.push(`${color}-${shape}-${style}`);
      //     variantList.style[1].value.push(`${color}-${shape}-${style}`);
      // } else if (letter == "v") {
      //     variantList.color[2].value.push(`${color}-${shape}-${style}`);
      //     variantList.shape[2].value.push(`${color}-${shape}-${style}`);
      //     variantList.style[2].value.push(`${color}-${shape}-${style}`);
      // } else if (letter == "g") {
      //     variantList.color[3].value.push(`${color}-${shape}-${style}`);
      //     variantList.shape[3].value.push(`${color}-${shape}-${style}`);
      //     variantList.style[3].value.push(`${color}-${shape}-${style}`);
      // }
    });
  });
});

// create div
const cardListContainer = document.getElementById("card_list");

const divCreator = (data, div_class) => {
  const { img, color, shape, style } = data;
  const imgTag = document.createElement("img");
  imgTag.src = `img/cardList/${img}`;
  imgTag.alt = "card image";
  imgTag.className = `${shape} ${color} ${style}`;

  const divTage = document.createElement("div");
  divTage.className = `item item_${div_class}`;

  divTage.appendChild(imgTag);
  cardListContainer.appendChild(divTage);
};

// Timmer Functions

class CardGame {
  allCardlist() {
    return imageList;
  }
  counDown(count = 60) {
    let counter = count;
    let timmer = setInterval((e) => {
      counter--;
      if ("0" == counter) {
        clearInterval(timmer);
      }

      // time spliter
      const muniteSec = [0, 0];
      muniteSec[0] = Math.floor(counter / 60);
      muniteSec[1] = counter <= 59 ? counter : counter - 60 * muniteSec[0];
      let [munite, sec] = muniteSec;

      // Update counter
      const timmerTage = document.querySelector(".timmer p");
      timmerTage.innerHTML = `0${munite}:${
        sec.toString().length == 2 ? sec : `0${sec}`
      }`;
    }, 1000);
  }

  // Card Table
  cardTable() {
    const fontImage = imageList.slice(0, 16);

    fontImage.forEach((src, index) => {
      divCreator(src, index);
    });
  }
  // Click handeller
  cardListclickHandler() {
    const itemList = document.querySelectorAll(".item");

    itemList.forEach((value, index) => {
      // console.log(value);
      value.addEventListener("click", value);
    });
    // item.addEventListener("click", function() {
    //     console.log("click")
    // });
    // console.log("hellow", item);
  }
}

const game = new CardGame();

// game.cardTable();
game.cardListclickHandler();

const cardTableImgStorage = [];
function generateRandomTableImg() {
  const virtualImgList = [...imageList];
  let count = 0;
  while (cardTableImgStorage.length <= 63) {
    const randomIndex = Math.round(Math.random() * 63);
    if (virtualImgList[randomIndex] !== undefined) {
      const [sliceItem] = virtualImgList.splice(randomIndex, 1);
      cardTableImgStorage.push(sliceItem);
    }
    count++;
  }
}

// const person = {
//     name : "Saddam",
//     roll : 01,

//     set changesetRoll(n) {
//         this.roll = n+5;
//     }
// };

// person.changesetRoll = 01;
// console.log(person);

// const rejoan = {
//     name : "rejoan",
//     roll : 01,

//     get changegetName() {
//         return this.name = "Saddam";
//     }
// };

// console.log(rejoan.changegetName);


generateRandomTableImg();
// console.log(cardImgStorage);
cardTableImgStorage.map((item, index) => {
  divCreator(item, index);
});

// console.log(variantList);
