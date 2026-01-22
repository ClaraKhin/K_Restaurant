import PekingDuck from "../assets/images/Peking_Duck.png";
import KungPaoChicken from "../assets/images/KungPao_Chicken.png";
import XiaoLongBao from "../assets/images/Xiao_Long_Bao.png";
import MalaXiangGuo from "../assets/images/MalaXiangGuo.jpeg";
import SiuMai from "../assets/images/Siu_Mai.jpeg";
import ChowMein from "../assets/images/Chow_Mein.png";
import SweetSourPork from "../assets/images/Sweet_Sour_Pork.png";
import Hotpot from "../assets/images/Hotpot.jpeg";
import BeefNoodleSoup from "../assets/images/Beef_Noodle_Soup.png";
import FriedRice from "../assets/images/Fried_Rice.png";

export const popularDishes = [
    {
        id: 1,
        image: PekingDuck,
        name: "Peking Duck",
        price: "24.99",
        numberOfOrders: 250,
    },
    {
        id: 2,
        image: XiaoLongBao,
        name: "Xiao Long Bao",
        price: "9.99",
        numberOfOrders: 190,
    },
    {
        id: 3,
        image: KungPaoChicken,
        name: "Kung Pao Chicken",
        price: "13.99",
        numberOfOrders: 220,
    },
    {
        id: 4,
        image: MalaXiangGuo,
        name: "Mala Xiang Guo",
        price: "16.99",
        numberOfOrders: 180,
    },
    {
        id: 5,
        image: SiuMai,
        name: "Siu Mai",
        price: "8.99",
        numberOfOrders: 200,
    },
    {
        id: 6,
        image: ChowMein,
        name: "Chow Mein",
        price: "11.99",
        numberOfOrders: 170,
    },
    {
        id: 7,
        image: SweetSourPork,
        name: "Sweet and Sour Pork",
        price: "14.99",
        numberOfOrders: 210,
    },
    {
        id: 8,
        image: Hotpot,
        name: "Hotpot",
        price: "22.99",
        numberOfOrders: 180,
    },
    {
        id: 9,
        image: BeefNoodleSoup,
        name: "Beef Noodle Soup",
        price: "13.99",
        numberOfOrders: 190,
    },
    {
        id: 10,
        image: FriedRice,
        name: "Fried Rice",
        price: "10.99",
        numberOfOrders: 200,
    }
]

export const tables = [
    { id: 1, name: "Table 1", status: "Booked", initials: "AM", seats: 4 },
    { id: 2, name: "Table 2", status: "Available", initials: "JS", seats: 2 },
    { id: 3, name: "Table 3", status: "Booked", initials: "LW", seats: 6 },
    { id: 4, name: "Table 4", status: "Available", initials: "KH", seats: 8 },
    { id: 5, name: "Table 5", status: "Booked", initials: "RT", seats: 2 },
    { id: 6, name: "Table 6", status: "Available", initials: "MC", seats: 4 },
    { id: 7, name: "Table 7", status: "Booked", initials: "SG", seats: 6 },
    { id: 8, name: "Table 8", status: "Available", initials: "PL", seats: 8 },
    { id: 9, name: "Table 9", status: "Booked", initials: "DN", seats: 2 },
    { id: 10, name: "Table 10", status: "Available", initials: "VB", seats: 4 },
]

export const desserts = [
    { id: 1, name: "Mango Pudding", price: "4.99" },
    { id: 2, name: "Sesame Balls", price: "3.99" },
    { id: 3, name: "Egg Tart", price: "2.99" },
    { id: 4, name: "Tang Yuan (Rice Balls)", price: "4.49" },
    { id: 5, name: "Sweet Red Bean Soup", price: "3.99" },
    { id: 6, name: "Sweet Tofu Pudding", price: "3.49" },
    { id: 7, name: "Pineapple Bun", price: "2.99" },
    { id: 8, name: "Fried Milk Cubes", price: "4.99" },
    { id: 9, name: "Grass Jelly Dessert", price: "3.49" },
    { id: 10, name: "Mango Sago", price: "5.49" },
];


export const starterItems = [
    { id: 1, name: "Spring Rolls", price: "5.99", category: "Vegetarian" },
    { id: 2, name: "Fried Dumplings", price: "6.99", category: "Non-Vegetarian" },
    { id: 3, name: "Steamed Dumplings", price: "6.49", category: "Non-Vegetarian" },
    { id: 4, name: "Chicken Wontons", price: "5.99", category: "Non-Vegetarian" },
    { id: 5, name: "Crispy Wontons", price: "4.99", category: "Vegetarian" },
    { id: 6, name: "Sesame Balls", price: "3.99", category: "Vegetarian" },
    { id: 7, name: "Salt & Pepper Tofu", price: "5.49", category: "Vegetarian" },
    { id: 8, name: "Cucumber Salad", price: "3.99", category: "Vegetarian" },
    { id: 9, name: "Edamame with Sea Salt", price: "4.49", category: "Vegetarian" },
    { id: 10, name: "Chicken Satay Skewers", price: "6.99", category: "Non-Vegetarian" },
];


export const mainCourse = [
    { id: 1, name: "Kung Pao Chicken", price: "12.99", category: "Non-Vegetarian" },
    { id: 2, name: "Sweet and Sour Chicken", price: "11.99", category: "Non-Vegetarian" },
    { id: 3, name: "General Tso’s Chicken", price: "12.99", category: "Non-Vegetarian" },
    { id: 4, name: "Beef with Broccoli", price: "13.99", category: "Non-Vegetarian" },
    { id: 5, name: "Szechuan Beef", price: "14.49", category: "Non-Vegetarian" },
    { id: 6, name: "Mapo Tofu", price: "11.49", category: "Vegetarian" },
    { id: 7, name: "Ma La Xiang Guo (Chicken/ Pork)", price: "16.99", category: "Non-Vegetarian" },

    { id: 8, name: "Peking Duck", price: "24.99", category: "Non-Vegetarian" },
    { id: 9, name: "Shrimp Fried Rice", price: "11.99", category: "Non-Vegetarian" },
    { id: 10, name: "Chicken Fried Rice", price: "10.99", category: "Non-Vegetarian" },
    { id: 11, name: "Vegetable Fried Rice", price: "9.99", category: "Vegetarian" },

    { id: 12, name: "Chow Mein (Chicken)", price: "11.49", category: "Non-Vegetarian" },
    { id: 13, name: "Chow Mein (Beef)", price: "12.49", category: "Non-Vegetarian" },
    { id: 14, name: "Dan Dan Noodles", price: "11.99", category: "Non-Vegetarian" },
    { id: 15, name: "Hot Pot (Single Serving)", price: "16.99", category: "Non-Vegetarian" },
];


export const beverages = [
    { id: 1, name: "Chinese Hot Tea", price: "2.49" },
    { id: 2, name: "Jasmine Tea", price: "2.99" },
    { id: 3, name: "Oolong Tea", price: "2.99" },
    { id: 4, name: "Green Tea", price: "2.49" },
    { id: 5, name: "Iced Lemon Tea", price: "3.49" },
    { id: 6, name: "Soy Milk", price: "3.49" },
    { id: 7, name: "Plum Juice", price: "3.99" },
    { id: 8, name: "Lychee Juice", price: "3.99" },
    { id: 9, name: "Coconut Juice", price: "3.49" },
    { id: 10, name: "Bubble Milk Tea", price: "4.99" },
    { id: 11, name: "Soft Drinks", price: "2.99" },
    { id: 12, name: "Bottled Water", price: "1.99" },
];

export const soups = [
    { id: 1, name: "Hot and Sour Soup", price: "4.99", category: "Vegetarian" },
    { id: 2, name: "Wonton Soup", price: "4.99", category: "Non-Vegetarian" },
    { id: 3, name: "Egg Drop Soup", price: "3.99", category: "Vegetarian" },
    { id: 4, name: "Chicken Corn Soup", price: "4.49", category: "Non-Vegetarian" },
    { id: 5, name: "Sweet Corn Soup", price: "3.99", category: "Vegetarian" },
    { id: 6, name: "Vegetable Soup", price: "3.99", category: "Vegetarian" },
    { id: 7, name: "Seafood Soup", price: "6.99", category: "Non-Vegetarian" },
    { id: 8, name: "Tom Yum Soup (Chinese Style)", price: "5.99", category: "Non-Vegetarian" },
];


export const pizzas = [
    { id: 1, name: "Chicken Teriyaki Pizza", price: "11.99" },
    { id: 2, name: "BBQ Chicken Pizza", price: "11.49" },
    { id: 3, name: "Vegetable Supreme Pizza", price: "10.99" },
    { id: 4, name: "Cheese Pizza", price: "9.99" },
];

export const alcoholicDrinks = [
    { id: 1, name: "Tsingtao Beer", price: "5.99" },
    { id: 2, name: "Snow Beer", price: "5.49" },
    { id: 3, name: "Tiger Beer", price: "5.99" },
    { id: 4, name: "Shaoxing Rice Wine", price: "6.99" },
    { id: 5, name: "Plum Wine (Umeshu)", price: "6.49" },
    { id: 6, name: "Chinese Baijiu (Small Shot)", price: "7.99" },
    { id: 7, name: "Red Wine (House)", price: "6.99" },
    { id: 8, name: "White Wine (House)", price: "6.99" },
];

export const salads = [
    { id: 1, name: "Chinese Cucumber Salad", price: "4.49", category: "Vegetarian" },
    { id: 2, name: "Cold Sesame Noodle Salad", price: "5.99", category: "Vegetarian" },
    { id: 3, name: "Chicken Glass Noodle Salad", price: "6.99", category: "Non-Vegetarian" },
    { id: 4, name: "Seaweed Salad", price: "4.99", category: "Vegetarian" },
    { id: 5, name: "Wood Ear Mushroom Salad", price: "5.49", category: "Vegetarian" },
    { id: 6, name: "Smashed Cucumber with Garlic", price: "4.49", category: "Vegetarian" },
    { id: 7, name: "Cold Tofu Salad", price: "4.99", category: "Vegetarian" },
    { id: 8, name: "Spicy Beef Salad", price: "7.99", category: "Non-Vegetarian" },
];



export const menus = [
    { id: 1, name: "Starters", bgColor: "#002551ff", icon: "🥟", items: starterItems },
    { id: 2, name: "Main Course", bgColor: "#3e3c23ff", icon: "🍜", items: mainCourse },
    { id: 3, name: "Beverages", bgColor: "#553e04ff", icon: "🍵", items: beverages },
    { id: 4, name: "Soup", bgColor: "#263e36ff", icon: "🍲", items: soups },
    { id: 5, name: "Desserts", bgColor: "#353535ff", icon: "🍧", items: desserts },
    { id: 6, name: "Pizzas", bgColor: "#0a3468ff", icon: "🍕", items: pizzas },
    { id: 7, name: "Alcholic Drinks", bgColor: "#423434ff", icon: "🍺", items: alcoholicDrinks },
    { id: 8, name: "Salads", bgColor: "#035220ff", icon: "🥗", items: salads },
]

export const metricsData = [
    { title: "Revenue", value: "₹50,846.90", percentage: "12%", color: "#025cca", isIncrease: false },
    { title: "Outbound Clicks", value: "10,342", percentage: "16%", color: "#02ca3a", isIncrease: true },
    { title: "Total Customer", value: "19,720", percentage: "10%", color: "#f6b100", isIncrease: true },
    { title: "Event Count", value: "20,000", percentage: "10%", color: "#be3e3f", isIncrease: false },
];

export const itemsData = [
    { title: "Total Categories", value: "8", percentage: "12%", color: "#5b45b0", isIncrease: false },
    { title: "Total Dishes", value: "50", percentage: "12%", color: "#285430", isIncrease: true },
    { title: "Active Orders", value: "12", percentage: "12%", color: "#735f32", isIncrease: true },
    { title: "Total Tables", value: "10", color: "#7f167f" }
];

export const orders = [
    {
        id: "101",
        customer: "Amrit Raj",
        status: "Ready",
        dateTime: "January 18, 2025 08:32 PM",
        items: 8,
        tableNo: 3,
        total: 250.0,
    },
    {
        id: "102",
        customer: "John Doe",
        status: "In Progress",
        dateTime: "January 18, 2025 08:45 PM",
        items: 5,
        tableNo: 4,
        total: 180.0,
    },
    {
        id: "103",
        customer: "Emma Smith",
        status: "Ready",
        dateTime: "January 18, 2025 09:00 PM",
        items: 3,
        tableNo: 5,
        total: 120.0,
    },
    {
        id: "104",
        customer: "Chris Brown",
        status: "In Progress",
        dateTime: "January 18, 2025 09:15 PM",
        items: 6,
        tableNo: 6,
        total: 220.0,
    },
];

