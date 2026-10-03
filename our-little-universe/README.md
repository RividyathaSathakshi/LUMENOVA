# Our Little Universe ❤️

A private, animated Boyfriend's Day website made by **Childu** for **Gubbi**.
React + Vite + plain CSS. No backend, no accounts, no paid APIs, no ads.

---

## Run it

```bash
cd our-little-universe
npm install
npm run dev        # http://localhost:5173 (hot reload while editing)
npm run build      # production build in dist/
npm run preview    # serve the built dist/ locally
```

The build uses relative paths (`base: './'`), so `dist/` works from any static host
(GitHub Pages, Netlify, Vercel, a plain web server). Videos and audio must be served
over http(s). Opening `dist/index.html` straight from disk (`file://`) won't play them reliably.

---

## Everything personal lives in one file

**`src/data/config.js`** holds all the dates, text, video and poster paths, music,
the 11 letters, the question deck, Easter eggs, the puzzle answers and the ending lines.
Edit that file and the website updates. No component needs changing.

---

## AI chibi videos

Put your generated clips in **`public/videos/`** using these exact names:

| File | Where it appears |
|---|---|
| `intro_superhero.mp4` | Chapter 0 · *Our World* (plays muted on its own after ENTER) |
| `college_meeting.mp4` | Timeline → *July 15, 2024*, and Chibi Story ch. 1 |
| `food_spot.mp4` | *Headquarters* (looping preview), and Chibi Story ch. 2 |
| `first_date.mp4` | Timeline → *Our first date*, and Chibi Story ch. 4 |
| `birthday_first_kiss.mp4` | Timeline → *His birthday*, and Chibi Story ch. 6 |
| `valentines_gifts.mp4` | Timeline → *Valentine's Day*, and Chibi Story ch. 7 |
| `ganchali_jasthi.mp4` | *Inside Jokes* → Ganchali Jasthi (looping), and Chibi Story ch. 3 |
| `late_night_texting.mp4` | *Late Nights*, and Chibi Story ch. 8 |
| `ldr_missing_you.mp4` | *Distance*, and Chibi Story ch. 10 |
| `motorcycle_hug.mp4` | *The Ride*, and Chibi Story ch. 11 |
| `virtual_kulfi_date.mp4` | *Kulfi Date* invitation (looping) |
| `final_reunion.mp4` | *The End?* finale, and Chibi Story ch. 12 |

Chibi Story ch. 5 (*Handmade flowers*) and ch. 9 (*Fell asleep waiting*) are illustrated
cards with no video file. To give one a clip, add a `video:` key to that chapter in
`CHIBI_STORY` in `config.js`.

**Optional posters:** add `public/posters/<same name>.jpg` (for example `posters/final_reunion.jpg`).
They're shown before a video loads.

### Adding or replacing a video
1. Export the clip as **MP4 (H.264 video, AAC audio if any)**. That plays in every browser.
   Around 720p and under ~15 MB per clip keeps phones happy.
2. Drop it into `public/videos/` with the exact name from the table, replacing any old file.
3. Reload the page. Nothing else needs to change.

To use a different filename, edit the `video('...')` line for that clip in `VIDEOS` in `config.js`.

### How missing videos behave
Each video slot shows an **animated chibi illustration** until its file exists. While you're
still adding clips, a small "AI chibi scene · add xyz.mp4" label shows which file belongs where.
**Before sharing, set `SHOW_PLACEHOLDER_HINTS = false`** in `config.js` if some clips are still
missing, so the labels disappear.

Videos are lazy-loaded: nothing downloads until a scene is about to scroll into view, and only
the video's metadata loads first. Looping previews play only while on screen. Cinematic scenes
have play/pause, replay, seek and mute controls.

---

## Music

Put your own audio file(s) in **`public/audio/`**:

| File | Song (as labelled in the player) |
|---|---|
| `our_song.mp3` | "Slut!" (Taylor's Version) by Taylor Swift. This is the **main track** |
| `harleys_in_hawaii.mp3` | "Harleys in Hawaii" by Katy Perry |

That's it. To use other filenames, titles or more songs, edit `MUSIC.tracks` in `config.js`:

```js
export const MUSIC = {
  tracks: [
    { id: 'slut', title: 'Slut! (Taylor’s Version)', artist: 'Taylor Swift',
      src: asset('audio/our_song.mp3'), file: 'public/audio/our_song.mp3' },
    ...
  ],
  MAIN_TRACK_INDEX: 0,      // which song ENTER OUR WORLD starts
  defaultVolume: 0.6,
  sectionTracks: {},        // optional: { motorcycle: 'harleys', ending: 'slut' }
}
```

* **One song only?** Delete the second entry. The single song then loops.
* **Songs for particular moments:** `sectionTracks` maps a chapter id (see `SECTIONS`) to a track id.
  When that chapter scrolls into view *while music is playing*, the player switches to that song.
  Leave it `{}` to let one song play straight through.
* **Missing file:** the player shows *"Music unavailable"* and the site carries on normally.
  If another configured track exists, the player skips to it.

Please only use audio you have the right to use (for example a track you bought, for a private
site). This project doesn't download, stream or bundle any songs.

The player floats in the bottom-right corner and has play/pause, previous/next, a seekable
progress bar, current time and duration, volume and mute. It stays mounted for the whole visit,
so moving between chapters never restarts the song. Volume, mute and the selected track are
remembered in the browser.

---

## Limitations (please read)

* **Autoplay:** browsers block sound until the visitor interacts. Music starts when **ENTER OUR WORLD**
  is tapped. If a browser still refuses (some iOS low-power or data-saver modes do), the player
  says so and a tap on ▶ starts it. The intro video autoplays **muted** (that's allowed). Every other
  cinematic clip waits for a tap on play, and all clips start muted so they don't fight the soundtrack.
  Tap 🔇 on a clip to hear its own audio.
* **iPhone silent switch:** with the ring/silent switch on silent, iOS Safari may play web audio quietly
  or not at all.
* **Video formats:** use H.264 MP4. HEVC/H.265 or ProRes exports won't play in many browsers.
* **Play state after a reload:** a browser won't resume audio on its own after a page reload. Gubbi
  taps ENTER again and the remembered volume and track are used.
* **Calls and screenshots:** the Kulfi Date only *guides* the date. It can't start a video call or take
  a screenshot. Use your phones as usual.
* **Fonts:** headings use Google Fonts (Bangers, Fredoka, Caveat). Offline, the site falls back to
  system fonts.
* **Saved progress** (opened letters, Easter eggs found, music volume) lives in that browser's local
  storage only.

---

## Project structure

```
our-little-universe/
├── public/
│   ├── videos/      ← AI chibi clips (exact names above)
│   ├── posters/     ← optional poster images
│   └── audio/       ← your song file(s)
└── src/
    ├── data/config.js     ← ALL personal content + paths
    ├── components/        ← Chibi (SVG characters), VideoScene, SceneArt placeholders,
    │                        MusicContext + MusicPlayer, Nav, Modal, EasterEggs, ...
    ├── sections/          ← one file per chapter (Opening, Timeline, FoodSpot, InsideJokes,
    │                        LoveList, LongDistance, LateNight, WhenWeMeet, Motorcycle,
    │                        ChibiStory, Letters, KulfiDate, Secret, Ending)
    ├── hooks/             ← in-view, reduced-motion, storage helpers
    └── styles/            ← base.css, components.css, sections.css
```

## Secrets for Childu (don't tell Gubbi 🤫)

* **Puzzle answers** (`PUZZLE.locks`): `Kappi` → `2801` → `Ganchali Jasthi aythu`. Answers ignore
  case, spaces and punctuation. Each lock has two hints.
* **Easter eggs** (5): a bat in *Our Story*, a straw hat in *Headquarters*, a red bow in *Inside Jokes*,
  a tiny web in *Distance*, and cat ears in *Late Nights*. The top bar counts how many he's found.

## Accessibility

Mobile-first responsive layout, keyboard support throughout (arrow keys in the timeline, Escape closes
letters and overlays, focus is trapped in dialogs and returned afterwards), a skip link, visible focus
rings, readable contrast, and `prefers-reduced-motion` support (animations are disabled and looping
previews wait for a tap).
