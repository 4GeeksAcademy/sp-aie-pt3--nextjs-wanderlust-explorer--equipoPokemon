const fs = require('fs');
const path = require('path');

const generateExperiences = () => {
  const experiences = [];
  const locations = ['Paris, France', 'Tokyo, Japan', 'New York, USA', 'Rome, Italy', 'Sydney, Australia', 'Barcelona, Spain', 'Cape Town, South Africa', 'Bali, Indonesia', 'Machu Picchu, Peru', 'Santorini, Greece'];
  const titles = ['City Tour', 'Food Tasting', 'Museum Visit', 'Hiking Adventure', 'Scuba Diving', 'Cooking Class', 'Sunset Cruise', 'Wine Tasting', 'Historical Walk', 'Photography Tour'];
  const images = [
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
  ];

  for (let i = 1; i <= 100; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    experiences.push({
      id: i.toString(),
      title: `${title} in ${location.split(',')[0]}`,
      description: `Experience the best ${title.toLowerCase()} in the beautiful city of ${location.split(',')[0]}. This is an unforgettable adventure.`,
      location: location,
      price: Math.floor(Math.random() * 500) + 50,
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      reviewsCount: Math.floor(Math.random() * 500) + 10,
      imageUrl: images[Math.floor(Math.random() * images.length)],
      duration: `${Math.floor(Math.random() * 5) + 1} hours`
    });
  }
  return experiences;
};

const experiences = generateExperiences();

const outputDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const fileContent = `import { Experience } from '../types/Experience';

export const experiences: Experience[] = ${JSON.stringify(experiences, null, 2)};
`;

fs.writeFileSync(path.join(outputDir, 'experiences.ts'), fileContent, 'utf-8');
console.log('Successfully generated src/data/experiences.ts with 100 experiences.');
