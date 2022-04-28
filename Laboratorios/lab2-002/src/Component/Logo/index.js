const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 20;

function Logo({ width, height }) {
  return (
    <img
      className={`w-${width || DEFAULT_WIDTH} h-${height || DEFAULT_HEIGHT}`}
      alt="Logo"
      src="https://bit.ly/logo-ci0137"
    />
  );
}

export default Logo;
