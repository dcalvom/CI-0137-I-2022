function Logo({ width, height }) {
  return (
    <img
      className={`${width || "w-20"} ${height || "h-20"}`}
      alt="Logo"
      src="https://bit.ly/logo-ci0137"
    />
  );
}

export default Logo;
