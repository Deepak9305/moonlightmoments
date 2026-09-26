const CATEGORIES = Object.freeze({
  stargazing: Object.freeze({ slug: 'stargazing', label: 'Stargazing & Eclipses' }),
  astrophysics: Object.freeze({ slug: 'astrophysics', label: 'Astrophysics & Physics' }),
  planets: Object.freeze({ slug: 'planets', label: 'Solar System & Exoplanets' }),
  cosmology: Object.freeze({ slug: 'cosmology', label: 'Cosmology & Deep Space' }),
});

function normalizeCategory(value) {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (CATEGORIES[normalized]) return CATEGORIES[normalized];
  return Object.values(CATEGORIES).find(category => category.label.toLowerCase() === normalized) || null;
}

function categoryForTopic(topic) {
  const text = String(topic || '').toLowerCase();
  if (/meteor|eclipse|stargazing|telescope|observe|star hopping|double star|variable star|occultation|lunar phase|international space station|dark sky/.test(text)) {
    return CATEGORIES.stargazing;
  }
  if (/planet|moon|asteroid|comet|kuiper|uranus|neptune|mars|venus|mercury|earth|saturn|jupiter|exoplanet|europa|enceladus|titan|pluto|oort|rogue world|habitable|biosignature/.test(text)) {
    return CATEGORIES.planets;
  }
  if (/galaxy|cosmic microwave|big bang|inflation|cosmology|nebula|interstellar dust|cosmic void|gravitational lens/.test(text)) {
    return CATEGORIES.cosmology;
  }
  return CATEGORIES.astrophysics;
}

function categoryLabel(value, fallbackTopic) {
  return normalizeCategory(value)?.label || categoryForTopic(fallbackTopic).label;
}

module.exports = { CATEGORIES, normalizeCategory, categoryForTopic, categoryLabel };
