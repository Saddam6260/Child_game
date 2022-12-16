import { dataWith64Img, dataWith64RandomImg } from "./data.js";

// Timmer Functions

class CardGame {
    constructor() {
        // all card
        this.img = dataWith64Img;
        // all card in random style
        this.randomImg = [...dataWith64RandomImg.splice(0, 4)];
        // the selected card
        this.selectedCardIndex = null;
        this.selectedCard = {};
        // game point
        this.gamePoint = 0;
        // all the table visual card list here
        this.cardTableList = [];
        // play state
        this.gameControlSwitch = {
            playing: false,
            startBegining: true,
            reset: false,
            timer: 60,
            complete: false,
        };
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
        if (this.gameControlSwitch.playing) {
            let counter = count;
            let timmer = setInterval((e) => {
                counter--;
                if ("0" == counter) {
                    clearInterval(timmer);
                }

                // check condition
                if (!this.gameControlSwitch.playing) {
                    clearInterval(timmer);
                }

                // update timer data
                this.gameControlSwitch.timer = counter;
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
            return timmer;
        }
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
    // game complete 
    completeMsg() {

        const container = document.querySelector('.container');
        const leftCard = document.querySelector('#left_card');
        const centerCardTable = document.querySelector('#card_list');
        const rightCard = document.querySelector('#rightCard');

        // hide left and right card 
        
        
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

            // remove click data from storage
            this.cardTableList = this.cardTableList.filter((item, index) => {
                return item ? clickedData.img !== item.img : null;
            });
            // update table card counter
            const [newCard] = this.randomImg.splice(0, 1);
            this.cardTableList.push(newCard);
            // remove clicked card
            if (this.cardTableList.length >= 3) {
                console.log("card length", this.cardTableList.length);
                div.remove();
                this.divCreator(newCard);
            } else {
                div.remove();
                // update game complete
                this.gameControlSwitch.complete = true;
                // remove the last div 
                const lastDiv = document.querySelector("#card_list .item");
                // lastDiv.remove();
                console.log(lastDiv)
            }
            // this.divCreator(this.selectedCard.splice(0, 1));
            this.cardStoreHandler(this.randomImg.length);
            // generate new selected card
            const pickedCard =
                this.cardTableList[
                    Math.floor(Math.random() * (this.cardTableList.length - 1))
                ];

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
        if (this.gameControlSwitch.startBegining) {
            this.cardTableList = this.randomImg.splice(0, 16);
            // this is the card that will see user and select card from the table
            this.selectedCardIndex = Math.floor(
                Math.random() * (this.cardTableList.length - 1)
            );
            const pickedCard = this.cardTableList[this.selectedCardIndex];
            console.log(this.selectedCardIndex);
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
    }
    // game start handler
    start() {
        this.gameEngine();
        this.gameTimer(this.gameControlSwitch.timer);
    }
    // pause game
    pause() {
        console.log("pause switch");
        this.gameControlSwitch.playing = false;
        this.gameControlSwitch.startBegining = false;
    }
    // game control panel
    controlBtnHandler() {
        // play pause btn
        const playPauseBtn = document.querySelector(".play-pause");
        const playPauseIcon = document.querySelector(".play-pause img");

        // execute on play btn click
        playPauseBtn.addEventListener("click", () => {
            // this.gameControlSwitch.playing = true;
            if (this.gameControlSwitch.playing) {
                // on click if game running play pause
                this.pause();
                // replace icon
                playPauseIcon.src = "img/play.png";
                // update playing state
                this.gameControlSwitch.playing = false;
            } else {
                this.gameControlSwitch.playing = true;
                playPauseIcon.src = "img/pause.png";
                // check if the game started before and if it's in playing state
                if (this.gameControlSwitch.playing) {
                    this.start();
                }
            }
        });
    }
    // initialized
    init() {
        this.controlBtnHandler();
    }
}

const game = new CardGame();

game.init();
// game.start()
