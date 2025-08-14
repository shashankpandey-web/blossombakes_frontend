//map images dynamically
const images = import.meta.glob('/src/assets/image/*.{png,jpg,jpeg,svg}', { eager: true });

const image = Object.keys(images).reduce((acc, path) => {
  const fileName = path.split('/').pop(); // Extract file name (e.g., "photo.png")
  acc[fileName] = images[path].default || images[path];
  return acc;
}, {});

export default image;