

export const albums = [
  {
    id: 1,
    title: 'Neon Boulevard',
    artist: 'The Amber Lights',
    year: 2021,
    genre: 'Synthwave',
    price: 1490,
    cover: { from: '#e0863b', to: '#b5482f', shape: 'sun' },
    tracklist: ['Intro', 'Neon Boulevard', 'Midnight Drive', 'Static Hearts', 'Afterglow'],
    description:
      'Атмосферный синтвейв о ночном городе: мокрый асфальт, отражения вывесок и бесконечная трасса вдоль побережья. Тёплые аналоговые синтезаторы и пульсирующий бас.',
  },
  {
    id: 2,
    title: 'Slow Rivers',
    artist: 'Marlow & The Tide',
    year: 2019,
    genre: 'Indie Folk',
    price: 1290,
    cover: { from: '#6a8f6b', to: '#2f4f3a', shape: 'waves' },
    tracklist: ['Morning Fog', 'Slow Rivers', 'Paper Boats', 'Cedar Song', 'Home by Dark'],
    description:
      'Тихий инди-фолк с акустическими гитарами и хрупким вокалом. Пластинка про медленные реки, деревянные дома и долгие прогулки без цели.',
  },
  {
    id: 3,
    title: 'Concrete Garden',
    artist: 'Vantablack Youth',
    year: 2022,
    genre: 'Post-Punk',
    price: 1590,
    cover: { from: '#4b4e6d', to: '#1a1b2b', shape: 'bars' },
    tracklist: ['Grey Bloom', 'Concrete Garden', 'Wire Fence', 'Antenna', 'Static Rain'],
    description:
      'Холодный пост-панк с рублеными гитарами и гулким басом. Городская меланхолия, бетон и попытки прорасти сквозь него.',
  },
  {
    id: 4,
    title: 'Golden Hour Jazz',
    artist: 'Lena Vermeer Quartet',
    year: 2018,
    genre: 'Jazz',
    price: 1790,
    cover: { from: '#d9a441', to: '#7a4a1e', shape: 'circles' },
    tracklist: ['Golden Hour', 'Blue Note Café', 'Slow Sunday', 'Amber Room', 'Last Call'],
    description:
      'Уютный вечерний джаз: мягкий рояль, щётки по барабанам и саксофон цвета заката. Идеально для дождливого вечера с чашкой кофе.',
  },
  {
    id: 5,
    title: 'Voltage',
    artist: 'Kilobyte Kings',
    year: 2023,
    genre: 'Synthwave',
    price: 1490,
    cover: { from: '#ff5f6d', to: '#4b1248', shape: 'grid' },
    tracklist: ['Boot Sequence', 'Voltage', 'Arcade Ghost', 'Overclock', 'Shutdown'],
    description:
      'Быстрый, дерзкий синтвейв с привкусом аркадных автоматов 80-х. Пиксельные закаты, гонки и электрический воздух.',
  },
  {
    id: 6,
    title: 'Dust & Vinyl',
    artist: 'Old Radio Club',
    year: 2017,
    genre: 'Blues',
    price: 1390,
    cover: { from: '#a86b3c', to: '#3a2416', shape: 'sun' },
    tracklist: ['Dust & Vinyl', 'Freight Train', 'Whiskey Moon', 'Broken Radio', 'Long Way Home'],
    description:
      'Пыльный, тёплый блюз, будто снятый со старой бобины. Слайд-гитара, губная гармошка и голос с трещинкой.',
  },
  {
    id: 7,
    title: 'Aurora Frequencies',
    artist: 'North Signal',
    year: 2020,
    genre: 'Ambient',
    price: 1190,
    cover: { from: '#3fa9a1', to: '#123b4a', shape: 'waves' },
    tracklist: ['Polar Drift', 'Aurora Frequencies', 'Ice Bloom', 'Quiet Sky', 'Return'],
    description:
      'Просторный эмбиент про северное сияние: медленные текстуры, далёкие дроны и ощущение бесконечного холодного неба.',
  },
  {
    id: 8,
    title: 'Riot in Amber',
    artist: 'The Amber Lights',
    year: 2024,
    genre: 'Post-Punk',
    price: 1690,
    cover: { from: '#e0863b', to: '#2a1810', shape: 'bars' },
    tracklist: ['Amber Alarm', 'Riot in Amber', 'Glass District', 'No Signal', 'Embers'],
    description:
      'Второй, более злой альбом The Amber Lights: пост-панк-нерв поверх синтвейв-корней. Тревожный, но красивый.',
  },
  {
    id: 9,
    title: 'Paper Moon Sessions',
    artist: 'Lena Vermeer Quartet',
    year: 2015,
    genre: 'Jazz',
    price: 1590,
    cover: { from: '#c9b458', to: '#5c4a1a', shape: 'circles' },
    tracklist: ['Paper Moon', 'Velvet Steps', 'Rainy Uptown', 'Midnight Blue', 'Encore'],
    description:
      'Живая студийная сессия квартета Лены Вермеер, записанная за один вечер. Тёплый ламповый звук и лёгкая импровизация.',
  },
  {
    id: 10,
    title: 'Wildflower Static',
    artist: 'Marlow & The Tide',
    year: 2022,
    genre: 'Indie Folk',
    price: 1390,
    cover: { from: '#c98a9b', to: '#4a2f3a', shape: 'grid' },
    tracklist: ['Wildflower', 'Static Field', 'Two Lanterns', 'Meadowlark', 'Come Down Easy'],
    description:
      'Инди-фолк с электронными вкраплениями: полевые записи, шёпот гитар и мелодии, которые остаются надолго.',
  },
]


export const genres = [...new Set(albums.map((album) => album.genre))].sort()

export function getAlbumById(id) {
  return albums.find((album) => album.id === Number(id))
}
