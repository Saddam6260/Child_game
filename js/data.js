// generate image list array with 64 child
const colorList = ["blue", "orange", "violet", "green"];
const shapeList = ["circle", "triangle", "squre", "star"];
const styleList = ["dot", "scale", "non", "fill"];
export const dataWith64Img = [];

colorList.forEach((color) => {
    shapeList.forEach((shape) => {
        styleList.forEach((style) => {
            dataWith64Img.push({
                img: `img/cardList/${color}-${shape}-${style}.png`,
                color: color,
                shape: shape,
                style: style,
            });
        });
    });
});

// random image list array generate with 64 child image
export const dataWith64RandomImg = [];

const virtualImgList = [...dataWith64Img];
let count = 0;
while (dataWith64RandomImg.length <= 63) {
    const randomIndex = Math.round(Math.random() * 63);
    if (virtualImgList[randomIndex] !== undefined) {
        const [sliceItem] = virtualImgList.splice(randomIndex, 1);
        dataWith64RandomImg.push(sliceItem);
    }
    count++;
}
