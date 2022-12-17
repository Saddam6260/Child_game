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
            timer: 5,
            complete: false,
            gamePosition: "start", // start , continue , complete
        };
    }

    // view updater
    viewClassUpdater(newClass = "") {
        const getSection = document.querySelector("#game-wrap");

        getSection.classList.remove(getSection.classList[0]);
        getSection.classList.add(newClass);
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

                // if counter 0 then show timeout message
                if (!this.gameControlSwitch.timer) {
                    this.viewClassUpdater("complete");
                    this.completeMsg(
                        "Sory, just run out of time. Please try again"
                    );
                }
                // time spliter
                const muniteSec = [0, 0];
                muniteSec[0] = Math.floor(this.gameControlSwitch.timer / 60);
                muniteSec[1] =
                    this.gameControlSwitch.timer <= 59
                        ? this.gameControlSwitch.timer
                        : this.gameControlSwitch.timer - 60 * muniteSec[0];
                let [munite, sec] = muniteSec;

                // Update counter
                if (this.gameControlSwitch.gamePosition !== "complete") {
                    const timmerTage = document.querySelector(".timmer p");
                    timmerTage.innerHTML = `0${munite}:${
                        sec.toString().length == 2 ? sec : `0${sec}`
                    }`;
                }
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
    completeMsg(text = false) {
        const getMsg = document.querySelector(".complete-msg .game-details");
        getMsg.innerHTML =
            text ||
            `   <p>You have completed the game successfully</p>
                <p>in ${this.gameControlSwitch.timer}s and got ${this.gamePoint}</p>
            `;
        console.log(getMsg);
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
                div.remove();
                this.divCreator(newCard);
            } else {
                div.remove();
                // update game complete
                this.gameControlSwitch.complete = true;
                // remove the last div
                const lastDiv = document.querySelector("#card_list .item");
                lastDiv.remove();
                this.gameControlSwitch.gamePosition = "complete";
                this.viewClassUpdater(this.gameControlSwitch.gamePosition);
                // stop timer
                this.gameControlSwitch.playing = false;
                this.completeMsg();
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

    // reset button
    reset() {}
    // game control panel
    controlBtnHandler() {
        const gameWrap = document.querySelector("section#game-wrap");

        // reset btn
        const getResetBtn = document.querySelector(".reset");
        getResetBtn.addEventListener("click", () => {
            location.reload();
        });

        // play pause btn
        const playPauseBtn = document.querySelector(".play-pause");
        const playPauseIcon = document.querySelector(".play-pause img");

        // start msg play btn
        const startMsgPlayBtn = document.querySelector("#msgStartBtn");
        startMsgPlayBtn.addEventListener("click", () => {
            gameWrap.classList.replace("start", "continue");
            PlayHandler();
        });

        // execute on play btn click
        playPauseBtn.addEventListener("click", () => {
            PlayHandler();
        });
        // PlayHandler().bind(this);
        const PlayHandler = () => {
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
        };
    }
    // initialized
    init() {
        this.gameControlSwitch.gamePosition = "start";
        this.viewClassUpdater(this.gameControlSwitch.gamePosition);
        this.controlBtnHandler();
    }
}

const game = new CardGame();

game.init();
// game.start()
