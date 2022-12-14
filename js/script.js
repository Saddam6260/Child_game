import { dataWith64Img, dataWith64RandomImg } from "./data.js";

// Timmer Functions

class CardGame {
    constructor() {
        this.img = dataWith64Img;
        this.randomImg = dataWith64RandomImg;
    }
    // table image generator
    divCreator(data, div_class) {
        const cardListContainer = document.getElementById("card_list");
        const { img, color, shape, style } = data;
        const imgTag = document.createElement("img");
        imgTag.src = `img/cardList/${img}`;
        imgTag.alt = "card image";
        imgTag.className = `${shape} ${color} ${style}`;
        const divTage = document.createElement("div");
        divTage.className = `item item_${div_class}`;
        divTage.appendChild(imgTag);
        cardListContainer.appendChild(divTage);
    }
    // count down method
    gameTimer(count = 60) {
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
    // Card Table
    cardTable(data) {
        data.forEach((src, index) => {
            this.divCreator(src, index);
        });
    }
    // card store
    cardStoreHandler(length = 0) {
        const tag = document.querySelector('.cardStore p');
        length ? tag.innerHTML = length : tag.innerHTML = 0;
    }
    // select card counter
    selectCardCounterHandler() {}
    // start game
    gameEngine() {
        const storage = [...this.randomImg];
        this.cardTable(storage.splice(0, 16));
        // store total image length that not been served in table
        this.cardStoreHandler(storage.length);
    }
    // game control btns
    controlBtnHandler() {
        
    }
    // game start handler
    start() {
        this.gameEngine();
    }
}

const game = new CardGame();

game.start();
