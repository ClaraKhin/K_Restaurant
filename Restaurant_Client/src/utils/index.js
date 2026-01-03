export const getRandomBG = () => {
    const colors = ["#F6b100", "#2e4a40", "#555555", "#ababab", "#888888", "#025cca", "#035cca", "#999555", "#664a04", "#aa7705"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// export const getBgColor = () => {
//     const bgarr = ["#002551ff", "#3e3c23ff", "#553e04ff", "#263e36ff", "#353535ff", "#0a3468ff"];
//     const randomBg = Math.floor(Math.random() * bgarr.length);
//     const color = bgarr[randomBg];
//     return color;
// }