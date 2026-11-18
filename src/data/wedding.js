// Single source of truth. Edit this file only — no component changes needed.
// Any value that is still "TODO…" or contains "____" is hidden automatically.
export const wedding = {
  groom: "Sanjay",
  bride: "Shikha",
  hashtag: "#SanjayWedsShikha", // TODO: confirm
  invocation: "॥ श्री गणेशाय नमः ॥",

  families: {
    // TODO: fill real names
    groom: { title: "Chi. Sanjay", parents: ["Shri ____", "Smt. ____"], grandparents: [] },
    bride: { title: "Chi. Shikha", parents: ["Shri ____", "Smt. ____"], grandparents: [] },
  },

  mainDate: { day: "18", month: "JAN", year: "2027", weekday: "Monday" },

  venue: {
    name: "TODO: Venue name",
    address:
      "A-1, Industrial Area Phase I, Block A, Naraina Industrial Area Phase 1, Naraina, New Delhi, Delhi 110028",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=A-1%2C%20Industrial%20Area%20Phase%20I%2C%20Block%20A%2C%20Naraina%20Industrial%20Area%20Phase%201%2C%20Naraina%2C%20New%20Delhi%2C%20Delhi%20110028",
  },

  // Empty venue = no venue line and no map button on that card.
  events: [
    { id: "haldi-mehendi", name: "Haldi & Mehendi", date: "Sat, 16 Jan 2027", time: "TODO", venue: "", theme: "yellow" },
    { id: "matkor", name: "Matkor", date: "Sun, 17 Jan 2027", time: "TODO", venue: "", theme: "green" },
    { id: "shaadi", name: "Shaadi", date: "Mon, 18 Jan 2027", time: "TODO", venue: "Wedding venue (above)", theme: "maroon" },
  ],

  // 3–6 frames; put photos in /public/photos. Missing photos show an illustrated placeholder.
  story: [
    { type: "photo", src: "/photos/1.jpg", caption: "" },
    { type: "text", text: "Some stories begin with grand gestures. Ours started with a simple conversation." },
    { type: "photo", src: "/photos/2.jpg", caption: "" },
  ],

  notes: ["TODO: e.g. Parking available at the venue entrance."],
  compliments: ["TODO: names of family members inviting"],
  instagram: "", // optional, e.g. "https://instagram.com/yourhandle"
  music: "/audio/shehnai.mp3", // optional, royalty-free; add file to /public/audio
};
