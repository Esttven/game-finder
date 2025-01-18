const platforms = [
  { name: 'PC', value: 'pc' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'PlayStation 5', value: 'ps5' },
  { name: 'Xbox Series X', value: 'xbox-series-x' },
  { name: 'PlayStation 4', value: 'ps4' },
  { name: 'Xbox One', value: 'xbox-one' },
  { name: 'Nintendo Switch', value: 'nintendo-switch' },
  { name: 'PlayStation 3', value: 'ps3' },
  { name: 'Xbox 360', value: 'xbox-360' },
  { name: 'Wii U', value: 'wii-u' },
  { name: '3DS', value: '3ds' },
  { name: 'PS Vita', value: 'ps-vita' },
  { name: 'Mac', value: 'mac' },
  { name: 'Linux', value: 'linux' },
];

const PlatformSelect = ({ selectedPlatform, onPlatformChange }) => {
  return (
    <select value={selectedPlatform} onChange={(e) => onPlatformChange(e.target.value)}>
      {platforms.map((platform) => (
        <option key={platform.value} value={platform.value}>
          {platform.name}
        </option>
      ))}
    </select>
  );
};

export default PlatformSelect;