import {Location, User} from "../types";

const players: User[] = [
    {id: "1", name: {fa: "بازیکن ۱", en: "Player 1"}},
    {id: "2", name: {fa: "بازیکن ۲", en: "Player 2"}},
    {id: "3", name: {fa: "بازیکن ۳", en: "Player 3"}},
];
const locations: Location[] = [
    {id: "1", name: {fa: "بیمارستان", en: "Hospital"}},
    {id: "2", name: {fa: "مدرسه", en: "School"}},
    {id: "3", name: {fa: "کلانتری", en: "Police Station"}},
    {id: "4", name: {fa: "خیابان", en: "Street"}},
    {id: "5", name: {fa: "دانشگاه", en: "University"}},
    {id: "6", name: {fa: "رستوران", en: "Restaurant"}},
    {id: "7", name: {fa: "جنگل", en: "Jungle"}},
    {id: "8", name: {fa: "سیرک", en: "Circus"}},
    {id: "9", name: {fa: "آتشنشانی", en: "Fire Station"}},
    {id: "10", name: {fa: "مسجد", en: "Mosque"}},
    {id: "11", name: {fa: "سینما", en: "Cinema"}},
    {id: "12", name: {fa: "هتل", en: "Hotel"}},
    {id: "13", name: {fa: "پارک", en: "Park"}},
    {id: "14", name: {fa: "استخر", en: "Pool"}},
    {id: "15", name: {fa: "کارخانه", en: "Factory"}},
];
const time = 300;
const spiesLength = 1;
const games = [];

export const defaultData = {
    players,
    locations,
    time,
    spiesLength,
    games,
};
