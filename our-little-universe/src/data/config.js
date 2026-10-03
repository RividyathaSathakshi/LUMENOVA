/* =====================================================================
   OUR LITTLE UNIVERSE — CENTRAL CONFIGURATION
   ---------------------------------------------------------------------
   Everything personal lives in this one file: names, dates, text,
   video + poster paths, music, letters, questions and Easter eggs.
   Edit here; the components read from it and never need rewriting.
   ===================================================================== */

// Resolves a file inside /public no matter where the site is hosted.
const asset = (path) => `${import.meta.env.BASE_URL}${path}`

/* ---------------------------------------------------------------------
   NAMES
   ------------------------------------------------------------------- */
export const PEOPLE = {
  her: 'Childu',
  him: 'Gubbi',
  nickname: 'Kappi', // spelled exactly like this, always
}

/* ---------------------------------------------------------------------
   KEY DATES (edit freely — shown exactly as written)
   ------------------------------------------------------------------- */
export const DATES = {
  storyBegan: 'July 15, 2024',
  official: 'January 28, 2025',
  hisBirthday: 'March 19',
  herBirthday: 'January 12',
  valentines: 'February 14',
  firstDate: 'January 28',
}

/* ---------------------------------------------------------------------
   VIDEOS — drop AI-generated clips into public/videos/ with these names.
   Optional poster images go in public/posters/ (same name, .jpg).
   If a file is missing, an animated chibi placeholder is shown instead.
   ------------------------------------------------------------------- */
const video = (name) => ({
  src: asset(`videos/${name}.mp4`),
  poster: asset(`posters/${name}.jpg`),
  file: `public/videos/${name}.mp4`,
})

// Show the expected filename on placeholders (handy while adding clips).
// Set to false before sharing if some clips are still missing.
export const SHOW_PLACEHOLDER_HINTS = true

export const VIDEOS = {
  intro: { ...video('intro_superhero'), title: 'Cinematic opening', scene: 'rooftops' },
  college: { ...video('college_meeting'), title: 'How our story began', scene: 'college' },
  food: { ...video('food_spot'), title: 'Our college food spot', scene: 'food' },
  firstDate: { ...video('first_date'), title: 'Our first date', scene: 'date' },
  birthdayKiss: { ...video('birthday_first_kiss'), title: 'His birthday & our first kiss', scene: 'kiss' },
  valentines: { ...video('valentines_gifts'), title: 'Handmade Valentine’s gifts', scene: 'gifts' },
  ganchali: { ...video('ganchali_jasthi'), title: 'Ganchali Jasthi', scene: 'drama' },
  lateNight: { ...video('late_night_texting'), title: 'Late-night texting', scene: 'night' },
  ldr: { ...video('ldr_missing_you'), title: 'Missing each other', scene: 'distance' },
  motorcycle: { ...video('motorcycle_hug'), title: 'The motorcycle hug', scene: 'ride' },
  kulfi: { ...video('virtual_kulfi_date'), title: 'Virtual kulfi date', scene: 'kulfi' },
  reunion: { ...video('final_reunion'), title: 'Final reunion', scene: 'reunion' },
}

/* ---------------------------------------------------------------------
   MUSIC — put your own (authorised) audio files in public/audio/.
   MAIN_TRACK_INDEX picks which song the ENTER button starts.
   Missing files are detected and shown as "Music unavailable".
   ------------------------------------------------------------------- */
export const MUSIC = {
  tracks: [
    {
      id: 'slut',
      title: 'Slut! (Taylor’s Version)',
      artist: 'Taylor Swift',
      src: asset('audio/our_song.mp3'),
      file: 'public/audio/our_song.mp3',
    },
    {
      id: 'harleys',
      title: 'Harleys in Hawaii',
      artist: 'Katy Perry',
      src: asset('audio/harleys_in_hawaii.mp3'),
      file: 'public/audio/harleys_in_hawaii.mp3',
    },
  ],
  MAIN_TRACK_INDEX: 0,
  defaultVolume: 0.6,
  // Optional: switch songs when a chapter scrolls into view.
  // Keys are section ids (see SECTIONS below), values are track ids.
  // Leave empty {} to let one song play uninterrupted.
  // Example: { motorcycle: 'harleys', ending: 'slut' }
  sectionTracks: {},
}

/* ---------------------------------------------------------------------
   CHAPTERS (navigation order)
   ------------------------------------------------------------------- */
export const SECTIONS = [
  { id: 'intro', label: 'Our World', icon: '🌙' },
  { id: 'timeline', label: 'Our Story', icon: '📅' },
  { id: 'food', label: 'Headquarters', icon: '🍴' },
  { id: 'jokes', label: 'Inside Jokes', icon: '😂' },
  { id: 'love', label: 'Why You', icon: '💌' },
  { id: 'distance', label: 'Distance', icon: '📍' },
  { id: 'latenight', label: 'Late Nights', icon: '📱' },
  { id: 'meet', label: 'When We Meet', icon: '🫂' },
  { id: 'motorcycle', label: 'The Ride', icon: '🏍️' },
  { id: 'chibi', label: 'Chibi Story', icon: '🎬' },
  { id: 'letters', label: 'Open When', icon: '✉️' },
  { id: 'kulfi', label: 'Kulfi Date', icon: '🍨' },
  { id: 'secret', label: 'Secret', icon: '🔐' },
  { id: 'ending', label: 'The End?', icon: '❤️' },
]

/* ---------------------------------------------------------------------
   OPENING
   ------------------------------------------------------------------- */
export const OPENING = {
  title: 'FOR MY GUBBI ❤️',
  subtitle: 'A little universe made just for you.',
  button: 'ENTER OUR WORLD →',
  introLine: 'Two little heroes. Two rooftops. One very dramatic love story.',
}

/* ---------------------------------------------------------------------
   TIMELINE — order here is the order shown. Dates are editable;
   no years are invented for memories that didn't come with one.
   ------------------------------------------------------------------- */
export const TIMELINE = [
  {
    id: 'begin',
    date: DATES.storyBegan,
    label: 'The beginning',
    text: 'And somehow, it all began...',
    detail: 'We met through college. You were my senior.',
    video: 'college',
  },
  {
    id: 'official',
    date: DATES.official,
    label: 'Our official date',
    text: 'The day we became us ❤️',
    detail: 'Officially Childu & Gubbi.',
    special: 'heart',
  },
  {
    id: 'birthday-kiss',
    date: DATES.hisBirthday,
    label: 'His birthday',
    text: 'The birthday that gave me a kiss.',
    detail: 'Our first kiss. And you looked so, so cute that day.',
    video: 'birthdayKiss',
  },
  {
    id: 'her-birthday',
    date: DATES.herBirthday,
    label: 'My birthday',
    text: 'The day you made my birthday feel like it belonged to me.',
    detail: 'You made me feel so special.',
    special: 'cake',
  },
  {
    id: 'valentines',
    date: DATES.valentines,
    label: 'Valentine’s Day',
    text: 'You didn’t just give me gifts. You gave me your effort.',
    detail: 'Cute handmade gifts, made with so much effort.',
    video: 'valentines',
  },
  {
    id: 'first-date',
    date: DATES.firstDate,
    label: 'Our first date',
    text: 'Our first date. My favourite kind of day.',
    detail:
      'Roaming the city, you doing the things I liked, handmade flowers, so much food, shopping, game zones, and hours and hours together.',
    video: 'firstDate',
  },
]

/* ---------------------------------------------------------------------
   COLLEGE FOOD SPOT
   ------------------------------------------------------------------- */
export const FOOD_SPOT = {
  title: 'It wasn’t just a food place.',
  punchline: 'It was basically our headquarters. 😂',
  intro: 'Right in front of college. Breakfast, lunch, and everything in between.',
  button: 'ORDER OUR MEMORIES 🍴',
  menu: [
    { icon: '🍳', name: 'Breakfast', desc: 'The morning plate before class. Or before deciding class could wait. 👀' },
    { icon: '🍛', name: 'Lunch', desc: 'Same place, same us, back again by afternoon.' },
    { icon: '😜', name: 'Teasing', desc: 'Served hot, every single day. Refills unlimited.' },
    { icon: '😤', name: 'Fighting', desc: 'Arguing across the table, then somehow laughing two minutes later.' },
    { icon: '🫶', name: 'Hanging out', desc: 'Doing nothing, together, for way too long. Perfect.' },
    { icon: '🏃', name: 'Little adventures', desc: 'Sometimes the bunk plan started right here. HQ, remember?' },
  ],
}

/* ---------------------------------------------------------------------
   INSIDE JOKES
   ------------------------------------------------------------------- */
export const INSIDE_JOKES = {
  ganchali: {
    title: 'Ganchali Jasthi',
    meaning: 'Too much overacting. Getting way, way too hyped.',
    line: 'Ganchali Jasthi aythu. 😂',
    childuLines: ['Gubbiii, this is the WORST day of my life 😭', 'Nobody understands me!!', 'I’m being totally normal right now.'],
  },
  kappi: {
    title: 'Kappi',
    text: 'One of our names. Nobody else gets to know why it’s perfect.',
  },
  balalala: {
    title: 'Balalala',
    meaning: 'Blabbering. Endlessly. Adorably (debatable).',
    activated: 'Balalala mode: ACTIVATED. 😂',
  },
  moods: {
    title: 'Gubbi’s mood swings',
    line: 'Mood swings for absolutely no reason. 😂',
    sequence: ['happy', 'pout', 'laugh', 'annoyed', 'love', 'surprised', 'sleepy'],
    labels: {
      happy: 'Smiling',
      pout: 'Sulking',
      laugh: 'Laughing',
      annoyed: 'Mildly annoyed',
      love: 'Suddenly cute',
      surprised: 'Shocked',
      sleepy: 'Sleepy',
    },
  },
  teasing: {
    title: 'Professional teaser',
    actions: [
      { id: 'forehead', label: 'Forehead tap', gubbi: '*tap* 😝', childu: 'Heyyy! 😤' },
      { id: 'cheek', label: 'Cheek poke', gubbi: 'Boop. 😆', childu: 'Gubbiii! 🙈' },
      { id: 'mustache', label: 'The little mustache', gubbi: 'Hehe, mustache 😂', childu: 'Don’t you dare 😭😂' },
    ],
    footer: 'Then we both laugh. Every time.',
  },
}

/* ---------------------------------------------------------------------
   THINGS I LOVE ABOUT HIM
   ------------------------------------------------------------------- */
export const LOVE_REASONS = [
  { icon: '👀', text: 'Your eyes.' },
  { icon: '😊', text: 'Your smile.' },
  { icon: '💋', text: 'Your lips.' },
  { icon: '💇‍♂️', text: 'Your hair.' },
  { icon: '🫶', text: 'Your caring nature.' },
  { icon: '💪🏻', text: 'Your biceps. 💪🏻' },
  { icon: '🦸‍♂️', text: 'Your strength.' },
  { icon: '⚡', text: 'Your energy throughout the day.' },
  { icon: '🤫', text: 'How you sometimes keep your problems to yourself instead of worrying me.' },
  { icon: '🧩', text: 'How easily you solve problems, mine or yours, and make them feel manageable.' },
  { icon: '🥺', text: 'How cute you are.' },
]
export const LOVE_FINAL = 'Basically... you. ❤️'

/* ---------------------------------------------------------------------
   LONG DISTANCE
   ------------------------------------------------------------------- */
export const DISTANCE = {
  title: 'Then distance happened.',
  text: 'The hardest part isn’t the distance. It’s not being able to see you whenever I want.',
  question: 'What do I miss most?',
  answer: 'Your presence.',
  placeA: 'Childu’s village',
  placeB: 'Gubbi’s village',
  travel: '~30 minutes apart',
  context: 'You graduated, and suddenly “every day” became “whenever we can.”',
  habits: [
    { icon: '💬', text: 'Chatting all day' },
    { icon: '📸', text: 'Pictures & videos of our days' },
    { icon: '📞', text: 'Calls daily (when we’re okay)' },
    { icon: '🎥', text: 'Video calls about once a week' },
    { icon: '🤐', text: 'Silent treatment days when we fight' },
  ],
}

/* ---------------------------------------------------------------------
   LATE NIGHT
   ------------------------------------------------------------------- */
export const LATE_NIGHT = {
  title: 'Our late-night world',
  subtitle: 'Under the blanket. Phone brightness on lowest. Giggling anyway.',
  childu: 'I was waiting for you... 🥺🐥',
  gubbi: 'You fell asleep without saying good night.',
}

/* ---------------------------------------------------------------------
   WHEN WE FINALLY MEET
   ------------------------------------------------------------------- */
export const MEET_LINES = [
  'When I finally see you...',
  'I’m going to hug you and not let you go.',
  'Kiss your whole face.',
  'And fall asleep in your big-boy arms.',
  'You’re my baby boy. 🥺🐥',
  'And yes... I still love your tits.',
]

/* ---------------------------------------------------------------------
   MOTORCYCLE
   ------------------------------------------------------------------- */
export const MOTORCYCLE = {
  lines: ['My favourite place isn’t a location.', 'It’s wherever I’m holding onto you. ❤️'],
  caption: 'Helmets on. Arms tight. You driving carefully, me holding on like you’re the safest place in the world.',
}

/* ---------------------------------------------------------------------
   CHIBI LOVE STORY — individual clips played in sequence.
   `video` is a key from VIDEOS. Items without a video (or whose file
   is missing) show an illustrated card for `seconds` and move on.
   ------------------------------------------------------------------- */
export const CHIBI_STORY = {
  title: 'Our story, but make it chibi. 🥺',
  chapters: [
    { video: 'college', caption: 'Chapter 1 · The college senior', scene: 'college' },
    { video: 'food', caption: 'Chapter 2 · Headquarters', scene: 'food' },
    { video: 'ganchali', caption: 'Chapter 3 · Teasing & playful fights', scene: 'drama' },
    { video: 'firstDate', caption: 'Chapter 4 · Our first date', scene: 'date' },
    { caption: 'Chapter 5 · Handmade flowers', scene: 'flowers', seconds: 5 },
    { video: 'birthdayKiss', caption: 'Chapter 6 · A birthday kiss', scene: 'kiss' },
    { video: 'valentines', caption: 'Chapter 7 · Valentine’s effort', scene: 'gifts' },
    { video: 'lateNight', caption: 'Chapter 8 · Late-night texting', scene: 'night' },
    { caption: 'Chapter 9 · Fell asleep waiting 🐥', scene: 'sleep', seconds: 5 },
    { video: 'ldr', caption: 'Chapter 10 · Missing each other', scene: 'distance' },
    { video: 'motorcycle', caption: 'Chapter 11 · Holding on tight', scene: 'ride' },
    { video: 'reunion', caption: 'Chapter 12 · Finally, together', scene: 'reunion' },
  ],
}

/* ---------------------------------------------------------------------
   OPEN-WHEN LETTERS
   ------------------------------------------------------------------- */
export const LETTERS = [
  {
    id: 'miss',
    title: 'Open when you miss me',
    seal: '🥺',
    color: 'pink',
    body: [
      'Hi Gubbi,',
      'So you miss me. Good. Because I’ve probably been missing you since before you opened this.',
      'I know it’s only thirty minutes between us, and I know that sounds like nothing. But thirty minutes is a lot when I can’t just walk up to you, poke your cheek and steal your attention. I used to see you every day, and now “every day” has to fit inside a phone screen. Some days that’s enough. Some days it really isn’t.',
      'So here’s what I want you to do: close your eyes for ten seconds and imagine me hugging you from the side and refusing to let go while you pretend to be annoyed. That’s exactly what I’d be doing right now.',
      'Then text me. Even if it’s just “hi.” Especially if it’s just “hi.”',
      'I miss you, my baby 🥺🐥',
      'Always yours,\nChildu',
    ],
  },
  {
    id: 'terrible-day',
    title: 'Open when you’re having a terrible day',
    seal: '🌧️',
    color: 'navy',
    body: [
      'Gubbi,',
      'I’m sorry today was heavy.',
      'I know you. You’ll probably try to keep it to yourself so I don’t worry. I love that about you, I really do. But this letter is me gently taking some of it off your shoulders anyway.',
      'You’re the person who makes problems look small. Mine, yours, anyone’s. You stay calm, you think, and somehow things become manageable. So if today feels too big, remember that the guy who fixes everything is allowed to have a day where he doesn’t.',
      'Eat something. Drink water. Lie down for a bit. Then, if you want to, tell me about it. If you don’t, just send me a 🥺 and I’ll know.',
      'Tomorrow you’ll be my strong, energetic, slightly dramatic-about-his-moods Gubbi again. Tonight you can just be tired.',
      'I’m right here.\nChildu',
    ],
  },
  {
    id: 'angry',
    title: 'Open when you’re angry at me',
    seal: '😤',
    color: 'red',
    body: [
      'Okay. Deep breath, Gubbi.',
      'You’re angry at me. Maybe I said something I shouldn’t have. Maybe I was being Ganchali Jasthi. Maybe I went full balalala mode when you needed quiet. I can already hear you saying it.',
      'You’re allowed to be angry. I won’t pretend I’m always right, because we both know I’m not (please don’t screenshot this sentence).',
      'But I want you to read this part twice: being angry at me doesn’t mean losing me. I’m not going anywhere. I’d rather sit through an argument with you than have a peaceful day with anyone else.',
      'Take your time. Cool down. And when you’re ready, come back and tell me what hurt, so I can actually fix it instead of guessing.',
      'Still your girl, even right now,\nChildu',
    ],
  },
  {
    id: 'sleep',
    title: 'Open when you can’t sleep',
    seal: '🌙',
    color: 'navy',
    body: [
      'Hey sleepyhead who isn’t sleeping,',
      'Funny, isn’t it? Usually I’m the one who falls asleep first, phone in hand, while you’re still typing. And then you scold me in the morning for not saying good night.',
      'So tonight, consider this my official good night, delivered in advance. You can’t complain about this one.',
      'Put your phone down after this (yes, really). Get comfortable. Imagine I’m curled up next to you, using your arm as my pillow, and you’re not allowed to move because I’m finally asleep.',
      'Breathe slowly. In for four, out for six. The day is done. Whatever is still on your mind will be easier in the morning.',
      'Good night, Gubbi. Sweet dreams. I said it. It counts. 🐥',
      'Childu',
    ],
  },
  {
    id: 'motivation',
    title: 'Open when you need motivation',
    seal: '⚡',
    color: 'blue',
    body: [
      'Listen up, superhero.',
      'You have more energy in one day than most people have in a week. I’ve watched you go and go and go. Don’t you dare forget that’s who you are.',
      'You graduated. You’ve got strength (and those biceps 💪🏻, I’m just saying). You solve problems so easily it’s actually annoying. So whatever you’re facing right now, it’s just another problem for the guy who handles problems.',
      'Start small. One step. Then another. You don’t need to feel ready, you just need to begin.',
      'And if you ever doubt yourself, borrow my belief in you. I have extra. Like, a ridiculous amount.',
      'Go get it, Gubbi. I’ll be cheering the loudest. 🦸‍♂️',
      'Your biggest fan,\nChildu',
    ],
  },
  {
    id: 'alone',
    title: 'Open when you feel alone',
    seal: '🫂',
    color: 'pink',
    body: [
      'Gubbi,',
      'You’re not alone. Not even a little bit.',
      'Even on the days we can’t meet, even on the days we don’t call, there is someone thirty minutes away thinking about you way more than she’d admit out loud.',
      'You don’t always share what’s bothering you. I know you do it to protect me. But you don’t have to carry everything quietly. You can lean on me. That’s what I’m here for.',
      'So right now, consider this a hug. A long one. The kind where I hold on and don’t let go even after you say “okay okay.”',
      'Text me. Call me. Send me a voice note of you just breathing if you want. I’ll answer.',
      'Always here,\nChildu',
    ],
  },
  {
    id: 'how-much',
    title: 'Open when you want to know how much I love you',
    seal: '❤️',
    color: 'red',
    body: [
      'You really want to know? Okay. Get comfortable.',
      'I love your eyes. Your smile. Your lips. Your hair. Your caring nature. Your biceps (obviously). Your strength. Your never-ending energy. The way you quietly handle things so I don’t worry. The way you make every problem feel smaller. How unbelievably cute you are.',
      'I love you on your mood-swing days. I love you when you call me Ganchali Jasthi. I love you when you’re teasing me and laughing at my reaction.',
      'I even love you in the middle of our fights, which honestly should be impossible.',
      'If you want a number: more than yesterday. Less than tomorrow. That’s the deal.',
      'Basically... you. It’s always going to be you. ❤️',
      'Forever your Childu',
    ],
  },
  {
    id: 'fighting',
    title: 'Open when we’re fighting',
    seal: '🥊',
    color: 'red',
    body: [
      'Hi. We’re fighting, aren’t we?',
      'Let’s be honest: we fight a lot. We both know it. Sometimes it’s about something real, sometimes it’s about absolutely nothing, and sometimes we don’t even call each other until it settles.',
      'But here’s what I’ve noticed. No matter how bad it gets, we always come back. Every single time. And somehow we come back stronger.',
      'So I’m not scared of this fight. I’m just sad that it’s taking time away from us.',
      'Here’s my proposal: we both say sorry for our part. You don’t have to go first. I just need to know we’re still on the same team. Because we are. We always have been.',
      'P.S. If I was being dramatic, you may say it. Once. 😂',
      'Still choosing you,\nChildu',
    ],
  },
  {
    id: 'college',
    title: 'Open when you miss our college days',
    seal: '🎓',
    color: 'blue',
    body: [
      'Remember when seeing you was just... normal?',
      'You were my senior. We had our food spot right in front of college, our headquarters. Breakfast there. Lunch there. Teasing, arguing, laughing, hanging around way longer than we were supposed to. And sometimes, our little bunk-college adventures started from right there too. 👀',
      'I didn’t realise how lucky that was until you graduated and “every day” stopped being an option.',
      'I miss it too. A lot.',
      'But I don’t think the best part was the place. I think the best part was that we were together without even trying. And that part isn’t over. It’s just waiting for us to make new versions of it.',
      'Next time we meet, let’s eat too much food and argue about nothing. For old times’ sake.',
      'Your favourite junior,\nChildu',
    ],
  },
  {
    id: 'meeting',
    title: 'Open when we’re finally meeting again',
    seal: '🏍️',
    color: 'pink',
    body: [
      'IT’S HAPPENING. 🥹',
      'Okay. Rules for today:',
      '1. I get the first hug and it lasts as long as I want.\n2. I’m going to kiss your whole face. Don’t complain.\n3. If there’s a ride, I’m holding onto you tight with my helmet on. Drive carefully, my favourite person is on that bike (it’s you).\n4. At some point I need to fall asleep in your big-boy arms.\n5. Phones stay mostly in pockets. You’re right there. Finally.',
      'I’ve missed your presence so much. Not just your texts or your voice on calls, but YOU, sitting next to me.',
      'See you soon, baby boy. 🥺🐥',
      'Childu',
    ],
  },
  {
    id: 'remember',
    title: 'Open when you want to remember us',
    seal: '🌌',
    color: 'navy',
    body: [
      'Here’s us, in short:',
      'July 15, 2024. Somehow, it all began.\nJanuary 28, 2025. The day we became us.\nA first date full of the city, food, shopping, game zones and handmade flowers.\nYour birthday, and our first kiss.\nMy birthday, which you made feel like it belonged to me.\nValentine’s Day, and gifts you made with your own hands.',
      'And in between: the food spot, Ganchali Jasthi, Kappi, balalala, your mood swings, late-night texting until I fell asleep, the motorcycle rides where I held on tight, and more fights than I can count, each one followed by us coming back.',
      'That’s us. Imperfect, loud, dramatic, a little bit chaotic, and completely ours.',
      'I wouldn’t trade it for anything.',
      'Love you, Gubbi. Always. 🌙',
      'Childu',
    ],
  },
]

/* ---------------------------------------------------------------------
   VIRTUAL KULFI DATE
   ------------------------------------------------------------------- */
export const KULFI_DATE = {
  title: 'KULFI DATE NIGHT 🍨❤️',
  subtitle: 'Distance isn’t cancelling our date.',
  details: [
    { label: 'Date', value: 'Boyfriend’s Day' },
    { label: 'Location', value: 'Wherever we are ❤️' },
    { label: 'Dress code', value: 'Cute enough for me.' },
  ],
  steps: [
    { icon: '🍨', text: 'Get kulfi. (Your favourite flavour. Mine too, if you’re nice.)' },
    { icon: '📞', text: 'Start a video call (on your phone, the usual way).' },
    { icon: '😋', text: 'Eat together.' },
    { icon: '🗣️', text: 'Talk about our day.' },
    { icon: '🎴', text: 'Play the question game below.' },
    { icon: '📸', text: 'Take a screenshot together, if we want.' },
    { icon: '🌙', text: 'End with a virtual goodnight.' },
  ],
  note: 'This website can’t place calls or take screenshots for us. That part is all you, Gubbi. 😌',
  goodnight: 'Good night, Gubbi. Thank you for the date. 🌙🐥',
}

export const QUESTIONS = [
  'What’s your favourite memory of us?',
  'What do you miss most about me?',
  'What should our next date be?',
  'Where should we travel together?',
  'What’s something about me that secretly makes you smile?',
  'What’s one thing you want us to do when we finally meet?',
  'What is one thing you hope never changes about us?',
  'Which of our silly fights makes you laugh now?',
  'What was your first impression of me?',
  'What’s your favourite thing about our college food spot?',
]

/* ---------------------------------------------------------------------
   EASTER EGGS — hidden around the site. `section` decides where.
   ------------------------------------------------------------------- */
export const EASTER_EGGS = [
  { id: 'spider', section: 'distance', icon: 'spider', label: 'a tiny web', message: 'With great distance comes great missing-you. 😂' },
  { id: 'bat', section: 'timeline', icon: 'bat', label: 'a bat signal', message: 'Gotham is dark. My mood without you is darker.' },
  { id: 'bow', section: 'jokes', icon: 'bow', label: 'a red bow', message: 'Your girl misses you.' },
  { id: 'cat', section: 'latenight', icon: 'cat', label: 'cat ears', message: 'Come here, Gubbi.' },
  { id: 'pirate', section: 'food', icon: 'hat', label: 'a straw hat', message: 'Every adventure needs a favourite person. 🏴‍☠️❤️' },
]

/* ---------------------------------------------------------------------
   SECRET PUZZLE + GIFT BOX
   Answers are compared lower-case with spaces/punctuation removed.
   ------------------------------------------------------------------- */
export const PUZZLE = {
  title: 'Top secret. Gubbi eyes only. 🔐',
  intro: 'Three locks stand between you and a hidden message. You know all the answers. (I hope. 😤)',
  locks: [
    {
      question: 'Lock 1 · Not a frog, not your real name, but one of ours. Five letters, starts with K.',
      answers: ['kappi'],
      hints: ['It’s one of our relationship nicknames.', 'K _ P P I'],
    },
    {
      question: 'Lock 2 · The day we became us. Type it as DDMM (four digits).',
      answers: ['2801'],
      hints: ['It’s in our timeline, marked with a big heart.', 'January 28 → 28 01'],
    },
    {
      question: 'Lock 3 · What do you say when I’m being too dramatic? (two words, then “aythu”)',
      answers: ['ganchalijasthiaythu', 'ganchalijasthi'],
      hints: ['It means overacting.', 'G _ _ _ _ _ _ _  J _ _ _ _ _  aythu'],
    },
  ],
  wrong: ['Nope! Try again 😝', 'Wrong! Ganchali Jasthi guessing 😂', 'Hmm… think, Gubbi 🤔', 'So close (maybe). Try again!'],
  right: 'Unlocked! ✨',
  secret: {
    title: 'Secret message unlocked 💌',
    lines: [
      'You found it, Kappi.',
      'Here’s the secret: even on the days we fight, even on the days we don’t call, I’m still on your side. Always.',
      'This message is also a coupon: one free, unlimited-length hug. Valid forever. Redeemable only in person. 🫂',
    ],
  },
  gift: {
    prompt: 'One last gift. Tap to open 🎁',
    reveal: 'You. ❤️',
    message: 'My favourite gift is still having you.',
  },
}

/* ---------------------------------------------------------------------
   ENDING
   ------------------------------------------------------------------- */
export const ENDING = {
  lines: [
    'Gubbi...',
    'You’re my baby boy. 🥺🐥',
    'I miss you, my baby.',
    'I know we fight.',
    'A lot. 😂',
    'But somehow...',
    'We always find our way back to each other.',
    'And that’s my favourite thing about us. ❤️',
  ],
  title: 'HAPPY BOYFRIEND’S DAY, GUBBI ❤️',
  sub1: 'Until I can hug you for real...',
  sub2: 'This little universe is yours. 🌙',
  button: 'HUG ME 🫂',
  final: 'Now stop looking at the website and come give me a real hug. 😂❤️',
  signature: '— made with way too much love by Childu',
}
