const API_KEY = 'DEMO_KEY';

async function testFetch() {
    console.log("Fetching APOD...");
    try {
        const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`);
        console.log("APOD status:", apodRes.status);
    } catch (e) {
        console.log("APOD error:", e.message);
    }

    console.log("Fetching Image Library...");
    try {
        const searchRes = await fetch(`https://images-api.nasa.gov/search?q=nebula&media_type=image`);
        console.log("Library status:", searchRes.status);
        if (searchRes.ok) {
            const data = await searchRes.json();
            const items = data.collection.items;
            console.log("Library items count:", items.length);

            const badWords = ['astronaut', 'Museum', 'scientist', 'engineer', 'technician', 'personnel', 'crew portrait', 'standing next to', 'holding', 'man in', 'woman in', 'control room', 'laboratory interior', 'lab interior', 'test facility', 'machinery', 'circuitry', 'blueprint', 'schematic', 'technical diagram', 'instrument panel', 'launch vehicle technical', 'office building', 'hangar interior', 'warehouse', 'factory', 'parking lot', 'chart', 'graph', 'presentation slide', 'clipart', 'line drawing', 'patch design', 'insignia design', 'document scan', 'infographic', 'rocket', 'falcon', 'starship', 'pads', 'launch site', 'gantry', 'technical tower', 'spacesuit', 'suit portrait', 'official portrait', 'portrait of'];

            const clean = items.filter(item => {
                if (!item.data || !item.data[0]) return false;
                const meta = (item.data[0].title + (item.data[0].description || "")).toLowerCase();
                return !badWords.some(word => meta.includes(word));
            });
            console.log("Library clean count:", clean.length);
        }
    } catch (e) {
        console.log("Library error:", e.message);
    }
}
testFetch();
