// THE LIGHTHOUSE OF FORGOTTEN SOULS
// A Sierra-Style Adventure Game

const gameState = {
    currentRoom: 'beach',
    inventory: [],
    score: 0,
    moves: 0,
    flags: {
        lanternLit: false,
        doorUnlocked: false,
        ghostAppeased: false,
        mirrorUsed: false,
        bellRung: false,
        logbookRead: false,
        paintingExamined: false,
        secretPassageOpen: false,
        crystalCharged: false,
        lightBeamFixed: false,
        finalRitualDone: false,
        hasSeenGhost: false,
        ropeSecured: false,
        trapdoorOpen: false,
        musicBoxPlayed: false,
        locketOpened: false,
        ghostStoryKnown: false
    }
};

const items = {
    lantern: { name: 'brass lantern', description: 'An old brass lantern with some oil still in it.' },
    matches: { name: 'box of matches', description: 'A weathered box of waterproof matches.' },
    key: { name: 'iron key', description: 'A heavy iron key with a lighthouse emblem.' },
    logbook: { name: 'keeper\'s logbook', description: 'The lighthouse keeper\'s personal logbook, dated 1887.' },
    locket: { name: 'silver locket', description: 'A tarnished silver locket with an engraving: "To Eliza, Forever - Thomas"' },
    crystal: { name: 'focusing crystal', description: 'A large prismatic crystal that once focused the lighthouse beam.' },
    rope: { name: 'sturdy rope', description: 'A coil of strong nautical rope.' },
    musicbox: { name: 'music box', description: 'A delicate music box that plays a haunting melody.' },
    mirror: { name: 'hand mirror', description: 'An ornate silver hand mirror with strange symbols on the back.' },
    bell: { name: 'ship\'s bell', description: 'A small brass ship\'s bell, still has a clear tone.' },
    photograph: { name: 'faded photograph', description: 'A photograph of a man and woman standing before this very lighthouse.' }
};

const rooms = {
    beach: {
        name: 'Shipwreck Beach',
        image: 'images/beach.png',
        description: `You stand on a desolate beach littered with driftwood and debris from countless shipwrecks. The skeletal remains of an old sailing vessel jut from the sand nearby. To the north, a weathered path leads up the cliff toward a dark lighthouse. Fog rolls in from the sea, and you hear the mournful cry of gulls.

The lighthouse stands dark and foreboding against the gray sky. They say the keeper vanished forty years ago, and the light has never shone since.`,
        items: ['matches', 'rope'],
        exits: { north: 'cliff_path', east: 'shipwreck' },
        examine: {
            'driftwood': 'Bleached wood from many ships. The sea is unforgiving here.',
            'debris': 'Scattered remnants of maritime tragedy.',
            'fog': 'Thick, cold fog that seems almost alive.',
            'sand': 'Coarse gray sand mixed with broken shells.',
            'lighthouse': 'It looms above on the cliff, a dark sentinel. A path leads north toward it.',
            'sky': 'Overcast and oppressive, the clouds seem frozen in place.',
            'sea': 'Dark waters churn restlessly. No ships dare pass without the light.',
            'gulls': 'They circle overhead, their cries almost like warnings.'
        }
    },
    shipwreck: {
        name: 'The Wreck of the Adelaide',
        image: 'images/shipwreck.png',
        description: `You carefully climb into the tilted hull of the wrecked ship Adelaide. The wood groans beneath your feet. Barnacles and seaweed cover everything. A cargo hold to the east is partially accessible, and you can return west to the beach.

The ship's nameplate is barely legible: "ADELAIDE - 1885"`,
        items: ['lantern'],
        exits: { west: 'beach', east: 'cargo_hold' },
        examine: {
            'hull': 'The Adelaide met her end on these rocks decades ago.',
            'barnacles': 'They encrust every surface like a second skin.',
            'seaweed': 'Dried strands hang like ghostly curtains.',
            'nameplate': '"ADELAIDE - 1885" - This ship was lost the same time the lighthouse went dark.',
            'wood': 'Surprisingly solid despite the years. Good oak construction.',
            'cargo': 'The cargo hold is to the east.'
        }
    },
    cargo_hold: {
        name: 'Cargo Hold',
        image: 'images/cargo_hold.png',
        description: `The cargo hold is dark and damp. Rotted crates have spilled their contents across the tilted floor. Something glints in the corner. Water drips from above, and you hear skittering in the darkness.

A rusted ladder leads back up to the main deck to the west.`,
        items: ['bell', 'locket'],
        exits: { west: 'shipwreck' },
        examine: {
            'crates': 'Rotted wooden crates. Most contents have long since decayed or been claimed by the sea.',
            'ladder': 'Rusted but sturdy enough to climb back up.',
            'water': 'Seawater seeps in through cracks in the hull.',
            'darkness': 'Without a light source, you can only see what little light filters in.',
            'corner': 'Something metallic glints there - a locket perhaps?',
            'floor': 'Tilted at an angle, covered in debris and pooled water.'
        },
        conditional: () => {
            if (!gameState.flags.lanternLit) {
                return "It's very dark here. You can barely make out your surroundings.";
            }
            return "Your lantern illuminates the hold, revealing details you couldn't see before.";
        }
    },
    cliff_path: {
        name: 'Cliff Path',
        image: 'images/cliff_path.png',
        description: `A treacherous path winds up the cliff face. The wind howls fiercely here, threatening to push you over the edge. To the north, the path continues to the lighthouse grounds. South returns to the beach.

Carved into the cliff face, you notice strange symbols that seem to glow faintly in the mist.`,
        items: [],
        exits: { north: 'lighthouse_grounds', south: 'beach' },
        examine: {
            'path': 'Narrow and dangerous, worn smooth by countless footsteps over the years.',
            'cliff': 'Sheer rock face drops hundreds of feet to the churning sea below.',
            'wind': 'It never stops here, always pushing, always cold.',
            'symbols': 'Ancient protective wards, perhaps? They seem to ward against something from the sea.',
            'edge': 'Don\'t look down. Just... don\'t.',
            'mist': 'It curls around you like curious fingers.'
        },
        danger: {
            condition: () => !gameState.flags.ropeSecured && Math.random() < 0.3,
            message: "A powerful gust of wind catches you off guard! You lose your footing and tumble over the cliff edge!",
            death: true
        }
    },
    lighthouse_grounds: {
        name: 'Lighthouse Grounds',
        image: 'images/lighthouse_grounds.png',
        description: `You stand before the lighthouse itself, a towering stone structure covered in dying ivy. The main door is to the north, but it appears locked. An overgrown garden lies to the east, and a small cemetery to the west.

A weathered sign reads: "HARROWMERE LIGHT - Est. 1872 - Keeper: Thomas Ashworth"`,
        items: [],
        exits: {
            north: () => gameState.flags.doorUnlocked ? 'lighthouse_entry' : null,
            south: 'cliff_path',
            east: 'garden',
            west: 'cemetery'
        },
        examine: {
            'lighthouse': 'Built from gray stone, it rises over a hundred feet. The light chamber at the top is dark.',
            'door': gameState.flags.doorUnlocked ? 'The heavy oak door now stands open.' : 'A heavy oak door bound with iron. It\'s locked tight.',
            'ivy': 'Dead and brown, clinging to the stone like skeletal fingers.',
            'sign': '"HARROWMERE LIGHT - Est. 1872 - Keeper: Thomas Ashworth" - The keeper who vanished.',
            'garden': 'An overgrown garden lies to the east.',
            'cemetery': 'A small cemetery is visible to the west.'
        },
        actions: {
            'unlock door': () => {
                if (gameState.inventory.includes('key')) {
                    gameState.flags.doorUnlocked = true;
                    addScore(10);
                    return "You insert the iron key into the lock. With a grinding click, the door unlocks! You push it open, revealing darkness within.";
                }
                return "The door is locked. You need a key.";
            },
            'open door': () => {
                if (gameState.flags.doorUnlocked) {
                    return "The door is already open. You can go north to enter.";
                }
                return "The door is locked tight. You'll need to find a key.";
            }
        }
    },
    garden: {
        name: 'Overgrown Garden',
        image: 'images/garden.png',
        description: `What was once a lovingly tended garden has become a tangle of thorns and weeds. Dead roses cling to a rusted trellis. A stone bench sits beneath a gnarled apple tree, and a small greenhouse stands to the east.

Among the weeds, you notice the remains of medicinal herbs - this was an apothecary garden.`,
        items: ['musicbox'],
        exits: { west: 'lighthouse_grounds', east: 'greenhouse' },
        examine: {
            'roses': 'Dead now, but once they must have been beautiful. Red roses for love.',
            'trellis': 'Rusted iron, barely standing.',
            'bench': 'Stone, with carved initials: "T.A. & E.A." - Thomas and Eliza Ashworth?',
            'tree': 'A gnarled apple tree. A few withered apples still cling to its branches.',
            'weeds': 'They\'ve reclaimed the garden entirely.',
            'herbs': 'Lavender, sage, and other medicinal plants, long dead.',
            'greenhouse': 'A small glass structure to the east, miraculously still intact.'
        }
    },
    greenhouse: {
        name: 'The Greenhouse',
        image: 'images/greenhouse.png',
        description: `The greenhouse is filled with dead plants and broken pots. But somehow, in the center, a single moonflower blooms impossibly - glowing with an ethereal silver light. The air here feels different, charged with something.

On a worktable, you see the remains of alchemical equipment.`,
        items: ['mirror'],
        exits: { west: 'garden' },
        examine: {
            'moonflower': 'It glows with its own light, silver and pure. It shouldn\'t be able to survive here.',
            'pots': 'Broken terracotta scattered everywhere.',
            'plants': 'All dead except for the moonflower.',
            'worktable': 'Alchemical equipment - beakers, tubes, a mortar and pestle. The keeper was experimenting with something.',
            'equipment': 'Alchemical tools. Notes nearby mention "capturing light" and "binding spirits."',
            'air': 'It tingles against your skin, like static electricity.'
        }
    },
    cemetery: {
        name: 'Small Cemetery',
        image: 'images/cemetery.png',
        description: `A small cemetery holds perhaps a dozen weathered headstones. Most are too worn to read, but one is clearly newer than the others - though still decades old. An iron fence surrounds the grounds, and dead flowers lie scattered before the newest grave.

The fog is thicker here, and you feel watched.`,
        items: ['key'],
        exits: { east: 'lighthouse_grounds' },
        examine: {
            'headstones': 'Former lighthouse keepers and their families, going back generations.',
            'grave': 'The newest grave reads: "ELIZA ASHWORTH - 1859-1887 - Beloved Wife - Lost to the Sea"',
            'fence': 'Rusted iron, topped with decorative spikes.',
            'flowers': 'Dead flowers, but someone placed them here. Who still visits?',
            'fog': 'It swirls around you unnaturally, as if curious.',
            'eliza': 'She died the same year the lighthouse went dark. Thomas\'s wife.'
        },
        onEnter: () => {
            if (!gameState.flags.hasSeenGhost && gameState.flags.lanternLit) {
                gameState.flags.hasSeenGhost = true;
                return "\n\nAs you enter, your lantern flickers. A translucent figure appears by Eliza's grave - a woman in a Victorian dress, her face sad and longing. She reaches toward you, mouths something you can't hear, then fades away.\n\nYour heart pounds. The ghost of Eliza Ashworth!";
            }
            return "";
        }
    },
    lighthouse_entry: {
        name: 'Lighthouse Entry',
        image: 'images/lighthouse_entry.png',
        description: `You stand in the entry hall of the lighthouse. Dust covers everything, and cobwebs hang like curtains. A spiral staircase winds upward into darkness. Doors lead to a sitting room to the east and a kitchen to the west.

Portraits line the walls - generations of lighthouse keepers. The last one shows a stern man with kind eyes.`,
        items: [],
        exits: { south: 'lighthouse_grounds', up: 'spiral_stairs', east: 'sitting_room', west: 'kitchen' },
        examine: {
            'dust': 'Decades of accumulated dust. No one has been here in a very long time.',
            'cobwebs': 'Thick and gray, the spiders have long since abandoned them.',
            'staircase': 'A spiral iron staircase winds upward toward the light chamber.',
            'portraits': 'Keepers and their families. The last portrait shows Thomas Ashworth, dated 1887.',
            'thomas': 'He looks determined but sad in the portrait. His eyes seem to follow you.',
            'walls': 'Stone walls, cold and slightly damp.'
        },
        conditional: () => {
            if (!gameState.flags.lanternLit) {
                return "It's very dark inside. Your lantern would be useful if it were lit.";
            }
            return "";
        }
    },
    sitting_room: {
        name: 'Sitting Room',
        image: 'images/sitting_room.png',
        description: `A cozy sitting room, frozen in time. Two chairs face a cold fireplace, a book lies open on a side table, and a painting hangs above the mantle - a portrait of a beautiful woman with sad eyes.

Everything is covered in dust, but it feels like someone could walk in at any moment.`,
        items: ['photograph'],
        exits: { west: 'lighthouse_entry' },
        examine: {
            'chairs': 'Two comfortable chairs, positioned for conversation or reading together.',
            'fireplace': 'Cold and empty. Ashes from the last fire remain.',
            'book': 'A volume of poetry, open to a page marked with a pressed flower. The poem is about loss.',
            'painting': 'A beautiful woman - Eliza Ashworth, surely. Her eyes seem infinitely sad.',
            'table': 'A small side table with the book and a cold cup of tea, never finished.',
            'dust': 'Years of accumulated silence.',
            'mantle': 'A few personal items - a pipe, some dried flowers, the painting above.'
        },
        onEnter: () => {
            if (!gameState.flags.paintingExamined) {
                return "\n\nAs you enter, you could swear the painting's eyes followed you.";
            }
            return "";
        },
        actions: {
            'examine painting': () => {
                if (!gameState.flags.paintingExamined) {
                    gameState.flags.paintingExamined = true;
                    addScore(5);
                    return "You look closely at the painting of Eliza. She was beautiful. As you stare, her expression seems to change from sadness to hope, just for a moment. Behind the painting, you notice the wall sounds hollow when tapped.";
                }
                return "The painting of Eliza. Behind it, the wall is hollow.";
            },
            'move painting': () => {
                if (gameState.flags.paintingExamined) {
                    gameState.flags.secretPassageOpen = true;
                    addScore(10);
                    return "You carefully move the painting aside, revealing a hidden compartment! Inside, you find the keeper's logbook.";
                }
                return "You should examine it more closely first.";
            }
        }
    },
    kitchen: {
        name: 'Kitchen',
        image: 'images/kitchen.png',
        description: `An old kitchen with a cast-iron stove, copper pots hanging from hooks, and a wooden table set for two. Plates of food have long since rotted away to nothing. A trapdoor in the floor leads to a cellar.

It's like they vanished mid-meal.`,
        items: [],
        exits: { east: 'lighthouse_entry', down: () => gameState.flags.trapdoorOpen ? 'cellar' : null },
        examine: {
            'stove': 'A cast-iron wood stove, cold for forty years.',
            'pots': 'Copper pots, green with verdigris.',
            'table': 'Set for two. They never finished their dinner.',
            'plates': 'Whatever was on them has long since become dust.',
            'trapdoor': gameState.flags.trapdoorOpen ? 'The trapdoor is open, revealing steps down to the cellar.' : 'A heavy wooden trapdoor with an iron ring. It seems to be stuck.',
            'food': 'Nothing remains but memory.'
        },
        actions: {
            'open trapdoor': () => {
                if (!gameState.flags.trapdoorOpen) {
                    gameState.flags.trapdoorOpen = true;
                    addScore(5);
                    return "You heave on the iron ring. With a grinding protest, the trapdoor opens, revealing stone steps leading down into darkness.";
                }
                return "It's already open.";
            }
        }
    },
    cellar: {
        name: 'Wine Cellar',
        image: 'images/cellar.png',
        description: `A cold stone cellar lined with wine racks, mostly empty. Boxes and crates are stacked against the walls. In one corner, you notice strange markings on the floor - a ritual circle of some kind.

The air is cold and damp, and your breath mists before you.`,
        items: ['crystal'],
        exits: { up: 'kitchen' },
        examine: {
            'wine': 'A few dusty bottles remain. The labels have long faded.',
            'racks': 'Wooden wine racks, mostly bare.',
            'crates': 'Old supplies - candles, oil, rope. Some are marked with shipping labels from Boston.',
            'circle': 'A ritual circle drawn in what might be chalk or salt. Symbols surround it - the same symbols from the cliff path. This was meant to summon or bind something.',
            'markings': 'Protective wards and binding symbols. Thomas was trying to do something with the supernatural.',
            'floor': 'Stone, cold and slightly damp.'
        },
        conditional: () => {
            if (!gameState.flags.lanternLit) {
                return "It's pitch black down here. You need a light source.";
            }
            return "";
        }
    },
    spiral_stairs: {
        name: 'Spiral Staircase',
        image: 'images/spiral_stairs.png',
        description: `You climb the narrow spiral staircase, your footsteps echoing on the iron steps. Windows occasionally offer glimpses of the fog-shrouded sea below. The stairs seem to go on forever.

At the top, you can see the light chamber. Halfway up, a door leads to the keeper's quarters.`,
        items: [],
        exits: { down: 'lighthouse_entry', up: 'light_chamber', east: 'keepers_quarters' },
        examine: {
            'stairs': 'Iron spiral stairs, your footsteps ring out in the silence.',
            'windows': 'Small windows offer dizzying views of the cliff and sea below.',
            'chamber': 'The light chamber waits above, dark and silent.',
            'door': 'A wooden door leads to the keeper\'s personal quarters.'
        }
    },
    keepers_quarters: {
        name: 'Keeper\'s Quarters',
        image: 'images/keepers_quarters.png',
        description: `The keeper's personal living quarters. A narrow bed, a writing desk, and a wardrobe fill the small curved room. Papers are scattered across the desk, and the bed is unmade, as if someone left in a hurry.

Through the window, you can see the churchyard far below.`,
        items: ['logbook'],
        exits: { west: 'spiral_stairs' },
        examine: {
            'bed': 'Unmade, sheets thrown aside as if he left in a panic.',
            'desk': 'Papers everywhere - calculations, star charts, and what looks like a letter, never finished.',
            'wardrobe': 'Contains the keeper\'s clothes, neatly hung. He didn\'t pack.',
            'papers': 'Notes about light refraction, spiritual energy, and "saving her." Thomas was obsessed with something.',
            'letter': '"My dearest Eliza, I have found a way to bring you back. Tonight, when the moon is full, I will—" It ends there.',
            'window': 'The cemetery is visible below. You can see Eliza\'s grave.'
        },
        actions: {
            'read logbook': () => {
                if (gameState.inventory.includes('logbook')) {
                    gameState.flags.logbookRead = true;
                    gameState.flags.ghostStoryKnown = true;
                    addScore(10);
                    return `You open the keeper's logbook and read:

"September 3, 1887 - Eliza is gone. The storm took her. I pulled her from the sea but it was too late. The light failed that night. I failed her.

September 15 - I've found old texts. There may be a way to bring her spirit back. The moonflower, the crystal, the light...

October 1 - I've seen her! A ghost, trapped between worlds. The light can guide spirits home. If I can restore it properly, with the crystal focused just right...

October 13 - Tonight is the full moon. I will perform the ritual. If I fail, whoever finds this: the crystal must be placed in the light chamber, charged by moonlight, then ring the bell three times while holding something that was hers. The light will guide her home.

I love you, Eliza. I'm coming."

He never wrote again.`;
                }
                return "You don't have the logbook.";
            }
        }
    },
    light_chamber: {
        name: 'Light Chamber',
        image: 'images/light_chamber.png',
        description: `You emerge into the light chamber at the very top of the lighthouse. The great lens mechanism dominates the room - a massive Fresnel lens, now dark and dusty. The housing where a crystal should focus the beam is empty.

The windows offer a 360-degree view of the fog-shrouded coast. On clear days, ships for miles must have seen this light.`,
        items: [],
        exits: { down: 'spiral_stairs', out: 'gallery' },
        examine: {
            'lens': 'A magnificent Fresnel lens, designed to amplify and focus light for miles. But something is missing from the center.',
            'housing': 'A cradle where a focusing crystal should sit. It\'s empty.',
            'windows': 'Glass all around, now grimy with salt and age.',
            'mechanism': 'The rotation mechanism is seized. This light hasn\'t turned in forty years.',
            'view': 'Fog obscures everything, but you can imagine how far the light once reached.'
        },
        actions: {
            'place crystal': () => {
                if (gameState.inventory.includes('crystal')) {
                    removeFromInventory('crystal');
                    gameState.flags.crystalCharged = true;
                    addScore(15);
                    return "You carefully place the focusing crystal into its housing. It fits perfectly! Moonlight filtering through the windows catches the crystal, and it begins to glow with an inner light. The lens seems to hum with potential energy.";
                }
                return "You don't have a crystal to place.";
            },
            'insert crystal': () => {
                return rooms.light_chamber.actions['place crystal']();
            }
        }
    },
    gallery: {
        name: 'Outer Gallery',
        image: 'images/gallery.png',
        description: `You step out onto the narrow gallery that circles the light chamber. The wind is fierce up here, and the fog swirls around you. The railing is rusted but sturdy. You can see the entire coast from here - when the fog parts, at least.

This is where Thomas must have spent his final night.`,
        items: [],
        exits: { 'in': 'light_chamber' },
        examine: {
            'railing': 'Iron railing, rusted but still solid.',
            'wind': 'It never stops up here. It carries whispers you can almost understand.',
            'fog': 'It parts occasionally, revealing glimpses of the dark sea below.',
            'coast': 'Rocky and treacherous. No wonder ships needed the light.',
            'view': 'On a clear night, you could see forever from here.'
        },
        actions: {
            'ring bell': () => {
                if (gameState.inventory.includes('bell')) {
                    if (gameState.flags.crystalCharged && gameState.inventory.includes('locket')) {
                        return performFinalRitual();
                    } else if (!gameState.flags.crystalCharged) {
                        gameState.flags.bellRung = true;
                        return "You ring the bell. Its clear tone echoes across the fog-shrouded coast. For a moment, you think you see shapes moving in the mist below. But nothing else happens. Perhaps you need to do something else first.";
                    } else {
                        return "You ring the bell. The sound is beautiful but nothing happens. You feel like you need something that belonged to Eliza.";
                    }
                }
                return "You don't have a bell.";
            }
        },
        danger: {
            condition: () => !gameState.flags.ropeSecured && Math.random() < 0.2,
            message: "A sudden gust of wind catches you off guard! You tumble over the railing!",
            death: true
        }
    }
};

// Add logbook to keeper's quarters if secret passage is open
const updateLogbookLocation = () => {
    if (gameState.flags.secretPassageOpen && !gameState.inventory.includes('logbook')) {
        if (!rooms.sitting_room.items.includes('logbook')) {
            rooms.sitting_room.items.push('logbook');
        }
    }
};

function performFinalRitual() {
    gameState.flags.finalRitualDone = true;
    addScore(30);

    // Update image to winning scene
    const imgElement = document.getElementById('room-image');
    imgElement.src = generateWinningImage();

    return `You hold the silver locket tight and ring the bell three times.

DONG... DONG... DONG...

The crystal in the light chamber blazes to life! A brilliant beam of light shoots out through the fog, not the warm yellow of oil lamps, but pure silver moonlight. The great lens begins to turn, though nothing drives it.

The fog parts before the light, and you see them - dozens of ghostly ships appearing on the horizon, their spectral sails full of ethereal wind. They had been lost, trapped in the fog for forty years.

And then SHE appears.

Eliza Ashworth materializes before you, no longer sad but radiant with joy. Behind her, another figure forms - Thomas, his vigil finally at an end.

"Thank you," Eliza whispers, her voice like distant bells. "He waited so long to guide me home."

Thomas takes her hand. They look at each other with a love that transcends death itself.

"The light will shine again," Thomas says to you. "Watch over it."

Together, they turn toward the beam of light. As they step into it, their forms dissolve into pure radiance that joins with the lighthouse beam.

Below, the ghost ships begin to sail - finally free to complete their journeys to whatever harbor awaits beyond.

The fog lifts entirely for the first time in forty years. In the distance, you see the lights of the mainland. The lighthouse beam sweeps across the sea, strong and true.

You have restored the Lighthouse of Forgotten Souls.`;
}

function generateWinningImage() {
    // Generate a triumphant scene with the lighthouse lit
    const EGA = {
        black: '#000000',
        blue: '#0000AA',
        green: '#00AA00',
        cyan: '#00AAAA',
        red: '#AA0000',
        magenta: '#AA00AA',
        brown: '#AA5500',
        lightGray: '#AAAAAA',
        darkGray: '#555555',
        lightBlue: '#5555FF',
        lightGreen: '#55FF55',
        lightCyan: '#55FFFF',
        lightRed: '#FF5555',
        lightMagenta: '#FF55FF',
        yellow: '#FFFF55',
        white: '#FFFFFF'
    };

    function rect(x, y, w, h, color) {
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
    }

    let svg = '';

    // Night sky with stars
    svg += rect(0, 0, 640, 200, '#111133');
    for (let i = 0; i < 30; i++) {
        const x = Math.floor(Math.random() * 640);
        const y = Math.floor(Math.random() * 150);
        svg += rect(x, y, 2, 2, EGA.white);
    }

    // Moon
    svg += rect(500, 30, 50, 50, EGA.yellow);
    svg += rect(505, 35, 40, 40, EGA.white);

    // Sea (calmer now)
    svg += rect(0, 200, 640, 200, '#000066');
    // Moonlight reflection on water
    svg += rect(480, 200, 80, 150, 'rgba(255,255,150,0.1)');
    svg += rect(500, 220, 40, 100, 'rgba(255,255,150,0.15)');

    // Lighthouse on cliff
    svg += rect(200, 100, 100, 200, EGA.darkGray);
    svg += rect(210, 110, 80, 180, EGA.lightGray);

    // GLOWING LIGHT CHAMBER
    svg += rect(190, 70, 120, 40, EGA.darkGray);
    svg += rect(220, 50, 60, 30, EGA.yellow);
    svg += rect(225, 55, 50, 20, EGA.white);

    // Light beam sweeping out!
    svg += `<polygon points="250,65 0,100 0,180 250,65" fill="rgba(255,255,150,0.3)"/>`;
    svg += `<polygon points="250,65 640,50 640,150 250,65" fill="rgba(255,255,150,0.3)"/>`;

    // Cliff
    svg += rect(150, 250, 200, 150, EGA.darkGray);
    svg += rect(160, 260, 180, 140, '#666666');

    // Ghost ships sailing away (more visible now)
    svg += rect(50, 280, 60, 35, 'rgba(200,200,255,0.5)');
    svg += rect(70, 250, 8, 35, 'rgba(200,200,255,0.5)');
    svg += rect(55, 255, 40, 20, 'rgba(200,200,255,0.4)');

    svg += rect(400, 260, 70, 40, 'rgba(200,200,255,0.5)');
    svg += rect(425, 225, 10, 40, 'rgba(200,200,255,0.5)');
    svg += rect(405, 230, 50, 25, 'rgba(200,200,255,0.4)');

    svg += rect(550, 290, 50, 30, 'rgba(200,200,255,0.4)');
    svg += rect(565, 270, 6, 25, 'rgba(200,200,255,0.4)');

    // Two ghostly figures in the light (Thomas and Eliza)
    svg += rect(235, 75, 10, 25, 'rgba(255,255,255,0.7)');
    svg += rect(255, 75, 10, 25, 'rgba(255,255,255,0.7)');

    // Mainland lights visible
    for (let i = 0; i < 8; i++) {
        svg += rect(10 + i * 80, 350 + (i % 2) * 5, 4, 4, EGA.yellow);
    }

    // "THE END" in the sky
    // (we'll let the text display handle this)

    return `data:image/svg+xml,${encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400" shape-rendering="crispEdges">
<style>rect{shape-rendering:crispEdges}</style>
${svg}
</svg>`)}`;
}

function addScore(points) {
    gameState.score += points;
    updateStatusBar();
}

function addToInventory(item) {
    if (!gameState.inventory.includes(item)) {
        gameState.inventory.push(item);
        updateInventoryDisplay();
    }
}

function removeFromInventory(item) {
    const index = gameState.inventory.indexOf(item);
    if (index > -1) {
        gameState.inventory.splice(index, 1);
        updateInventoryDisplay();
    }
}

function updateInventoryDisplay() {
    const display = document.getElementById('inventory-display');
    if (gameState.inventory.length === 0) {
        display.textContent = 'Inventory: (empty)';
    } else {
        const itemNames = gameState.inventory.map(i => items[i].name);
        display.textContent = 'Inventory: ' + itemNames.join(', ');
    }
}

function updateStatusBar() {
    document.getElementById('score').textContent = `Score: ${gameState.score} of 100`;
    document.getElementById('moves').textContent = `Moves: ${gameState.moves}`;
}

function displayText(text) {
    const textWindow = document.getElementById('game-text');
    textWindow.textContent = text;
    textWindow.parentElement.scrollTop = textWindow.parentElement.scrollHeight;
}

function appendText(text) {
    const textWindow = document.getElementById('game-text');
    textWindow.textContent += '\n\n' + text;
    textWindow.parentElement.scrollTop = textWindow.parentElement.scrollHeight;
}

function showRoom(roomId) {
    const room = rooms[roomId];
    if (!room) {
        displayText("Error: Room not found!");
        return;
    }

    gameState.currentRoom = roomId;

    // Update image - use generated EGA-style images
    const imgElement = document.getElementById('room-image');
    if (window.gameImages && window.gameImages[roomId]) {
        imgElement.src = window.gameImages[roomId];
    } else {
        imgElement.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
                <rect fill="#000055" width="640" height="400"/>
                <text x="320" y="200" text-anchor="middle" fill="#5555ff" font-family="monospace" font-size="20">${room.name}</text>
            </svg>
        `);
    }

    // Update room label
    document.getElementById('room-label').textContent = room.name;

    // Build description
    let fullDescription = room.description;

    // Add conditional text
    if (room.conditional) {
        const conditional = room.conditional();
        if (conditional) {
            fullDescription += '\n\n' + conditional;
        }
    }

    // List visible items
    if (room.items && room.items.length > 0) {
        const visibleItems = room.items.map(i => items[i].name);
        fullDescription += '\n\nYou can see: ' + visibleItems.join(', ');
    }

    // List exits
    const exits = [];
    for (const [dir, dest] of Object.entries(room.exits)) {
        if (typeof dest === 'function') {
            if (dest()) exits.push(dir);
        } else if (dest) {
            exits.push(dir);
        }
    }
    fullDescription += '\n\nExits: ' + exits.join(', ');

    displayText(fullDescription);

    // Handle onEnter events
    if (room.onEnter) {
        const enterText = room.onEnter();
        if (enterText) {
            appendText(enterText);
        }
    }

    // Check for danger
    if (room.danger && room.danger.condition()) {
        setTimeout(() => {
            showDeath(room.danger.message);
        }, 1000);
    }
}

function showDeath(message) {
    document.getElementById('death-message').textContent = message;
    document.getElementById('death-screen').style.display = 'flex';
}

function showWin(message) {
    document.getElementById('win-message').textContent = message;
    document.getElementById('win-screen').style.display = 'flex';
}

function restartGame() {
    location.reload();
}

function parseCommand(input) {
    input = input.toLowerCase().trim();
    gameState.moves++;
    updateStatusBar();

    const room = rooms[gameState.currentRoom];

    // Check for final ritual success
    if (gameState.flags.finalRitualDone) {
        setTimeout(() => {
            showWin(`Final Score: ${gameState.score} of 100

You restored the Lighthouse of Forgotten Souls and freed
the spirits of Thomas and Eliza Ashworth.

The light shines once more, guiding ships safely past
the treacherous coast. The ghost ships have finally
reached their eternal harbors.

Thank you for playing!`);
        }, 5000);
        displayText("The lighthouse beam sweeps majestically across the sea...\n\nTHE END");
        return;
    }

    // Direction commands
    const directions = {
        'n': 'north', 'north': 'north', 'go north': 'north',
        's': 'south', 'south': 'south', 'go south': 'south',
        'e': 'east', 'east': 'east', 'go east': 'east',
        'w': 'west', 'west': 'west', 'go west': 'west',
        'u': 'up', 'up': 'up', 'go up': 'up', 'climb': 'up', 'climb stairs': 'up', 'climb up': 'up',
        'd': 'down', 'down': 'down', 'go down': 'down', 'climb down': 'down',
        'in': 'in', 'go in': 'in', 'enter': 'in', 'inside': 'in',
        'out': 'out', 'go out': 'out', 'exit': 'out', 'outside': 'out'
    };

    if (directions[input]) {
        const dir = directions[input];
        if (room.exits[dir]) {
            let destination = room.exits[dir];
            if (typeof destination === 'function') {
                destination = destination();
            }
            if (destination) {
                showRoom(destination);
            } else {
                displayText("You can't go that way right now.");
            }
        } else {
            displayText("You can't go that way.");
        }
        return;
    }

    // Look command
    if (input === 'look' || input === 'l') {
        showRoom(gameState.currentRoom);
        return;
    }

    // Inventory command
    if (input === 'inventory' || input === 'i' || input === 'inv') {
        if (gameState.inventory.length === 0) {
            displayText("You are carrying nothing.");
        } else {
            let inv = "You are carrying:\n";
            for (const item of gameState.inventory) {
                inv += `  - ${items[item].name}\n`;
            }
            displayText(inv);
        }
        return;
    }

    // Examine/Look at commands
    const examineMatch = input.match(/^(?:examine|look at|look|x|check|inspect)\s+(.+)$/);
    if (examineMatch) {
        const target = examineMatch[1];

        // Check room examine options
        if (room.examine && room.examine[target]) {
            let examineText = room.examine[target];
            if (typeof examineText === 'function') {
                examineText = examineText();
            }
            displayText(examineText);
            return;
        }

        // Check inventory items
        for (const item of gameState.inventory) {
            if (items[item].name.includes(target) || item.includes(target)) {
                displayText(items[item].description);
                return;
            }
        }

        // Check room items
        if (room.items) {
            for (const item of room.items) {
                if (items[item].name.includes(target) || item.includes(target)) {
                    displayText(items[item].description);
                    return;
                }
            }
        }

        displayText("You don't see that here.");
        return;
    }

    // Take/Get commands
    const takeMatch = input.match(/^(?:take|get|pick up|grab)\s+(.+)$/);
    if (takeMatch) {
        const target = takeMatch[1];

        if (room.items) {
            for (let i = 0; i < room.items.length; i++) {
                const item = room.items[i];
                if (items[item].name.includes(target) || item.includes(target)) {
                    room.items.splice(i, 1);
                    addToInventory(item);
                    addScore(5);
                    displayText(`You take the ${items[item].name}.`);
                    return;
                }
            }
        }

        displayText("You don't see that here.");
        return;
    }

    // Use/Light commands for lantern
    if (input.includes('light lantern') || input.includes('use matches') || input.includes('light lamp')) {
        if (gameState.inventory.includes('lantern') && gameState.inventory.includes('matches')) {
            if (!gameState.flags.lanternLit) {
                gameState.flags.lanternLit = true;
                addScore(5);
                displayText("You strike a match and light the lantern. It glows with warm, steady light, pushing back the darkness.");
            } else {
                displayText("The lantern is already lit.");
            }
        } else if (!gameState.inventory.includes('lantern')) {
            displayText("You don't have a lantern.");
        } else {
            displayText("You need something to light it with.");
        }
        return;
    }

    // Tie rope command
    if (input.includes('tie rope') || input.includes('secure rope') || input.includes('use rope')) {
        if (gameState.inventory.includes('rope')) {
            if (gameState.currentRoom === 'cliff_path' || gameState.currentRoom === 'gallery') {
                gameState.flags.ropeSecured = true;
                removeFromInventory('rope');
                addScore(5);
                displayText("You secure the rope to a sturdy anchor point. This will help prevent falls.");
            } else {
                displayText("There's nowhere useful to tie the rope here.");
            }
        } else {
            displayText("You don't have a rope.");
        }
        return;
    }

    // Play music box
    if (input.includes('play music') || input.includes('open music') || input.includes('wind music') || input.includes('use music')) {
        if (gameState.inventory.includes('musicbox')) {
            gameState.flags.musicBoxPlayed = true;
            displayText("You wind the music box and open it. A haunting melody plays - a lullaby, perhaps. For a moment, the temperature drops and you feel a presence nearby. The ghost of Eliza seems drawn to the music.");
        } else {
            displayText("You don't have a music box.");
        }
        return;
    }

    // Open locket
    if (input.includes('open locket') || input.includes('examine locket') || input.includes('look locket')) {
        if (gameState.inventory.includes('locket')) {
            if (!gameState.flags.locketOpened) {
                gameState.flags.locketOpened = true;
                addScore(5);
                displayText("You open the locket. Inside is a tiny portrait of Thomas and Eliza together, and a lock of auburn hair. The inscription reads: 'To Eliza, Forever - Thomas'. This was her locket.");
            } else {
                displayText("Inside the locket is a portrait of Thomas and Eliza, and a lock of her hair. It was clearly precious to her.");
            }
        } else {
            displayText("You don't have a locket.");
        }
        return;
    }

    // Read commands
    const readMatch = input.match(/^(?:read)\s+(.+)$/);
    if (readMatch) {
        const target = readMatch[1];
        if (target.includes('logbook') || target.includes('log') || target.includes('book')) {
            if (gameState.inventory.includes('logbook')) {
                const result = rooms.keepers_quarters.actions['read logbook']();
                displayText(result);
                return;
            }
        }
        if (target.includes('letter') && gameState.currentRoom === 'keepers_quarters') {
            displayText(room.examine['letter']);
            return;
        }
        displayText("There's nothing to read there.");
        return;
    }

    // Check for room-specific actions
    if (room.actions) {
        for (const [action, handler] of Object.entries(room.actions)) {
            if (input.includes(action) || input === action) {
                const result = handler();
                displayText(result);
                updateLogbookLocation();
                return;
            }
        }
    }

    // Ring bell anywhere
    if (input.includes('ring bell') || input.includes('use bell')) {
        if (gameState.inventory.includes('bell')) {
            if (gameState.currentRoom === 'gallery') {
                const result = rooms.gallery.actions['ring bell']();
                displayText(result);
            } else {
                displayText("You ring the bell. Its clear tone echoes around you, but nothing happens here. Perhaps there's a more appropriate place to do this.");
            }
        } else {
            displayText("You don't have a bell.");
        }
        return;
    }

    // Use mirror
    if (input.includes('use mirror') || input.includes('look mirror') || input.includes('look in mirror')) {
        if (gameState.inventory.includes('mirror')) {
            gameState.flags.mirrorUsed = true;
            displayText("You gaze into the mirror. For a moment, instead of your reflection, you see Eliza's face looking back at you, her lips moving silently. Then she's gone, and it's just you again. The symbols on the back seem to glow faintly.");
        } else {
            displayText("You don't have a mirror.");
        }
        return;
    }

    // Save/restore commands (just for flavor)
    if (input === 'save') {
        displayText("Game saved! (Not really - this is a browser game. But it's the thought that counts.)");
        return;
    }
    if (input === 'restore' || input === 'load') {
        displayText("Restore from what save? (Just kidding. Refresh the page to restart.)");
        return;
    }

    // About command
    if (input === 'about' || input === 'credits') {
        displayText(`THE LIGHTHOUSE OF FORGOTTEN SOULS
A Sierra-Style Adventure Game

Created with love for the golden age of adventure gaming.

Inspired by King's Quest, Space Quest, and the countless hours
spent typing "LOOK AT TREE" only to be told "I don't understand."

No animals were harmed in the making of this game.
Several ghosts, however, were disturbed.

Type HELP for commands.`);
        return;
    }

    // Help command
    if (input === 'help' || input === '?') {
        displayText(`COMMANDS:
MOVEMENT: N/S/E/W/U/D or NORTH/SOUTH/EAST/WEST/UP/DOWN
          Also: IN, OUT, CLIMB, ENTER

ACTIONS:  LOOK - Examine surroundings
          EXAMINE [thing] - Look closely at something
          TAKE [item] - Pick up an item
          INVENTORY - See what you're carrying
          USE [item] - Use an item
          OPEN [item] - Open something
          READ [item] - Read text
          LIGHT LANTERN - Light your lantern
          RING BELL - Ring the bell
          TIE ROPE - Secure rope in windy areas

TIPS: Examine EVERYTHING! Read what you find!
      The story holds the key to the puzzles.
      If you die, you can RESTORE (restart).`);
        return;
    }

    // Quit
    if (input === 'quit' || input === 'q') {
        displayText("Thanks for playing The Lighthouse of Forgotten Souls!");
        return;
    }

    // Hint system
    if (input === 'hint' || input === 'hints') {
        displayText(getHint());
        return;
    }

    // Wait command
    if (input === 'wait' || input === 'z') {
        const waitMessages = [
            "Time passes...",
            "You wait. The fog swirls around you.",
            "Nothing happens. The lighthouse looms silently.",
            "You hear the distant cry of seagulls.",
            "The wind howls mournfully.",
            "You feel a chill that has nothing to do with the weather."
        ];
        displayText(waitMessages[Math.floor(Math.random() * waitMessages.length)]);
        return;
    }

    // Talk/speak commands
    if (input.startsWith('talk') || input.startsWith('speak') || input.startsWith('say')) {
        if (gameState.flags.hasSeenGhost) {
            displayText("You call out, but the ghost does not respond. Perhaps there's another way to communicate with her...");
        } else {
            displayText("There's no one here to talk to. Only the wind answers your call.");
        }
        return;
    }

    // Pray command (easter egg)
    if (input === 'pray') {
        displayText("You offer a silent prayer for the souls of Thomas and Eliza. The air seems to warm slightly, just for a moment.");
        return;
    }

    // Default response
    displayText("I don't understand that command. Type HELP for a list of commands, or HINT if you're stuck.");
}

function getHint() {
    // Provide context-sensitive hints based on game progress
    if (!gameState.flags.lanternLit && gameState.inventory.includes('lantern') && gameState.inventory.includes('matches')) {
        return "HINT: You have a lantern and matches. Perhaps you should LIGHT LANTERN?";
    }
    if (!gameState.inventory.includes('lantern')) {
        return "HINT: The shipwreck to the east might have useful supplies...";
    }
    if (!gameState.flags.lanternLit) {
        return "HINT: You'll need light to explore dark places. Look for matches on the beach.";
    }
    if (!gameState.inventory.includes('key')) {
        return "HINT: The cemetery to the west of the lighthouse might hold secrets. Examine Eliza's grave carefully.";
    }
    if (!gameState.flags.doorUnlocked) {
        return "HINT: The lighthouse door is locked. Try to UNLOCK DOOR at the lighthouse grounds.";
    }
    if (!gameState.flags.logbookRead && !gameState.inventory.includes('logbook')) {
        return "HINT: There might be hidden secrets in the sitting room. EXAMINE the PAINTING carefully, then MOVE it.";
    }
    if (gameState.inventory.includes('logbook') && !gameState.flags.logbookRead) {
        return "HINT: You should READ LOGBOOK to understand what happened here.";
    }
    if (!gameState.inventory.includes('crystal')) {
        return "HINT: The cellar beneath the kitchen might contain something important. OPEN TRAPDOOR first.";
    }
    if (!gameState.flags.crystalCharged && gameState.inventory.includes('crystal')) {
        return "HINT: The light chamber needs its focusing crystal. Go UP to the light chamber and PLACE CRYSTAL.";
    }
    if (!gameState.inventory.includes('locket')) {
        return "HINT: The cargo hold of the shipwreck contains personal effects. Look for something that belonged to Eliza.";
    }
    if (!gameState.inventory.includes('bell')) {
        return "HINT: A ship's bell from the cargo hold could be useful in the ritual.";
    }
    if (gameState.flags.crystalCharged && gameState.inventory.includes('locket') && gameState.inventory.includes('bell')) {
        return "HINT: You have everything you need! Go to the outer GALLERY and RING BELL while holding the locket.";
    }
    return "HINT: Explore thoroughly. Examine everything. Read what you find. The story will guide you.";
}

// Event listeners
document.getElementById('command-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = e.target.value;
        e.target.value = '';
        if (input.trim()) {
            parseCommand(input);
        }
    }
});

// Initialize game
function initGame() {
    displayText(`THE LIGHTHOUSE OF FORGOTTEN SOULS
A Sierra-Style Adventure Game

The year is 1927. You are a paranormal investigator drawn to Harrowmere Light, a lighthouse that went dark forty years ago when its keeper vanished. Local fishermen speak of ghost ships in the fog, of a woman's voice calling from the cliffs, of a light that sometimes flickers in the tower at midnight.

You've come to uncover the truth.

Your boat has deposited you on the beach below the lighthouse. The fog is thick, and you feel... watched.

Type HELP for commands. Good luck.

════════════════════════════════════════════════════════════════════`);

    setTimeout(() => {
        showRoom('beach');
    }, 100);
}

// Start the game
initGame();
