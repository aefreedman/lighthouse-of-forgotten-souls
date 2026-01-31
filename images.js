// EGA Color Palette (16 colors)
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

// Generate pixel art images as data URLs
const gameImages = {
    beach: generateBeachImage(),
    shipwreck: generateShipwreckImage(),
    cargo_hold: generateCargoHoldImage(),
    cliff_path: generateCliffPathImage(),
    lighthouse_grounds: generateLighthouseGroundsImage(),
    garden: generateGardenImage(),
    greenhouse: generateGreenhouseImage(),
    cemetery: generateCemeteryImage(),
    lighthouse_entry: generateLighthouseEntryImage(),
    sitting_room: generateSittingRoomImage(),
    kitchen: generateKitchenImage(),
    cellar: generateCellarImage(),
    spiral_stairs: generateSpiralStairsImage(),
    keepers_quarters: generateKeepersQuartersImage(),
    light_chamber: generateLightChamberImage(),
    gallery: generateGalleryImage()
};

function createSVG(width, height, content) {
    return `data:image/svg+xml,${encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">
<style>rect{shape-rendering:crispEdges}</style>
${content}
</svg>`)}`;
}

function rect(x, y, w, h, color) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
}

function generateBeachImage() {
    let svg = '';
    // Sky gradient (dark stormy)
    svg += rect(0, 0, 640, 150, EGA.darkGray);
    svg += rect(0, 0, 640, 50, '#333355');

    // Storm clouds
    for (let i = 0; i < 8; i++) {
        svg += rect(i * 90, 20, 70, 25, EGA.darkGray);
        svg += rect(i * 90 + 10, 35, 60, 20, '#444444');
    }

    // Sea
    svg += rect(0, 150, 640, 100, EGA.blue);
    svg += rect(0, 160, 640, 10, '#000066');
    svg += rect(0, 180, 640, 10, '#000066');
    svg += rect(0, 200, 640, 10, '#000066');

    // Waves
    for (let i = 0; i < 16; i++) {
        svg += rect(i * 45, 220 + (i % 2) * 5, 35, 8, EGA.lightBlue);
    }

    // Beach
    svg += rect(0, 250, 640, 150, EGA.brown);
    svg += rect(0, 250, 640, 20, '#886644');

    // Sand texture
    for (let i = 0; i < 50; i++) {
        const x = Math.floor(Math.random() * 620);
        const y = 260 + Math.floor(Math.random() * 130);
        svg += rect(x, y, 3, 2, '#CCAA77');
    }

    // Shipwreck silhouette on right
    svg += rect(480, 200, 120, 50, '#332200');
    svg += rect(520, 160, 10, 60, '#332200'); // mast
    svg += rect(500, 220, 80, 30, EGA.brown);

    // Driftwood
    svg += rect(100, 320, 60, 8, '#665533');
    svg += rect(200, 350, 45, 6, '#554422');
    svg += rect(50, 280, 30, 5, '#665533');

    // Lighthouse in distance (on cliff)
    svg += rect(300, 60, 40, 100, EGA.darkGray);
    svg += rect(295, 50, 50, 15, EGA.darkGray);
    svg += rect(310, 30, 20, 25, EGA.lightGray);

    // Fog effects
    for (let i = 0; i < 12; i++) {
        svg += rect(i * 60, 140 + (i % 3) * 10, 50, 15, 'rgba(170,170,170,0.3)');
    }

    // Path going up
    svg += rect(280, 250, 80, 10, '#666655');
    svg += rect(290, 240, 60, 15, '#777766');

    return createSVG(640, 400, svg);
}

function generateShipwreckImage() {
    let svg = '';

    // Dark sky
    svg += rect(0, 0, 640, 200, '#333355');

    // Sea in background
    svg += rect(0, 100, 640, 100, EGA.blue);

    // Ship hull (we're inside looking at interior)
    svg += rect(0, 0, 640, 400, '#332211');

    // Hull interior walls
    svg += rect(20, 20, 600, 360, '#443322');
    svg += rect(40, 40, 560, 320, '#554433');

    // Tilted floor
    svg += rect(0, 280, 640, 120, '#221100');
    for (let i = 0; i < 8; i++) {
        svg += rect(i * 85, 290 + i * 3, 80, 100, '#332211');
    }

    // Barnacles
    for (let i = 0; i < 30; i++) {
        const x = 50 + Math.floor(Math.random() * 540);
        const y = 50 + Math.floor(Math.random() * 200);
        svg += rect(x, y, 6, 6, EGA.lightGray);
    }

    // Seaweed hanging
    for (let i = 0; i < 8; i++) {
        svg += rect(80 + i * 75, 40, 4, 60 + (i % 3) * 20, EGA.green);
    }

    // Broken beam
    svg += rect(100, 100, 200, 15, '#665544');
    svg += rect(100, 100, 15, 80, '#665544');

    // Lantern on floor (glinting)
    svg += rect(450, 320, 30, 40, EGA.brown);
    svg += rect(455, 325, 20, 25, EGA.yellow);

    // Nameplate
    svg += rect(250, 150, 140, 30, '#554433');
    svg += rect(255, 155, 130, 20, EGA.darkGray);

    // Doorway to cargo hold
    svg += rect(520, 180, 80, 150, EGA.black);
    svg += rect(530, 190, 60, 130, '#111111');

    // Exit back to beach (light)
    svg += rect(40, 180, 80, 150, EGA.darkGray);
    svg += rect(50, 190, 60, 130, EGA.lightGray);

    return createSVG(640, 400, svg);
}

function generateCargoHoldImage() {
    let svg = '';

    // Very dark hold
    svg += rect(0, 0, 640, 400, '#111111');

    // Faint hull structure
    svg += rect(0, 0, 20, 400, '#1a1a1a');
    svg += rect(620, 0, 20, 400, '#1a1a1a');

    // Tilted floor
    svg += rect(0, 300, 640, 100, '#1a1511');

    // Broken crates
    svg += rect(100, 280, 60, 50, EGA.brown);
    svg += rect(105, 285, 50, 40, '#443322');
    svg += rect(180, 300, 40, 35, '#443322');
    svg += rect(400, 270, 70, 60, EGA.brown);

    // Spilled contents
    for (let i = 0; i < 15; i++) {
        svg += rect(150 + i * 20, 340 + (i % 3) * 5, 10, 8, EGA.darkGray);
    }

    // Glinting locket in corner
    svg += rect(550, 330, 12, 15, EGA.lightGray);
    svg += rect(553, 333, 6, 9, EGA.white);

    // Bell
    svg += rect(300, 320, 25, 30, EGA.brown);
    svg += rect(305, 310, 15, 15, EGA.brown);

    // Dripping water
    svg += rect(200, 50, 3, 100, EGA.blue);
    svg += rect(200, 150, 6, 6, EGA.lightBlue);

    // Ladder up
    svg += rect(50, 100, 60, 200, '#333322');
    svg += rect(55, 100, 5, 200, '#554433');
    svg += rect(100, 100, 5, 200, '#554433');
    for (let i = 0; i < 8; i++) {
        svg += rect(55, 120 + i * 25, 50, 5, '#665544');
    }

    // Faint light from ladder
    svg += rect(40, 80, 80, 30, '#333344');

    return createSVG(640, 400, svg);
}

function generateCliffPathImage() {
    let svg = '';

    // Stormy sky
    svg += rect(0, 0, 640, 200, '#333355');
    svg += rect(0, 0, 640, 80, '#222244');

    // Clouds
    for (let i = 0; i < 6; i++) {
        svg += rect(i * 120, 30 + (i % 2) * 20, 100, 30, EGA.darkGray);
    }

    // Sea far below
    svg += rect(0, 180, 300, 220, EGA.blue);
    svg += rect(0, 200, 300, 20, '#000055');

    // Cliff face
    svg += rect(300, 0, 340, 400, EGA.darkGray);
    svg += rect(320, 0, 320, 400, '#666666');

    // Cliff texture
    for (let i = 0; i < 40; i++) {
        const x = 320 + Math.floor(Math.random() * 300);
        const y = Math.floor(Math.random() * 400);
        svg += rect(x, y, 15, 8, '#555555');
    }

    // Path (narrow, winding)
    svg += rect(280, 350, 100, 50, '#887766');
    svg += rect(260, 300, 80, 60, '#776655');
    svg += rect(290, 250, 90, 60, '#887766');
    svg += rect(300, 200, 100, 60, '#776655');
    svg += rect(280, 150, 80, 60, '#887766');

    // Runes carved in cliff
    svg += rect(400, 180, 20, 30, EGA.lightBlue);
    svg += rect(430, 200, 15, 25, EGA.lightBlue);
    svg += rect(410, 240, 18, 28, EGA.lightBlue);

    // Fog
    for (let i = 0; i < 10; i++) {
        svg += rect(50 + i * 30, 250 + (i % 3) * 20, 40, 20, 'rgba(170,170,170,0.4)');
    }

    // Edge of cliff (dangerous!)
    svg += rect(260, 300, 10, 100, '#444444');

    // Lighthouse at top
    svg += rect(320, 40, 50, 100, EGA.lightGray);
    svg += rect(310, 30, 70, 15, EGA.lightGray);
    svg += rect(335, 10, 20, 25, EGA.white);

    return createSVG(640, 400, svg);
}

function generateLighthouseGroundsImage() {
    let svg = '';

    // Overcast sky
    svg += rect(0, 0, 640, 180, '#444455');
    svg += rect(0, 0, 640, 60, '#333344');

    // Lighthouse tower
    svg += rect(260, 50, 120, 200, EGA.lightGray);
    svg += rect(270, 60, 100, 180, '#999999');

    // Light chamber at top
    svg += rect(250, 30, 140, 30, EGA.darkGray);
    svg += rect(280, 10, 80, 25, '#666666');
    svg += rect(290, 5, 60, 10, EGA.lightGray);

    // Door
    svg += rect(290, 180, 60, 80, '#443322');
    svg += rect(295, 185, 50, 70, '#332211');
    svg += rect(340, 210, 5, 15, EGA.yellow); // handle

    // Dead ivy
    for (let i = 0; i < 20; i++) {
        const x = 265 + Math.floor(Math.random() * 100);
        const y = 60 + Math.floor(Math.random() * 120);
        svg += rect(x, y, 8, 12, EGA.brown);
    }

    // Ground
    svg += rect(0, 260, 640, 140, EGA.brown);
    svg += rect(0, 260, 640, 20, '#665544');

    // Overgrown grass
    for (let i = 0; i < 40; i++) {
        const x = Math.floor(Math.random() * 620);
        svg += rect(x, 250 + (i % 4) * 5, 4, 20, '#335533');
    }

    // Path to door
    svg += rect(280, 260, 80, 140, '#776655');

    // Sign
    svg += rect(100, 280, 100, 50, EGA.brown);
    svg += rect(105, 285, 90, 40, '#665544');
    svg += rect(145, 330, 10, 50, EGA.brown);

    // Garden direction (right)
    svg += rect(580, 260, 60, 60, '#335533');

    // Cemetery direction (left)
    svg += rect(0, 260, 60, 60, '#555555');
    svg += rect(20, 240, 10, 30, EGA.lightGray);
    svg += rect(40, 245, 10, 25, EGA.lightGray);

    // Fog
    for (let i = 0; i < 8; i++) {
        svg += rect(i * 90, 200 + (i % 2) * 20, 70, 30, 'rgba(170,170,170,0.3)');
    }

    return createSVG(640, 400, svg);
}

function generateGardenImage() {
    let svg = '';

    // Overcast sky
    svg += rect(0, 0, 640, 150, '#444455');

    // Lighthouse in background
    svg += rect(50, 50, 40, 100, EGA.lightGray);

    // Ground
    svg += rect(0, 200, 640, 200, '#443322');

    // Overgrown weeds everywhere
    for (let i = 0; i < 80; i++) {
        const x = Math.floor(Math.random() * 620);
        const y = 180 + Math.floor(Math.random() * 200);
        svg += rect(x, y, 5, 25 + Math.floor(Math.random() * 20), '#335533');
    }

    // Dead roses on trellis
    svg += rect(400, 120, 80, 120, '#332211');
    for (let i = 0; i < 5; i++) {
        svg += rect(405 + i * 15, 130 + i * 20, 10, 10, EGA.red);
    }

    // Trellis structure
    svg += rect(400, 120, 5, 120, '#554433');
    svg += rect(480, 120, 5, 120, '#554433');
    for (let i = 0; i < 4; i++) {
        svg += rect(400, 140 + i * 30, 85, 4, '#554433');
    }

    // Stone bench
    svg += rect(200, 280, 100, 30, EGA.lightGray);
    svg += rect(210, 310, 20, 30, EGA.lightGray);
    svg += rect(270, 310, 20, 30, EGA.lightGray);

    // Gnarled apple tree
    svg += rect(250, 150, 30, 100, EGA.brown);
    svg += rect(220, 100, 100, 60, '#335533');
    svg += rect(200, 120, 40, 40, '#224422');
    svg += rect(290, 110, 50, 50, '#224422');
    // withered apples
    svg += rect(240, 110, 8, 8, EGA.red);
    svg += rect(280, 130, 8, 8, EGA.red);

    // Music box on bench
    svg += rect(230, 270, 20, 15, EGA.brown);
    svg += rect(232, 265, 16, 8, EGA.yellow);

    // Path back west
    svg += rect(0, 280, 50, 60, '#665544');

    // Greenhouse to east
    svg += rect(580, 180, 60, 80, '#88AAAA');
    svg += rect(585, 185, 50, 70, '#AACCCC');

    return createSVG(640, 400, svg);
}

function generateGreenhouseImage() {
    let svg = '';

    // Glass ceiling/walls
    svg += rect(0, 0, 640, 400, '#88AAAA');
    svg += rect(20, 20, 600, 360, '#AACCCC');

    // Glass panels
    for (let i = 0; i < 8; i++) {
        svg += rect(i * 80, 0, 5, 400, '#668888');
    }
    for (let i = 0; i < 5; i++) {
        svg += rect(0, i * 80, 640, 5, '#668888');
    }

    // Floor
    svg += rect(20, 300, 600, 80, '#443322');

    // Dead plants in pots
    svg += rect(100, 280, 40, 40, '#AA5500');
    svg += rect(105, 260, 30, 25, '#554433');

    svg += rect(200, 290, 35, 35, '#AA5500');
    svg += rect(205, 275, 25, 20, '#443322');

    svg += rect(500, 285, 40, 35, '#AA5500');
    svg += rect(505, 265, 30, 25, '#332211');

    // GLOWING MOONFLOWER in center!
    svg += rect(300, 200, 40, 80, EGA.green);
    svg += rect(280, 160, 80, 50, EGA.white);
    svg += rect(290, 150, 60, 40, '#EEEEFF');
    svg += rect(305, 140, 30, 30, EGA.white);
    // Glow effect
    svg += rect(260, 140, 120, 80, 'rgba(200,200,255,0.3)');
    svg += rect(240, 120, 160, 120, 'rgba(150,150,200,0.2)');

    // Worktable
    svg += rect(400, 260, 120, 40, '#665544');
    svg += rect(410, 300, 15, 60, '#554433');
    svg += rect(495, 300, 15, 60, '#554433');

    // Alchemical equipment on table
    svg += rect(420, 240, 20, 30, EGA.lightCyan);
    svg += rect(450, 245, 15, 25, EGA.lightCyan);
    svg += rect(480, 250, 25, 20, EGA.lightGray);

    // Mirror on table
    svg += rect(440, 230, 20, 30, EGA.lightGray);
    svg += rect(443, 235, 14, 20, EGA.white);

    // Broken pots scattered
    for (let i = 0; i < 10; i++) {
        const x = 50 + Math.floor(Math.random() * 200);
        const y = 320 + Math.floor(Math.random() * 50);
        svg += rect(x, y, 15, 10, '#AA5500');
    }

    // Door back to garden
    svg += rect(0, 200, 30, 100, '#665544');
    svg += rect(5, 210, 20, 80, EGA.green);

    return createSVG(640, 400, svg);
}

function generateCemeteryImage() {
    let svg = '';

    // Dark overcast sky
    svg += rect(0, 0, 640, 200, '#333344');
    svg += rect(0, 0, 640, 80, '#222233');

    // Lighthouse in background
    svg += rect(500, 50, 50, 130, EGA.lightGray);
    svg += rect(520, 30, 20, 25, '#666666');

    // Ground (grassy cemetery)
    svg += rect(0, 200, 640, 200, '#334433');
    svg += rect(0, 200, 640, 30, '#445544');

    // Iron fence
    for (let i = 0; i < 16; i++) {
        svg += rect(i * 42, 180, 5, 50, '#333333');
        svg += rect(i * 42 - 3, 175, 11, 10, '#444444'); // spikes
    }
    svg += rect(0, 200, 640, 5, '#333333');

    // Headstones (old, worn)
    svg += rect(80, 250, 30, 50, EGA.lightGray);
    svg += rect(85, 245, 20, 10, EGA.lightGray);

    svg += rect(150, 260, 25, 40, EGA.darkGray);
    svg += rect(155, 255, 15, 8, EGA.darkGray);

    svg += rect(220, 255, 28, 45, EGA.lightGray);

    svg += rect(400, 250, 35, 55, EGA.lightGray);
    svg += rect(405, 245, 25, 10, EGA.lightGray);

    svg += rect(480, 265, 25, 35, EGA.darkGray);

    // ELIZA'S GRAVE (newer, prominent)
    svg += rect(300, 230, 50, 70, EGA.white);
    svg += rect(305, 225, 40, 10, EGA.white);
    svg += rect(315, 215, 20, 15, EGA.white);
    // Cross on top
    svg += rect(322, 200, 6, 20, EGA.white);
    svg += rect(315, 205, 20, 6, EGA.white);

    // Dead flowers at Eliza's grave
    svg += rect(295, 300, 30, 15, EGA.brown);
    svg += rect(335, 300, 25, 12, EGA.red);

    // Iron key glinting near a grave
    svg += rect(460, 310, 15, 8, EGA.yellow);
    svg += rect(472, 306, 8, 15, EGA.yellow);

    // Fog rolling through
    for (let i = 0; i < 10; i++) {
        svg += rect(i * 70, 280 + (i % 3) * 15, 60, 20, 'rgba(170,170,170,0.4)');
    }
    for (let i = 0; i < 8; i++) {
        svg += rect(i * 90, 180 + (i % 2) * 20, 80, 25, 'rgba(170,170,170,0.3)');
    }

    // Path back to lighthouse
    svg += rect(580, 220, 60, 100, '#554433');

    return createSVG(640, 400, svg);
}

function generateLighthouseEntryImage() {
    let svg = '';

    // Stone walls
    svg += rect(0, 0, 640, 400, EGA.darkGray);
    svg += rect(20, 20, 600, 360, '#555555');

    // Floor
    svg += rect(20, 300, 600, 80, '#443333');
    svg += rect(20, 300, 600, 10, '#554444');

    // Stone texture
    for (let i = 0; i < 30; i++) {
        const x = 30 + Math.floor(Math.random() * 580);
        const y = 30 + Math.floor(Math.random() * 260);
        svg += rect(x, y, 40, 25, '#4a4a4a');
    }

    // Portraits on walls
    svg += rect(80, 80, 60, 80, EGA.brown);
    svg += rect(85, 85, 50, 65, '#886655');
    svg += rect(100, 95, 20, 30, '#FFCCAA'); // face

    svg += rect(180, 90, 50, 70, EGA.brown);
    svg += rect(185, 95, 40, 55, '#886655');
    svg += rect(195, 105, 20, 25, '#FFCCAA');

    svg += rect(400, 80, 70, 90, EGA.brown);
    svg += rect(405, 85, 60, 75, '#776655');
    svg += rect(420, 95, 30, 40, '#FFCCAA'); // Thomas
    svg += rect(425, 115, 20, 15, EGA.brown); // beard

    svg += rect(510, 90, 55, 75, EGA.brown);
    svg += rect(515, 95, 45, 60, '#886655');

    // Spiral staircase (center)
    svg += rect(270, 100, 100, 200, EGA.black);
    svg += rect(275, 100, 90, 10, '#666666');
    svg += rect(280, 130, 80, 10, '#777777');
    svg += rect(285, 160, 70, 10, '#666666');
    svg += rect(290, 190, 60, 10, '#777777');
    svg += rect(295, 220, 50, 10, '#666666');
    svg += rect(300, 250, 40, 10, '#777777');
    // Central pole
    svg += rect(315, 100, 10, 200, '#888888');

    // Door to sitting room (right)
    svg += rect(520, 200, 80, 120, '#443322');
    svg += rect(530, 210, 60, 100, '#332211');
    svg += rect(580, 250, 5, 20, EGA.yellow);

    // Door to kitchen (left)
    svg += rect(40, 200, 80, 120, '#443322');
    svg += rect(50, 210, 60, 100, '#332211');
    svg += rect(55, 250, 5, 20, EGA.yellow);

    // Exit back outside (light coming in)
    svg += rect(280, 300, 80, 80, '#888899');
    svg += rect(290, 310, 60, 60, '#AAAAAA');

    // Cobwebs
    svg += rect(30, 30, 50, 40, 'rgba(200,200,200,0.3)');
    svg += rect(560, 25, 55, 45, 'rgba(200,200,200,0.3)');
    svg += rect(250, 50, 40, 30, 'rgba(200,200,200,0.3)');

    // Dust motes (dots)
    for (let i = 0; i < 20; i++) {
        const x = 50 + Math.floor(Math.random() * 540);
        const y = 50 + Math.floor(Math.random() * 240);
        svg += rect(x, y, 2, 2, 'rgba(200,200,150,0.5)');
    }

    return createSVG(640, 400, svg);
}

function generateSittingRoomImage() {
    let svg = '';

    // Walls
    svg += rect(0, 0, 640, 400, '#665555');
    svg += rect(0, 0, 640, 50, '#776666');

    // Floor
    svg += rect(0, 300, 640, 100, '#553333');

    // Wallpaper pattern
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 7; j++) {
            svg += rect(i * 42, j * 45 + 10, 8, 8, '#554444');
        }
    }

    // Fireplace (center)
    svg += rect(240, 150, 160, 150, EGA.darkGray);
    svg += rect(250, 160, 140, 110, EGA.black);
    svg += rect(260, 240, 120, 30, '#222222');
    // Cold ashes
    svg += rect(280, 250, 80, 15, '#444444');
    // Mantle
    svg += rect(230, 140, 180, 15, EGA.brown);

    // PAINTING OF ELIZA above mantle
    svg += rect(275, 60, 90, 75, EGA.brown);
    svg += rect(280, 65, 80, 65, '#AABBCC');
    // Eliza's portrait
    svg += rect(305, 75, 30, 40, '#FFCCAA'); // face
    svg += rect(300, 100, 40, 25, EGA.blue); // dress
    svg += rect(310, 85, 20, 8, EGA.brown); // hair
    // Her sad eyes
    svg += rect(308, 82, 5, 4, EGA.blue);
    svg += rect(320, 82, 5, 4, EGA.blue);

    // Two chairs facing fireplace
    svg += rect(120, 260, 70, 60, EGA.red);
    svg += rect(125, 240, 60, 25, EGA.red);
    svg += rect(115, 240, 15, 80, '#AA3333');

    svg += rect(450, 260, 70, 60, EGA.red);
    svg += rect(455, 240, 60, 25, EGA.red);
    svg += rect(510, 240, 15, 80, '#AA3333');

    // Side table with book
    svg += rect(540, 270, 50, 50, EGA.brown);
    svg += rect(555, 290, 20, 8, EGA.white);
    svg += rect(545, 260, 40, 15, '#665544');
    // Cup of tea
    svg += rect(560, 255, 12, 10, EGA.white);

    // Book open with pressed flower
    svg += rect(555, 290, 25, 15, '#EEEECC');
    svg += rect(565, 293, 8, 8, EGA.yellow);

    // Photograph on floor near chair
    svg += rect(200, 340, 20, 25, EGA.lightGray);
    svg += rect(203, 343, 14, 18, '#AAAAAA');

    // Doorway back
    svg += rect(0, 200, 50, 120, '#554433');
    svg += rect(5, 210, 40, 100, EGA.darkGray);

    // Dust
    for (let i = 0; i < 15; i++) {
        const x = 50 + Math.floor(Math.random() * 540);
        const y = 100 + Math.floor(Math.random() * 180);
        svg += rect(x, y, 2, 2, 'rgba(200,200,150,0.4)');
    }

    return createSVG(640, 400, svg);
}

function generateKitchenImage() {
    let svg = '';

    // Walls
    svg += rect(0, 0, 640, 400, '#665544');

    // Floor
    svg += rect(0, 280, 640, 120, '#553322');
    svg += rect(0, 280, 640, 10, '#664433');

    // Cast iron stove
    svg += rect(400, 150, 120, 130, EGA.black);
    svg += rect(410, 160, 40, 40, '#333333');
    svg += rect(460, 160, 40, 40, '#333333');
    svg += rect(410, 210, 100, 60, '#222222');
    svg += rect(440, 220, 50, 40, '#111111');
    // Stovepipe
    svg += rect(450, 80, 30, 70, EGA.black);

    // Copper pots hanging
    svg += rect(200, 80, 40, 30, EGA.brown);
    svg += rect(250, 90, 35, 25, EGA.brown);
    svg += rect(300, 85, 30, 28, EGA.brown);
    // Verdigris
    svg += rect(205, 85, 15, 10, EGA.green);
    svg += rect(255, 95, 12, 8, EGA.green);

    // Hooks
    for (let i = 0; i < 4; i++) {
        svg += rect(195 + i * 50, 70, 5, 15, '#333333');
    }
    svg += rect(180, 65, 180, 8, EGA.brown);

    // Table set for two
    svg += rect(150, 260, 200, 60, EGA.brown);
    svg += rect(170, 320, 20, 40, EGA.brown);
    svg += rect(310, 320, 20, 40, EGA.brown);

    // Two plates
    svg += rect(180, 265, 30, 25, EGA.white);
    svg += rect(290, 265, 30, 25, EGA.white);
    // Dust on plates
    svg += rect(185, 270, 20, 15, '#CCCCAA');
    svg += rect(295, 270, 20, 15, '#CCCCAA');

    // Trapdoor in floor
    svg += rect(50, 320, 80, 60, '#443311');
    svg += rect(55, 325, 70, 50, '#332200');
    svg += rect(85, 340, 15, 20, '#666655'); // iron ring

    // Window
    svg += rect(500, 100, 80, 100, EGA.lightGray);
    svg += rect(505, 105, 70, 90, '#AABBCC');
    svg += rect(538, 105, 4, 90, EGA.brown);
    svg += rect(505, 145, 70, 4, EGA.brown);

    // Doorway back
    svg += rect(590, 180, 50, 120, '#554433');
    svg += rect(595, 190, 40, 100, EGA.darkGray);

    return createSVG(640, 400, svg);
}

function generateCellarImage() {
    let svg = '';

    // Very dark stone walls
    svg += rect(0, 0, 640, 400, '#1a1a1a');

    // Stone texture
    for (let i = 0; i < 40; i++) {
        const x = Math.floor(Math.random() * 620);
        const y = Math.floor(Math.random() * 400);
        svg += rect(x, y, 30, 20, '#222222');
    }

    // Floor
    svg += rect(0, 320, 640, 80, '#151515');

    // Wine racks on walls
    svg += rect(30, 80, 120, 200, EGA.brown);
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 8; j++) {
            svg += rect(35 + j * 14, 85 + i * 40, 12, 35, '#222211');
        }
    }
    // Few bottles
    svg += rect(40, 90, 10, 30, EGA.green);
    svg += rect(70, 130, 10, 30, EGA.red);
    svg += rect(100, 210, 10, 30, EGA.green);

    // Crates
    svg += rect(500, 280, 80, 60, EGA.brown);
    svg += rect(505, 285, 70, 50, '#554433');
    svg += rect(450, 300, 50, 40, EGA.brown);

    // RITUAL CIRCLE on floor
    svg += rect(250, 300, 140, 80, '#222233');
    // Circle outline
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const x = 320 + Math.cos(angle) * 60;
        const y = 340 + Math.sin(angle) * 30;
        svg += rect(x, y, 8, 8, EGA.lightBlue);
    }
    // Symbols around circle
    svg += rect(260, 310, 15, 20, EGA.lightBlue);
    svg += rect(365, 310, 15, 20, EGA.lightBlue);
    svg += rect(310, 370, 20, 15, EGA.lightBlue);

    // Crystal in corner (glinting)
    svg += rect(180, 340, 25, 35, EGA.lightCyan);
    svg += rect(185, 345, 15, 25, EGA.white);
    svg += rect(190, 350, 8, 15, EGA.lightCyan);

    // Ladder up
    svg += rect(550, 50, 60, 250, '#333322');
    svg += rect(555, 50, 8, 250, '#554433');
    svg += rect(600, 50, 8, 250, '#554433');
    for (let i = 0; i < 10; i++) {
        svg += rect(555, 70 + i * 25, 53, 5, '#665544');
    }

    // Light from above
    svg += rect(550, 30, 60, 30, '#444433');

    return createSVG(640, 400, svg);
}

function generateSpiralStairsImage() {
    let svg = '';

    // Stone walls (circular tower)
    svg += rect(0, 0, 640, 400, EGA.darkGray);

    // Curved wall effect
    svg += rect(50, 0, 540, 400, '#555555');
    svg += rect(100, 0, 440, 400, '#666666');

    // Spiral staircase (dramatic perspective)
    // Lower steps
    svg += rect(200, 350, 240, 15, '#777777');
    svg += rect(180, 320, 280, 15, '#888888');
    svg += rect(160, 290, 320, 15, '#777777');
    svg += rect(140, 260, 360, 15, '#888888');
    svg += rect(120, 230, 400, 15, '#777777');
    svg += rect(100, 200, 440, 15, '#888888');
    svg += rect(120, 170, 400, 15, '#777777');
    svg += rect(140, 140, 360, 15, '#888888');
    svg += rect(160, 110, 320, 15, '#777777');
    svg += rect(180, 80, 280, 15, '#888888');
    svg += rect(200, 50, 240, 15, '#777777');

    // Central pole
    svg += rect(310, 0, 20, 400, '#888888');
    svg += rect(315, 0, 10, 400, '#999999');

    // Railing
    svg += rect(480, 200, 10, 200, '#666666');
    svg += rect(150, 200, 10, 200, '#666666');

    // Window with light
    svg += rect(500, 120, 60, 80, EGA.lightGray);
    svg += rect(505, 125, 50, 70, '#AABBCC');
    svg += rect(528, 125, 4, 70, EGA.brown);

    // Door to keeper's quarters
    svg += rect(520, 220, 70, 100, '#554433');
    svg += rect(530, 230, 50, 80, '#443322');
    svg += rect(570, 260, 5, 20, EGA.yellow);

    // Light chamber above (glimpse)
    svg += rect(250, 0, 140, 30, '#777788');
    svg += rect(270, 10, 100, 20, '#8888AA');

    // Darkness below
    svg += rect(250, 370, 140, 30, '#222222');

    return createSVG(640, 400, svg);
}

function generateKeepersQuartersImage() {
    let svg = '';

    // Curved walls
    svg += rect(0, 0, 640, 400, '#665555');

    // Floor
    svg += rect(0, 300, 640, 100, '#553333');

    // Narrow bed
    svg += rect(50, 250, 150, 80, EGA.brown);
    svg += rect(55, 240, 140, 15, EGA.white);
    svg += rect(60, 220, 130, 30, EGA.lightGray);
    // Unmade sheets
    svg += rect(100, 210, 80, 40, '#EEEEEE');
    svg += rect(140, 200, 50, 30, '#DDDDDD');

    // Writing desk with scattered papers
    svg += rect(350, 200, 150, 80, EGA.brown);
    svg += rect(370, 280, 20, 60, EGA.brown);
    svg += rect(460, 280, 20, 60, EGA.brown);

    // Papers scattered
    svg += rect(360, 190, 40, 30, EGA.white);
    svg += rect(410, 185, 35, 35, EGA.white);
    svg += rect(455, 195, 30, 25, EGA.white);
    svg += rect(380, 220, 45, 20, '#EEEECC');
    svg += rect(430, 210, 50, 30, EGA.white);
    // Star charts
    svg += rect(450, 150, 50, 40, '#333366');
    svg += rect(455, 155, 4, 4, EGA.yellow);
    svg += rect(470, 165, 4, 4, EGA.yellow);
    svg += rect(485, 158, 4, 4, EGA.yellow);

    // Unfinished letter
    svg += rect(375, 210, 50, 35, '#FFFFCC');

    // Wardrobe
    svg += rect(520, 120, 80, 180, EGA.brown);
    svg += rect(525, 125, 70, 170, '#554433');
    svg += rect(558, 200, 4, 40, EGA.yellow);

    // Window showing cemetery
    svg += rect(220, 80, 100, 100, EGA.lightGray);
    svg += rect(225, 85, 90, 90, '#556655');
    // Tiny headstones visible
    svg += rect(240, 140, 8, 12, EGA.lightGray);
    svg += rect(270, 145, 8, 10, EGA.lightGray);
    svg += rect(290, 142, 10, 13, EGA.white); // Eliza's grave

    // Logbook visible if found
    svg += rect(400, 200, 30, 20, EGA.brown);
    svg += rect(403, 203, 24, 14, '#DDCCAA');

    // Door back
    svg += rect(0, 180, 50, 120, '#554433');
    svg += rect(5, 190, 40, 100, EGA.darkGray);

    return createSVG(640, 400, svg);
}

function generateLightChamberImage() {
    let svg = '';

    // Glass all around
    svg += rect(0, 0, 640, 400, '#556677');

    // Sky visible through windows
    svg += rect(0, 0, 640, 200, '#444466');

    // Window frames
    for (let i = 0; i < 8; i++) {
        svg += rect(i * 82, 0, 6, 400, '#888888');
    }
    for (let i = 0; i < 5; i++) {
        svg += rect(0, i * 82, 640, 6, '#888888');
    }

    // Floor
    svg += rect(100, 300, 440, 100, '#666655');

    // THE GREAT FRESNEL LENS (center)
    svg += rect(220, 100, 200, 200, EGA.lightCyan);
    svg += rect(230, 110, 180, 180, '#AADDEE');
    svg += rect(240, 120, 160, 160, EGA.lightCyan);
    // Concentric rings
    svg += rect(260, 140, 120, 120, '#BBDDEE');
    svg += rect(280, 160, 80, 80, EGA.lightCyan);
    svg += rect(300, 180, 40, 40, '#CCEEEE');

    // Empty crystal housing in center
    svg += rect(305, 185, 30, 30, EGA.darkGray);
    svg += rect(310, 190, 20, 20, EGA.black);

    // Lens support structure
    svg += rect(200, 90, 240, 15, '#888877');
    svg += rect(200, 295, 240, 15, '#888877');
    svg += rect(200, 90, 15, 220, '#888877');
    svg += rect(425, 90, 15, 220, '#888877');

    // Rotation mechanism (seized)
    svg += rect(280, 320, 80, 40, '#777766');
    svg += rect(300, 330, 40, 30, EGA.brown);
    svg += rect(315, 335, 10, 20, '#555544');

    // Door to gallery (outside)
    svg += rect(550, 200, 60, 120, '#88AAAA');
    svg += rect(560, 210, 40, 100, '#AABBBB');

    // Stairs down
    svg += rect(30, 250, 70, 100, EGA.darkGray);
    svg += rect(35, 255, 60, 10, '#666666');
    svg += rect(40, 275, 55, 10, '#777777');
    svg += rect(45, 295, 50, 10, '#666666');
    svg += rect(50, 315, 45, 10, '#555555');

    // Fog visible outside
    for (let i = 0; i < 6; i++) {
        svg += rect(i * 110, 250, 100, 40, 'rgba(170,170,170,0.3)');
    }

    return createSVG(640, 400, svg);
}

function generateGalleryImage() {
    let svg = '';

    // Open sky (we're outside now)
    svg += rect(0, 0, 640, 200, '#444466');
    svg += rect(0, 0, 640, 100, '#333355');

    // Clouds/fog
    for (let i = 0; i < 6; i++) {
        svg += rect(i * 120, 40 + (i % 2) * 30, 100, 40, EGA.darkGray);
    }

    // Sea far below
    svg += rect(0, 200, 640, 200, EGA.blue);
    svg += rect(0, 220, 640, 20, '#000055');
    svg += rect(0, 260, 640, 20, '#000055');
    svg += rect(0, 300, 640, 20, '#000055');

    // Gallery railing (we're standing on narrow platform)
    svg += rect(0, 350, 640, 50, '#777777');
    svg += rect(0, 350, 640, 10, '#888888');

    // Railing posts
    for (let i = 0; i < 16; i++) {
        svg += rect(i * 42, 300, 8, 55, '#666666');
        svg += rect(i * 42 - 2, 295, 12, 8, '#777777'); // decorative top
    }
    svg += rect(0, 300, 640, 5, '#888888');

    // Lighthouse structure behind us
    svg += rect(250, 100, 140, 200, EGA.lightGray);
    svg += rect(260, 110, 120, 180, '#AAAAAA');

    // Light chamber window (lit or unlit)
    svg += rect(280, 150, 80, 60, EGA.lightCyan);
    svg += rect(285, 155, 70, 50, '#AADDEE');

    // Door back inside
    svg += rect(295, 220, 50, 80, '#888899');
    svg += rect(300, 230, 40, 65, EGA.lightGray);

    // Wind effect lines
    for (let i = 0; i < 10; i++) {
        svg += rect(50 + i * 60, 180 + (i % 3) * 15, 40, 2, 'rgba(200,200,200,0.4)');
    }

    // Ghost ships visible in fog (faint)
    svg += rect(100, 280, 50, 30, 'rgba(200,200,255,0.2)');
    svg += rect(115, 260, 5, 25, 'rgba(200,200,255,0.2)');

    svg += rect(500, 290, 40, 25, 'rgba(200,200,255,0.2)');
    svg += rect(510, 275, 4, 20, 'rgba(200,200,255,0.2)');

    // Mainland lights (distant)
    svg += rect(50, 340, 3, 3, EGA.yellow);
    svg += rect(80, 342, 3, 3, EGA.yellow);
    svg += rect(550, 338, 3, 3, EGA.yellow);
    svg += rect(590, 341, 3, 3, EGA.yellow);

    return createSVG(640, 400, svg);
}

// Make images available globally
window.gameImages = gameImages;
