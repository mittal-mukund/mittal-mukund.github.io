/**
 * ═════════════════════════════════════════════════════════════════════════════
 *  ROYAL PICHWAI WEDDING INVITATION — CONFIGURATION FILE
 * ═════════════════════════════════════════════════════════════════════════════
 *  Wedding celebration of Mukund Mittal & Yashi Agrawal (#SHIfoUNDlove)
 */

window.__WEDDING_CONFIG__ = {
  // ── 1. COUPLE INFORMATION ──────────────────────────────────────────────────
  couple: {
    groom: "Mukund",
    bride: "Yashi",
    groomFull: "Mukund Mittal",
    brideFull: "Yashi Agrawal",
    whatsapp: "+917755063467",
    date: "2027-01-27",
    displayDate: "27 January 2027",
    venue: "Jashn Wellness Resort, Malihabad, Lucknow",
    venueMapsUrl: "https://maps.app.goo.gl/yq4Fdy8pdYffjPQg6",
    hashtag: "#SHIfoUNDlove"
  },

  // ── 2. FAMILY BLESSINGS & DETAILS ──────────────────────────────────────────
  invite: {
    showGrandparents: false,
    familiesQuote: "Raised with Love. United by Destiny. Together Forever.",
    generalBlessing: "Raised with Love. United by Destiny. Together Forever.",
    kicker: "Together with their families",
    brideParents: "D/O Smt. Shashi & Shri Atul Agrawal",
    brideSibling: "Sister of Aadya",
    groomParents: "S/O Smt. Anamika & Shri Pranay Mittal",
    groomSibling: "Brother of Shivani",
    occasion: "invite you to celebrate their wedding"
  },

  // ── 3. LIVE COUNTDOWN CONFIGURATION ────────────────────────────────────────
  countdown: {
    label: "Baraat Reception Begins In",
    targetName: "Baraat Reception",
    targetDate: "2027-01-27T19:00:00+05:30", // 27 January 2027, 7:00 PM IST
    displayTarget: "Baraat Reception · 27 Jan 2027 · 7:00 PM"
  },

  // ── 4. LOVE STORY (MEET THE COUPLE) ────────────────────────────────────────
  story: {
    show: true,
    title: "Meet the Couple",
    eyebrow: "A love story",
    body: "What began as a quiet conversation introduced through family quickly unfolded into a rare and kindred bond. Along the way, even as life presented its gentle tests and changing winds, their conviction remained unspoken yet steadfast—they simply knew they were meant to be. They are each other’s perfect counterpoint: her wholehearted warmth and emotional soul balanced by his steady logic and devoted care. Bound by a shared wanderlust for new places, a mutual love for good food paired with fitness, and a youthful spark that never takes life too seriously, Mukund & Yashi celebrate a friendship that became their greatest journey.",
    tags: ["#SHIfoUNDlove", "Travel & Wellness", "Heart & Logic", "Kindred Spirits"]
  },

  // ── 5. CELEBRATION EVENTS (3 CEREMONIAL SCROLLS) ───────────────────────────
  events: [
    {
      id: "baraat-reception",
      name: "Baraat Reception",
      date: "27 Jan 2027",
      time: "7:00 PM",
      venue: "Jashn Bagh",
      note: "The royal procession arrives with pomp & grand reception",
      icon: "assets/shared/pn-shr-mot-elephant-main-x-v01.webp",
      map: "https://maps.app.goo.gl/yq4Fdy8pdYffjPQg6"
    },
    {
      id: "phere",
      name: "Phere Ceremony",
      date: "28 Jan 2027",
      time: "12:00 AM (Midnight)",
      venue: "Neer Bagh",
      note: "Seven sacred vows around the holy agni",
      icon: "assets/event/pn-evt-ico-shaadi-x-v01.webp",
      map: "https://maps.app.goo.gl/yq4Fdy8pdYffjPQg6"
    },
    {
      id: "vidaayi",
      name: "Vidaayi",
      date: "28 Jan 2027",
      time: "6:00 AM",
      venue: "Jashn Courtyard",
      note: "“Not a goodbye, but the beginning of forever.”",
      icon: "assets/event/pn-evt-ico-vidaai-x-v01.webp",
      map: "https://maps.app.goo.gl/yq4Fdy8pdYffjPQg6"
    }
  ],

  // ── 6. VENUE DESTINATION ───────────────────────────────────────────────────
  venueDetails: {
    name: "Jashn Wellness Resort",
    location: "Malihabad, Lucknow, Uttar Pradesh",
    dates: "27 January 2027",
    mapUrl: "https://maps.app.goo.gl/yq4Fdy8pdYffjPQg6",
    description: "Set amidst the serene natural mango groves and regal heritage charm of Malihabad, Jashn Wellness Resort welcomes you to celebrate our sacred union across grand palatial courtyards and lush celebration lawns."
  },

  // ── 7. THINGS TO KNOW (GUEST ESSENTIALS) ────────────────────────────────────
  thingsToKnow: [
    {
      id: "venue",
      title: "Wedding Venue",
      description: "Jashn Wellness Resort, Malihabad, Lucknow. All celebrations will take place amidst the lush resort lawns.",
      icon: "assets/ttk/pn-ttk-ico-venue-x-v01.webp",
      enabled: true
    },
    {
      id: "hashtag",
      title: "Wedding Hashtag",
      description: "Tag your photos, videos, and stories with #SHIfoUNDlove to share your love and blessings!",
      icon: "assets/ttk/pn-ttk-ico-hashtag-x-v01.webp",
      enabled: true
    },
    {
      id: "dress-code",
      title: "Dress Code",
      description: "Royal Indian Ethnic & Festive Elegance. Traditional pastels, vibrant silks, and festive jewels.",
      icon: "assets/ttk/pn-ttk-ico-dress-code-x-v01.webp",
      enabled: true
    },
    {
      id: "rsvp-note",
      title: "RSVP Request",
      description: "Kindly confirm your presence by 15th January 2027 to help us make your stay and celebration seamless.",
      icon: "assets/ttk/pn-ttk-ico-custom-note-x-v01.webp",
      enabled: true
    }
  ],

  // ── 8. RSVP & SAVE THE DATE ────────────────────────────────────────────────
  rsvp: {
    heading: "Will you join us?",
    subtext: "We've saved a seat for you — at our table, in our hearts, and under the royal sky. Come celebrate with us as we begin this new chapter together.",
    btnText: "RSVP Here",
    googleFormUrl: "https://tinyurl.com/yashimukund27",
    whatsappFallback: "+917755063467",
    whatsappMessage: "Hello Mukund & Yashi,\n\nI am delighted to attend your wedding on 27 January 2027.\n\nRegards,\n[Your Name]",
    appleCalendarUrl: "assets/invite.ics",
    calendarEvent: {
      title: "Mukund & Yashi's Wedding (#SHIfoUNDlove)",
      startDate: "20270127T133000Z",
      endDate: "20270128T013000Z",
      location: "Jashn Wellness Resort, Malihabad, Lucknow, Uttar Pradesh, India",
      details: "Join us for Baraat Reception (27 Jan 2027 · 7:00 PM), Phere Ceremony, and Vidaayi of Mukund Mittal & Yashi Agrawal."
    }
  },

  // ── 9. CLOSING SECTION QUOTE ───────────────────────────────────────────────
  closing: {
    quote: "Every love story is beautiful, but ours is our favourite.",
    names: "Mukund & Yashi",
    date: "27 January 2027",
    hashtag: "#SHIfoUNDlove"
  },

  // ── 10. BACKGROUND MUSIC ───────────────────────────────────────────────────
  music: {
    enabled: true,
    src: "assets/song/Template_09.mp3",
    autoPlayOnRopePull: true
  }
};
