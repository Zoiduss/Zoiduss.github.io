// ================================================================
// FIZZ — Site Data Configuration  |  data/data.js
// ================================================================
// Edit this file to update ALL content, links, images, and music.
// Do NOT touch index.html or js/main.js for routine edits.
// ================================================================

const FIZZ_DATA = {

  // ── IMAGES ────────────────────────────────────────────────────
  // All images live in /images/ and are named image1, image2...
  //
  //  image1  →  Logo (PNG with transparency recommended)
  //             Used in TWO places:
  //               1. Entry/splash screen — centred, animated blue glow
  //               2. Hero section — large animated floating logo
  //
  //  image2  →  Project card #1 thumbnail  (16:9 ratio recommended)
  //  image3  →  Project card #2 thumbnail  (16:9 ratio recommended)
  //  image4  →  Project card #3 thumbnail  (16:9 ratio recommended)
  //
  // Add more images (image5, image6 ...) and reference them below.
  // ----------------------------------------------------------------
  images: {
    logo:        'images/image1.png',
    project1:    'images/image2.png',   // set to null to hide thumbnail
    project2:    'images/image3.png',   // set to null to hide thumbnail
    project3:    'images/image4.png',   // set to null to hide thumbnail
  },

  // ── MUSIC ─────────────────────────────────────────────────────
  // Place files in /music/ folder.
  //
  // Naming convention  (N = track number, starting at 1):
  //   Audio file  →  music/track1.mp3  / track2.mp3  / track3.mp3  ...
  //   Cover art   →  music/cover1.jpg  / cover2.jpg  / cover3.jpg  ...
  //
  // Cover N is matched to track N automatically.
  // Supported audio formats: mp3, ogg, wav, flac, m4a
  // Supported cover formats: jpg, jpeg, png, webp, avif
  //
  // The player probes up to `maxTracks` files and stops at first gap.
  // ----------------------------------------------------------------
  music: {
    folder:     'music/',
    maxTracks:  50,
    audioExts:  ['mp3','ogg','wav','flac','m4a'],
    coverExts:  ['jpg','jpeg','png','webp','avif'],
    // Optional: override the auto-generated "Track N" title.
    // Key = track number (string), value = display title.
    titles: {
      // '1': 'My Song Name',
      // '2': 'Another Track',
    },
  },

  // ── SITE META ─────────────────────────────────────────────────
  meta: {
    name:     'FIZZ',
    subtitle: 'Hire?',   // used in animated browser tab title
  },

  // ── ENTRY / SPLASH SCREEN ─────────────────────────────────────
  // The full-screen overlay shown before the user clicks to enter.
  // Logo image: see images.logo above.
  entry: {
    subtitle: 'Game Designer & Developer',
    tapText:  'Click anywhere to enter',
  },

  // ── HERO SECTION ──────────────────────────────────────────────
  // The main above-the-fold section.
  // Logo image: see images.logo above.
  hero: {
    sideText:     'game designer & developer',
    roleMain:     'Game Designer & Developer',
    roleSub:      'Experienced Roblox & Discord Staff',
    ctaPrimary:   { label: 'Get in touch', href: '#contact' },
    ctaSecondary: { label: 'See work',     href: '#work'    },
  },

  // ── MARQUEE / TICKER ──────────────────────────────────────────
  // Scrolling ticker strip. Appears TWICE:
  //   • Between hero and "Currently" section  → scrolls left-to-right
  //   • Between "Now Playing" and "Contact"   → scrolls right-to-left
  // Add as many items as you like — they loop automatically.
  marquee: [
    'Contributed to 1.4B Visits',
    'Fast & Reliable',
    'Contributed to 1.3M Subscribers',
    'Staff in 250K+ Server',
    'Flexible & Unlocked Rates',
    'Modeler',
    'Builder',
    'Animator',
  ],

  // ── CURRENTLY SECTION (01) ────────────────────────────────────
  currently: {
    workingOn: {
      value: 'Vangaurd Site',   // e.g. 'Roblox RPG'
      sub:   'Beta Release',   // e.g. 'Release Q3 2026'
    },
    status: {
      value: 'Available',
      sub:   'Open for projects & commissions',
    },
  },

  // ── PROJECTS SECTION (02) ─────────────────────────────────────
  // Three project cards in a 3-column grid.
  // `image` pulls from the images object above (or set to null).
  // `num` is the small label shown above the title (e.g. "01").
  projects: [
    {
      image:    'images/image2.png',  // 16:9 thumbnail, top of card
      imageAlt: 'images/image2.png',
      num:      '01',
      title:    'Vangaurd Site',
      desc:     'Facility RPG',
      tag:      'Dev Management',
    },
    {
      image:    'images/image3.png',
      imageAlt: '',
      num:      '02',
      title:    'Project 6AM',
      desc:     'Assym Fnaf Horror Game',
      tag:      'Lead Developer',
    },
    {
      image:    'images/image4.png',
      imageAlt: '',
      num:      '03',
      title:    'Hidden Devs',
      desc:     'Development server with 250k+',
      tag:      'Trial Representative & Helper Management',
    },
  ],

  // ── SOCIAL / CONTACT LINKS ────────────────────────────────────
  // Used in: nav pill, hero contact button, contact section,
  //          side panel "Links" tab, and footer pill.
  socials: {
    discordAccount:   { href: 'https://discord.com/users/1314690826483404955', label: 'Discord Account',   sub: 'View my profile' },
    discordPortfolio: { href: 'https://discord.gg/HzQEEgFW2E', label: 'Discord Portfolio', sub: 'View my server'  },
    roblox:           { href: 'https://www.roblox.com/users/4143060296/profile', label: 'Roblox',            sub: 'My profile'      },
  },

  // ── STATS ─────────────────────────────────────────────────────
  stats: {
    // "Online since" live counter in the contact section.
    // Month is 0-indexed (0 = January, 2 = March).
    bornDate: new Date(2024, 12, 4),
  },

  // ── FOOTER ────────────────────────────────────────────────────
  footer: {
    copy: 'FIZZ',
  },

};
