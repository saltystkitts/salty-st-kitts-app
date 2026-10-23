// Default content for the editable "More" pages.
// Anything saved in the admin panel (Pages tab) overrides these.
// Use **double asterisks** around words to make them bold.
// Times are comma-separated, e.g. "6:00 AM, 7:00 AM".

const WEEKDAY_TO_NEVIS = "6:00 AM, 7:00 AM, 8:00 AM, 8:45 AM, 9:30 AM, 10:15 AM, 10:30 AM, 12:00 PM, 1:00 PM, 2:00 PM, 3:00 PM, 3:30 PM, 4:00 PM, 6:00 PM, 7:00 PM";
const WEEKDAY_TO_SKN = "7:00 AM, 7:30 AM, 8:00 AM, 8:30 AM, 9:00 AM, 9:30 AM, 10:30 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:00 PM, 3:00 PM, 4:00 PM, 4:30 PM, 5:00 PM, 6:00 PM";

export const PAGE_DEFAULTS = {
  ferry: {
    subtitle: "Ferries & Water Taxis · St Kitts ↔ Nevis",
    disclaimer: "⚠️ All schedules and services are subject to change, especially during off-season. Always confirm before heading out.",
    passenger_ferry: {
      route_to_nevis: "Basseterre (Port Zante) → Charlestown, Nevis",
      route_to_st_kitts: "Charlestown, Nevis → Basseterre (Port Zante)",
      crossing_time: "~25–45 min",
      schedule: {
        Monday: { to_nevis: WEEKDAY_TO_NEVIS, to_st_kitts: WEEKDAY_TO_SKN },
        Tuesday: { to_nevis: WEEKDAY_TO_NEVIS, to_st_kitts: WEEKDAY_TO_SKN },
        Wednesday: { to_nevis: WEEKDAY_TO_NEVIS, to_st_kitts: WEEKDAY_TO_SKN },
        Thursday: { to_nevis: WEEKDAY_TO_NEVIS, to_st_kitts: WEEKDAY_TO_SKN },
        Friday: { to_nevis: WEEKDAY_TO_NEVIS + ", 9:00 PM", to_st_kitts: WEEKDAY_TO_SKN + ", 8:00 PM" },
        Saturday: {
          to_nevis: "6:30 AM, 7:00 AM, 7:30 AM, 8:00 AM, 8:45 AM, 9:30 AM, 10:15 AM, 10:30 AM, 12:00 PM, 1:00 PM, 2:00 PM, 2:15 PM, 3:00 PM, 3:30 PM, 4:00 PM, 6:00 PM, 7:00 PM, 8:00 PM",
          to_st_kitts: "7:00 AM, 7:30 AM, 8:00 AM, 8:30 AM, 9:00 AM, 9:30 AM, 10:30 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:15 PM, 3:00 PM, 4:00 PM, 4:30 PM, 5:00 PM, 6:00 PM, 8:00 PM, 9:00 PM",
        },
        Sunday: {
          to_nevis: "8:00 AM, 9:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM, 6:00 PM, 7:00 PM",
          to_st_kitts: "7:00 AM, 8:00 AM, 9:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, 3:00 PM, 4:30 PM, 5:00 PM, 6:00 PM",
        },
      },
      fares_and_tips: [
        "🎟 **EC$25–30** per person (~US$9–11)",
        "📍 Departs from **Port Zante**, Basseterre",
        "⏰ Arrive **15–20 min early** — ferries fill up",
        "💵 **Cash only** at the dock",
        "🌊 Schedules subject to weather — always confirm day-of",
      ],
      salty_says: "The passenger ferry is the most affordable way to cross. Sit outside if conditions are calm — the channel views are worth it. Water taxis are faster and more flexible if you need to move on your own schedule.",
    },
    car_ferry: {
      intro: "For vehicles or if you're coming from the Southeast Peninsula — car ferries dock at **Majors Bay**, not Basseterre.",
      ferries: [
        {
          name: "Sea Bridge",
          route: "Majors Bay → Cades Bay, Nevis",
          crossing_time: "~15–25 min",
          phone: "869-662-7002",
          price: "EC$25 per person · vehicles extra",
          note: "Drive-on, drive-off. Arrive 30 min early. Runs every 2 hrs daily.",
          to_nevis: "8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM, 7:00 PM",
          to_st_kitts: "7:00 AM, 9:00 AM, 11:00 AM, 1:00 PM, 3:00 PM, 6:00 PM",
        },
        {
          name: "iConnect",
          route: "Majors Bay → Long Point, Nevis",
          crossing_time: "~40 min",
          phone: "869-466-3339",
          price: "See iconnectskn.com",
          note: "Mon–Sat: 3 trips. Sunday: 2 trips. Good for large groups and vehicles.",
          to_nevis: "9:00 AM, 12:30 PM, 5:30 PM",
          to_st_kitts: "7:30 AM, 11:00 AM, 4:00 PM",
        },
      ],
      salty_says: "If you have a rental car and want to drive around Nevis, Sea Bridge from Majors Bay is your move. It's a 15-minute crossing and you roll straight off onto the Nevis road. Bring cash.",
    },
    water_taxi: {
      title: "Water Taxis — Reggae Beach",
      info: [
        "🕐 Depart approximately **every 15 minutes** from Reggae Beach",
        "⚡ **Faster and more flexible** than the passenger ferry",
        "📍 Default departure: **Reggae Beach, Southeast Peninsula**",
        "🌙 Available for **late returns** — arrange in advance",
        "📞 Can be hired from **other locations** — just call ahead",
      ],
      operators: [
        { name: "Islander Water Taxi", phone: "869-662-7081" },
        { name: "Blu Waves Water Taxi", phone: "869-662-1762" },
      ],
      salty_says: "Water taxis are the move if you're already on the Southeast Peninsula or want a faster, more direct crossing. They run roughly every 15 minutes from Reggae Beach and can be arranged for late nights — just coordinate directly with the operator before you go.",
      disclaimer: "⚠️ All schedules and availability are subject to change, especially during off-season. Confirm directly with operators before heading out.",
    },
  },

  taxi: {
    title: "Taxis & Getting Around",
    subtitle: "Fixed rates. Yellow plates. Know before you go.",
    before_you_go: [
      "🟡 Taxis have **yellow plates** starting with T or TA",
      "💵 Rates are **fixed in US dollars** for 1–4 passengers",
      "💳 Most taxis **do not take cards** — bring cash",
      "🌙 **50% surcharge** after 10pm",
      "🧳 Extra luggage charge on airport runs",
      "✅ Always confirm the fare **before** you get in",
    ],
    uber_title: "⚠️ About \"Ubers\" on St Kitts",
    uber_text: "There is no official Uber or Lyft on St Kitts. Some drivers operate informally through WhatsApp or apps and are commonly called \"Ubers\" locally — but they are **not sanctioned by the government** and ride at your own risk. If you do use one, always **confirm the driver's name** before getting in, and share your location with someone you trust.",
    fares_note: "USD · 1–4 passengers · representative only — confirm with driver",
    fare_column_1: "Basseterre",
    fare_column_2: "Frigate Bay",
    fare_column_3: "SE Peninsula",
    sample_fares: [
      { from: "Airport", column_1: "$15", column_2: "$25", column_3: "$65" },
      { from: "Basseterre", column_1: "—", column_2: "$25", column_3: "$65" },
      { from: "Brimstone Hill", column_1: "$60", column_2: "$65", column_3: "—" },
      { from: "Caribelle Batik", column_1: "$40", column_2: "$55", column_3: "—" },
      { from: "Cockleshell / Majors Bay", column_1: "$28", column_2: "$25", column_3: "$25" },
      { from: "South Friars Bay", column_1: "$25", column_2: "$15", column_3: "$30" },
    ],
    the_salt: "Shared taxis run from the cruise port to the beaches — around **US$10–25 per person**. Way cheaper than hiring a private cab. Look for the taxi stand at The Circus in Basseterre or near the ferry terminal.",
    taxi_stands: [
      { name: "The Circus", detail: "main taxi stand in central Basseterre", phone: "" },
      { name: "Ferry Terminal / Port Zante", detail: "taxis line up at arrivals", phone: "" },
      { name: "Frigate Bay Stand", detail: "near the main road on the Strip", phone: "869-465-4317" },
    ],
    stands_footer: "🍹 Any bar or restaurant will call one for you — just ask",
    h_bus_title: "🚌 H Buses (Public Minibuses)",
    h_bus_intro: "St Kitts has a public minibus system — locally called **H buses** because of their H licence plates.",
    h_bus_points: [
      "🛣️ Run through **Basseterre and throughout the island**",
      "🚫 Do **not** go to Frigate Bay or the Southeast Peninsula",
      "💵 **Cash only** — exact change is appreciated",
      "✋ **Hail them on the side of the road** — no fixed stops",
      "🎵 Expect music. Loud music.",
    ],
    late_night: "🌙 **Heading out past 11:30pm?** Arrange your taxi or ride in advance — they get harder to find late night, especially after a big event at Shiggidy Shack or a Carnival night. Don't get stranded.",
  },

  holidays: {
    title: "Holidays & Events",
    subtitle: "The St Kitts calendar — what's happening and when.",
    warning_title: "⚠️ We Take Our Holidays Seriously",
    warning_text: "On public holidays, **most businesses will be closed** — including gas stations, grocery stores, pharmacies, and banks. Plan ahead. Stock up the day before. Don't assume anything will be open, because chances are it won't be. This is not a complaint — it's island life at its finest.",
    big_events: [
      {
        emoji: "🎭",
        name: "Carnival",
        when: "Late December – Early January",
        description: "St Kitts Carnival — locally called Sugar Mas — is the most culturally significant celebration on the island. It runs from mid-December through January 2nd. The streets come alive with J'ouvert (jouvert), calypso, soca music, elaborate masquerade bands, and steel pan. The energy is electric and nothing else on the island compares.",
        highlights: [
          "J'ouvert — early morning street party, paint and powder everywhere",
          "Masquerade bands parade through Basseterre",
          "Calypso and soca competitions",
          "Street food, rum, and dancing until the sun comes up",
          "Last Lap on January 2nd closes it all out",
        ],
        the_salt: "J'ouvert is the street party on Boxing Day (December 26th), starting at 4am. No special costume needed — just show up. To join a costumed troupe and 'play mas,' check Instagram for the different troops — options vary each year and it's not cheap. For all Carnival events, take a taxi or 'Uber' in — parking is a disaster and you'll want both hands free.",
      },
      {
        emoji: "🎵",
        name: "St Kitts Music Festival",
        when: "Late June (usually last weekend)",
        description: "The St Kitts Music Festival is one of the premier music events in the Eastern Caribbean, drawing international and regional artists across R&B, reggae, soca, jazz, and gospel over three nights at the Warner Park stadium. It has hosted everyone from Lionel Richie to Beres Hammond. The crowd is a genuine mix of locals and visitors — this is not a tourist trap, it is a real event.",
        highlights: [
          "Three nights of live performances",
          "International headliners alongside Caribbean artists",
          "R&B, reggae, soca, jazz, and gospel stages",
          "Warner Park Stadium, Basseterre",
          "Street food vendors and bars around the venue",
        ],
        the_salt: "Book accommodation early — the island fills up fast during Music Fest weekend and prices spike. Friday night tends to have the best lineup.",
      },
    ],
    public_holidays: [
      { date: "Jan 1", name: "New Year's Day", note: "" },
      { date: "Jan 2", name: "Carnival Day (Last Lap)", note: "Final day of Carnival season" },
      { date: "Mar/Apr", name: "Good Friday", note: "Date varies" },
      { date: "Mar/Apr", name: "Easter Monday", note: "Date varies" },
      { date: "May", name: "Labour Day", note: "First Monday in May" },
      { date: "May/Jun", name: "Whit Monday", note: "Date varies" },
      { date: "Aug", name: "Emancipation Day", note: "First Monday in August" },
      { date: "Aug", name: "Culturama Day", note: "Nevis — first Tuesday after Emancipation Monday" },
      { date: "Sep 16", name: "National Heroes Day", note: "" },
      { date: "Sep 19", name: "Independence Day", note: "Big celebrations island-wide" },
      { date: "Dec 25", name: "Christmas Day", note: "" },
      { date: "Dec 26", name: "Boxing Day / J'ouvert", note: "" },
    ],
    footer: "Dates may shift year to year. Always verify locally.",
  },

  action_tings: {
    title: "Action Tings",
    subtitle: "Get off the beach and do something",
    activities: [
      { name: "Orange Cat Charters", description: "Private boat and snorkel charters.", phone: "", website: "https://orangecatcharters.com" },
      { name: "Jet Skis & Watersports", description: "Available at Frigate Bay and Cockleshell Bay.", phone: "", website: "" },
      { name: "Learn Watersports", description: "To learn kiteboarding, sailing and more, contact **Beach Addiction St Kitts Nevis** on Facebook.", phone: "", website: "" },
      { name: "Old Road Rum Tour", description: "Wingfield Estate, Old Road.", phone: "(869) 662-6888", website: "https://www.oldroadrum.com" },
      { name: "City Shine Rum Distillery Tour", description: "", phone: "+1-869-760-4978", website: "https://www.sknrum.com" },
      { name: "Zip Lining — Sky Safari Tours", description: "Wingfield rainforest.", phone: "+1 (869) 466-4259", website: "https://skysafaristkitts.com" },
      { name: "Greg's Safaris", description: "4×4 Land Rover island safaris.", phone: "", website: "https://gregsafaris.com" },
    ],
  },

  weather: {
    salty_take: "It's the Caribbean — warm, sunny, and occasionally dramatic. Expect temperatures in the mid-80s°F year-round, with brief afternoon showers that usually clear within 20 minutes. Hurricane season runs June through November, but direct hits are rare. Pack sunscreen and a light layer for the AC. You won't need an umbrella, but you'll definitely need the sunscreen.",
  },

  wording: {
    welcome: {
      title: "Welcome to Salty St Kitts 🧂",
      line_1: "Created by a salty expat who washed up here almost 10 years ago and never left.",
      line_2: "Built out of need and convenience.",
      signature: "Nobody pays to be here. Everything's based on years of experience, preference and subject to change.💚💛❤️",
      button: "Let's go →",
    },
    notes: {
      nobody_pays: "Nobody pays to be here. Everything's based on years of experience, preference and subject to change.💚💛❤️",
      beaches: "🏖️ All beaches in St Kitts are free and open to the public. You may be charged for amenities, but you can always access the beach. Swim at your own risk and to your ability. Leave only footprints.",
    },
    category_bar: {
      all: "All", beach: "Beaches", historical: "History", nature: "The Bush",
      loot: "Grocery", food_nightlife: "Lime & Dine", the_salt: "The Salt",
    },
    taglines: {
      all: "Every spot worth your time on this rock",
      beach: "Sand between your toes, Nevis in your face",
      historical: "Where the bodies are buried (historically speaking)",
      nature: "Trails, trailheads & jungle stuff",
      loot: "Shop smart, not tourist",
      food_nightlife: "Rum, fish & bad decisions",
      the_salt: "Straight from the source",
    },
    the_salt_header: {
      title: "The Salt",
      subtitle: "Unfiltered local knowledge. No fluff, no tourist trap nonsense.",
    },
    explore_by_area: {
      title: "Explore",
      subtitle: "Every spot on the island, your way",
      zones: {
        basseterre: { name: "Basseterre", subtitle: "The capital — history, food & hustle" },
        frigate: { name: "Frigate Bay & The Strip", subtitle: "Beach bars, eats & the good vibes zone" },
        sep: { name: "Southeast Peninsula", subtitle: "Hidden bays, wild beaches & the end of the road" },
        eastside: { name: "Eastside", subtitle: "Off the tourist map — real island life" },
        northeast: { name: "The Northeast", subtitle: "Villages, rainforest & the windward side" },
        dieppe: { name: "Dieppe Bay & The North", subtitle: "Black sand, fresh fish & the forgotten coast" },
        sandypoint: { name: "Sandy Point & The Northwest", subtitle: "Brimstone Hill, rum history & the sunset coast" },
        oldroad: { name: "Old Road & Middle Island", subtitle: "The first settlement — sugar ruins & deep roots" },
      },
      vibes: {
        history: { name: "History Buff", subtitle: "Forts, ruins & stories that shaped the island" },
        eat: { name: "Here to Eat", subtitle: "Local spots, beach bars & proper meals" },
        beach: { name: "Beach Mode", subtitle: "Sand, water & nothing to do" },
        active: { name: "Get Active", subtitle: "Hikes, trails & the real outdoors" },
        shop: { name: "Groceries & Booze", subtitle: "Where to shop, what to buy, and where to find it." },
      },
    },
    unlock_popup: {
      title: "Salty St Kitts",
      subtitle: "The Guide",
      free_label: "Free",
      free_items: ["🗺️ Map with pins", "🧂 The Salt", "⚡ Action Tings", "📍 Stop details"],
      paid_label: "Unlocked — $8.69",
      paid_items: ["✅ Google Maps directions", "✅ Ferry, Taxi, Weather", "✅ Explore By Area"],
      button: "Unlock for $8.69 — one time",
      code_link: "Already paid? Enter your code",
      skip: "Continue with free version",
    },
    feedback: {
      menu_label: "💬 Got a tip or spotted something wrong?",
      email: "salty@saltystkitts.com",
      email_subject: "Salty St Kitts app",
    },
    give_back: {
      menu_label: "💚💛❤️ Give Back",
      title: "Give Back",
      subtitle: "Love the guide? Here's how to give back.",
      beer_title: "🍺 Buy me a beer — $3.99",
      beer_text: "Keeps this app alive, updated, and salty.",
      beer_button: "Buy me a beer →",
      beer_link: "",
      causes: [
        { name: "🌊 St Kitts Coastal Alliance", description: "Founded by Salty St Kitts. Protecting our coastline and the communities who live on it. Support goes straight into work on the island.", button: "Support the cause →", link: "https://stkittscoastalalliance.org/#support" },
        { name: "🩺 PALS", description: "Medical care for the children of St Kitts & Nevis.", button: "Visit →", link: "https://palsstkitts.org/" },
        { name: "🐾 BARC", description: "Rescuing and rehoming animals across St Kitts.", button: "Visit →", link: "https://www.barcstkitts.com/" },
      ],
    },
  },
};

export type PageKey = keyof typeof PAGE_DEFAULTS;
export const PAGE_LABELS: Record<PageKey, string> = {
  ferry: "By Water",
  taxi: "Taxis",
  holidays: "Holidays",
  weather: "Weather",
  action_tings: "Action Tings",
  wording: "📝 Wording",
};
