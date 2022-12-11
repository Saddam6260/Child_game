const variantList = {
    color: [
        {
            type: "blue",
            value: [],
        },
        {
            type: "orange",
            value: [],
        },
        {
            type: "violet",
            value: [],
        },
        {
            type: "green",
            value: [],
        },
    ],

    shape: [
        {
            type: "cricle",
            value: [],
        },
        {
            type: "triangle",
            value: [],
        },
        {
            type: "squre",
            value: [],
        },
        {
            type: "star",
            value: [],
        },
    ],

    style: [
        {
            type: "dot",
            value: [],
        },
        {
            type: "scale",
            value: [],
        },
        {
            type: "non",
            value: [],
        },
        {
            type: "fill",
            value: [],
        },
    ],
};
const colorList = ["blue", "orange", "violet", "green"];
const imageList = [];
let i = 0;

colorList.forEach((color) => {
    const shape = ["circle", "triangle", "squre", "star"];
    shape.forEach((shape) => {
        const style = ["dot", "scale", "non", "fill"];

        style.forEach((style) => {
            imageList.push({ img: `${color}-${shape}-${style}` });
            i += 1;

            const word = imageList[i - 1];
            const letter = word.img.charAt(0);

            if (letter == "b") {
                variantList.color[0].value.push(`${color}-${shape}-${style}`);
                variantList.shape[0].value.push(`${color}-${shape}-${style}`);
                variantList.style[0].value.push(`${color}-${shape}-${style}`);
            } else if (letter == "o") {
                variantList.color[1].value.push(`${color}-${shape}-${style}`);
                variantList.shape[1].value.push(`${color}-${shape}-${style}`);
                variantList.style[1].value.push(`${color}-${shape}-${style}`);
            } else if (letter == "v") {
                variantList.color[2].value.push(`${color}-${shape}-${style}`);
                variantList.shape[2].value.push(`${color}-${shape}-${style}`);
                variantList.style[2].value.push(`${color}-${shape}-${style}`);
            } else if (letter == "g") {
                variantList.color[3].value.push(`${color}-${shape}-${style}`);
                variantList.shape[3].value.push(`${color}-${shape}-${style}`);
                variantList.style[3].value.push(`${color}-${shape}-${style}`);
            }
        });
    });
});

// console.log(variantList.color);
// console.log(variantList.shape);
// console.log(variantList.style);

// console.log(imageList);
// console.log(typeof(imageList));

const cardListContainer = document.getElementById("card_list");

// create div

const divCreator = (imgLink, div_class) => {
    const imgTag = document.createElement("img");
    imgTag.src = imgLink;
    imgTag.alt = "No image show";
    imgTag.style.height = "60px";
    imgTag.style.width = "60px";

    const divTage = document.createElement("div");
    divTage.className = `item item_${div_class}`;

    divTage.appendChild(imgTag);
    cardListContainer.appendChild(divTage);
};

// genaret div

// cardList.map((name, num) => {
//     divCreator(name.src, num+1);
// });

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
            muniteSec[1] =
                counter <= 59 ? counter : counter - 60 * muniteSec[0];
            let [munite, sec] = muniteSec;

            // Update counter
            const timmerTage = document.querySelector(".timmer p");
            timmerTage.innerHTML = `0${munite}:${
                sec.toString().length == 2 ? sec : `0${sec}`
            }`;
        }, 1000);
    }
}

const game = new CardGame();
console.log(game.allCardlist());
console.log(game.counDown(71));
