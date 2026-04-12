export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  dietary?: string[];
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    category: "Issiq taomlar",
    items: [
      { name: "O'zbek lag'mon", description: "An'anaviy qo'l lag'mon, go'sht va sabzavotlar bilan", price: "45,000 so'm" },
      { name: "Dovg'a lag'mon bulyonli", description: "Bulyonda tayyorlangan lag'mon", price: "48,000 so'm" },
      { name: "Kovurma lag'mon", description: "Qovurilgan lag'mon, mol go'shti bilan", price: "50,000 so'm" },
      { name: "Dovnashma lag'mon qo'y go'shti bilan", description: "Qo'y go'shtli maxsus lag'mon", price: "55,000 so'm" },
    ],
  },
  {
    category: "Kabob va grill",
    items: [
      { name: "Qo'y go'shti kabob", description: "Tuzlangan qo'y go'shti, ko'mir ustida pishirilgan", price: "55,000 so'm" },
      { name: "Marmar mol go'shti steygi", description: "Premium marmar go'sht, maxsus tayyorlangan", price: "65,000 so'm" },
      { name: "Shashlik mol go'shti", description: "An'anaviy mol go'sht shashlik", price: "50,000 so'm" },
      { name: "Shashlik yosh qo'zichoq", description: "Yosh qo'zichoq go'shtidan tayyorlangan", price: "60,000 so'm" },
      { name: "Marinavlangan sharqona uslubda", description: "Sharqona ziravorlar bilan marine qilingan", price: "55,000 so'm" },
      { name: "Qo'zichoq qovurg'alari", description: "Nozik pishirilgan qo'zichoq qovurg'alari", price: "65,000 so'm" },
      { name: "Fermer bedana shashlik", description: "Toza fermer bedanasidan tayyorlangan", price: "45,000 so'm" },
      { name: "Jigar shashlik", description: "Yangi jigardan tayyorlangan shashlik", price: "40,000 so'm" },
      { name: "Kiyma kabob", description: "Maydalangan go'shtdan tayyorlangan kabob", price: "42,000 so'm" },
      { name: "Tovuq shashlik", description: "Marine qilingan tovuq go'shti", price: "38,000 so'm" },
      { name: "Qora qo'y tili shashlik", description: "Noyob qora qo'y tili", price: "55,000 so'm" },
      { name: "Marmar mol go'shti shashlik", description: "Premium marmar go'sht shashlik", price: "65,000 so'm" },
      { name: "Sabzavot shashlik", description: "Toza sabzavotlardan shashlik", price: "30,000 so'm", dietary: ["vegetarian"] },
    ],
  },
  {
    category: "Milliy taomlar",
    items: [
      { name: "Mol go'shti manti", description: "An'anaviy bug'da pishirilgan manti", price: "40,000 so'm" },
      { name: "Qovoqli manti", description: "Qovoq solingan manti", price: "35,000 so'm", dietary: ["vegetarian"] },
      { name: "Xonim", description: "O'zbek an'anaviy xonim ruleti", price: "38,000 so'm" },
      { name: "Chuchvara", description: "Kichik o'zbek pel'menilari, bulyonda", price: "40,000 so'm" },
      { name: "Tuxum chuchvara", description: "Tuxumli chuchvara", price: "42,000 so'm" },
      { name: "Qo'y go'shti do'lma", description: "Uzum bargiga o'ralgan qo'y go'shti", price: "45,000 so'm" },
      { name: "O'zbek pel'meni", description: "Nozik qo'y go'shtli pel'men", price: "42,000 so'm" },
      { name: "Qo'y go'shtli cheburek", description: "Qizarilgan cheburek, sersuv", price: "35,000 so'm" },
      { name: "Somsa", description: "An'anaviy tandirda pishirilgan somsa", price: "20,000 so'm" },
    ],
  },
  {
    category: "Palov",
    items: [
      { name: "Kumush palov", description: "Nihol maxsus tayyorlangan palov, mol go'shti bilan", price: "55,000 so'm" },
      { name: "To'y palovi", description: "An'anaviy to'y palovi", price: "50,000 so'm" },
      { name: "Qo'y go'shtli palov", description: "Qo'y go'shti bilan tayyorlangan palov", price: "52,000 so'm" },
    ],
  },
  {
    category: "Salatlar",
    items: [
      { name: "Achichiq", description: "An'anaviy o'zbek pomidor-piyoz salati", price: "20,000 so'm", dietary: ["vegetarian", "vegan"] },
      { name: "Sharq salati", description: "Sharqona uslubdagi salat", price: "28,000 so'm", dietary: ["vegetarian"] },
      { name: "Sezar salati", description: "Tovuq go'shti, krutonlar, parmezan", price: "35,000 so'm" },
      { name: "Mavsum salati", description: "Mavsumiy toza sabzavotlar", price: "25,000 so'm", dietary: ["vegetarian", "vegan"] },
    ],
  },
  {
    category: "Ichimliklar",
    items: [
      { name: "Kompot", description: "An'anaviy mevali kompot", price: "15,000 so'm", dietary: ["vegetarian", "vegan"] },
      { name: "Ayron", description: "Yangi tayyorlangan ayron", price: "12,000 so'm", dietary: ["vegetarian"] },
      { name: "Ko'k choy", description: "O'zbek an'anaviy ko'k choyi", price: "10,000 so'm", dietary: ["vegetarian", "vegan"] },
      { name: "Qora choy", description: "Limonli qora choy", price: "10,000 so'm", dietary: ["vegetarian", "vegan"] },
      { name: "Limonad", description: "Uy limonadi", price: "18,000 so'm", dietary: ["vegetarian", "vegan"] },
    ],
  },
];
