// export const getRandomBG = () => {
//     const colors = ["#F6b100", "#2e4a40", "#555555", "#ababab", "#888888", "#025cca", "#035cca", "#999555", "#664a04", "#aa7705"];
//     return colors[Math.floor(Math.random() * colors.length)];
// }

export const getBgColor = () => {
    const bgarr = ["#002551ff", "#3e3c23ff", "#553e04ff", "#263e36ff", "#353535ff", "#0a3468ff", "#035cca", "#999555", "#F6b100", "#ababab", "#888888", "#aa7705"];
    const randomBg = Math.floor(Math.random() * bgarr.length);
    const color = bgarr[randomBg];
    return color;
}

export const getAvatarName = (name) => {
    if (!name) return "";
    return name.split(" ").map(word => word[0]).join("").toUpperCase();
}

export const formatDate = (date) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Format: Month Day, Year (e.g., January 01, 2023)
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
        2,
        "0"
    )}, ${date.getFullYear()}`;
};