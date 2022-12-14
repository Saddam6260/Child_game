import { dataWith64Img, dataWith64RandomImg } from "./data.js";

// Timmer Functions

class CardGame {
    constructor() {
        // all card
        this.img = dataWith64Img;
        // all card in random style
        this.randomImg = dataWith64RandomImg;
        // the selected card
        this.selectedCard = {};
        // game point
        this.gamePoint = 0;
        // all the table visual card list here
        this.cardTableList = [];
        // play state 
        this.play = false;
    }
    // table image generator
    divCreator(data) {
        const cardListContainer = document.getElementById("card_list");
        if (data) {
            const { img, color, shape, style } = data;
            const imgTag = document.createElement("img");
            imgTag.src = img;
            imgTag.alt = "card image";
            imgTag.className = `${shape} ${color} ${style}`;
            const divTage = document.createElement("div");
            divTage.className = "item";
            divTage.appendChild(imgTag);
            cardListContainer.appendChild(divTage);
            // detect click
            divTage.addEventListener("click", () => {
                this.tableCardClickDetector(data, divTage);
            });
        }
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
            this.divCreator(src);
        });
    }
    // card store
    cardStoreHandler(length = 0) {
        const tag = document.querySelector(".cardStore p");
        length ? (tag.innerHTML = length) : (tag.innerHTML = 0);
    }
    // select card counter
    selectCardCounterHandler(data = {}) {
        const selectedCard = document.querySelector(".selectCardCounter img");
        data.img ? (selectedCard.src = data.img) : null;
    }
    // table card click detector
    tableCardClickDetector(clickedData, div) {
        // console.log(div)
        const store = { ...this.selectedCard };
        if (
            clickedData.img === store.img &&
            clickedData.color === store.color &&
            clickedData.shape === store.shape &&
            clickedData.style === store.style
        ) {
            // increment point
            this.gamePointHandler(this.gamePoint + 1);
            // remove clicked card
            div.remove();
            // remove click data from storage
            this.cardTableList = this.cardTableList.filter((item, index) => {
                return clickedData.img !== item.img;
            });
            console.log("card list on table ", this.cardTableList);
            // update table card counter
            const [newCard] = this.randomImg.splice(0, 1);
            this.cardTableList.push(newCard);
            this.divCreator(newCard);
            // this.divCreator(this.selectedCard.splice(0, 1));
            this.cardStoreHandler(this.randomImg.length);
            // generate new selected card
            const pickedCard =
                this.cardTableList[
                    Math.floor(Math.random() * (this.cardTableList.length - 1))
                ];
            console.log("table data", this.cardTableList);
            console.log("picked card", pickedCard);
            // update selected card storage
            this.selectedCard = pickedCard;
            // update selected counter
            this.cardStoreHandler(this.randomImg.length);
            // selected card counter
            this.selectCardCounterHandler(pickedCard);
        } else {
            this.gamePointHandler(this.gamePoint - 1);
        }
    }
    // point increment

    // point decrement
    // game point controller
    gamePointHandler(a) {
        this.gamePoint = a;
        const gamePointHtml = document.querySelector(".gamePoint p");
        gamePointHtml.innerHTML = this.gamePoint;
    }
    // start game
    gameEngine() {
        this.cardTableList = this.randomImg.splice(0, 16);
        // this is the card that will see user and select card from the table
        const pickedCard =
            this.cardTableList[
                Math.floor(Math.random() * (this.cardTableList.length - 1))
            ];
        // update selected card storage
        this.selectedCard = pickedCard;
        // this function will update the table
        this.cardTable(this.cardTableList);
        // store total image length that not been served in table
        this.cardStoreHandler(this.randomImg.length);
        // selected card counter
        this.selectCardCounterHandler(pickedCard);
        // this function will compare data and game point handler
    }
    // game start handler
    start() {
        this.gameEngine();
    }
    // game control panel
    controlBtnHandler() {
        const playPauseBtn = document.querySelector(".play-pause");
        playPauseBtn.addEventListener('click', this.start)
    }
    // initialized 
    init() {
        this.controlBtnHandler()
    }
}

const game = new CardGame();

game.start();
