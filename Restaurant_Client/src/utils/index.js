export const getRandomBG = () => {
    const colors = ["#F6b100", "#2e4a40", "#555555", "#ababab", "#888888", "#025cca", "#035cca", "#999555", "#664a04", "#aa7705"];
    return colors[Math.floor(Math.random() * colors.length)];
} 