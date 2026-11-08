# Royal Pichwai Wedding Website Template

A royal Indian wedding invitation website featuring traditional Pichwai artwork, smooth animations, interactive drag-to-pull curtain drop, live fireworks, and photo gallery.

---

## ðŸ“ Project Structure

```
royal-wedding-website/
â”‚
â”œâ”€â”€ index.html            # Main website page structure
â”œâ”€â”€ README.md             # Guide and instructions
â”‚
â”œâ”€â”€ css/
â”‚   â””â”€â”€ style.css         # Complete styling, animations, and responsive layout
â”‚
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ config.js         # ðŸŒŸ EDIT THIS FILE to customize your wedding details!
â”‚   â””â”€â”€ script.js         # Interactive physics, particle systems, audio controller, etc.
â”‚
â””â”€â”€ assets/               # All self-contained local graphics, illustrations & audio
    â”œâ”€â”€ hero/             # Rope, dark/lit courtyard backgrounds, lotus buttons
    â”œâ”€â”€ shared/           # Pichwai motifs (peacock, elephant, cow, diya, jhoomer)
    â”œâ”€â”€ invite/           # Royal arch frame, flying birds, rose petal sprites
    â”œâ”€â”€ event/            # Farman scrolls, ceremony icons, vine path
    â”œâ”€â”€ meet_the_couple/  # Parting tree curtains
    â”œâ”€â”€ gallery/          # Hanging frames and courtyard backdrop
    â”œâ”€â”€ ttk/              # Guest essentials / things to know icons
    â”œâ”€â”€ rsvp/             # Lotus finale divider
    â”œâ”€â”€ song/             # Background royal instrumental soundtrack
    â””â”€â”€ Demo/             # Sample wedding photos
```

---

## ðŸš€ How to Run Locally

1. **Option A (Instant Preview):**  
   Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, or Safari.

2. **Option B (Recommended for best audio & module support):**  
   Run any simple local HTTP server:
   * **VS Code:** Install the *Live Server* extension, right-click `index.html` and click **"Open with Live Server"**.
   * **Python:** Run `python -m http.server 8000` in this directory.
   * **Node.js:** Run `npx serve .`

---

## âœï¸ How to Customize

You do **not** need to touch complex code to customize this site! Simply open `js/config.js` in any text editor and update:

1. **Couple Names & Date:**
   ```js
   couple: {
     bride: "Tanya",
     groom: "Rohan",
     date: "2026-12-12",
     venue: "The Oberoi Udaivilas, Udaipur",
     hashtag: "#TanyaWedsRohan",
     whatsapp: "919876543210"
   }
   ```

2. **Celebration Events / Itinerary:**
   Add or edit ceremonies (Haldi, Mehendi, Sangeet, Shaadi, Reception, etc.) with custom dates, timings, venues, and Google Map links.

3. **Meet the Couple Story:**
   Customize your personalized love story and hashtag.

4. **Gallery Photos:**
   Add your own photos into `assets/Demo/` or any folder and list their paths in `js/config.js`.

5. **WhatsApp RSVP:**
   Put your WhatsApp phone number to receive instant RSVPs from your guests directly on your phone.

6. **Custom Music:**
   Drop your own `.mp3` into `assets/song/` and update `music.src` in `js/config.js`.