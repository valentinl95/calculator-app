import Switcher from "./switcher";

function Header({ states, theme, setTheme }) {
  return (
    <header>
      <label>calc</label>
      <div className="switching-themes">
        <div className="desc-label">
          <label>theme</label>
        </div>
        <Switcher states={states} state={theme} setState={setTheme} />
      </div>
    </header>
  );
}

export default Header;
