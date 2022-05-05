import { useSelector } from "react-redux";

function MainContainer({
  children
}) {
  
  const theme = useSelector(
    (state) => state.app.theme
  );

  return (
    <div className={`${theme.text} ${theme.background}`}>
      {children}
    </div>
  );
}

export default MainContainer;
