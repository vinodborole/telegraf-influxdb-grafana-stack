//import logo from './logo-2.svg'
import { ReactComponent as Logo } from "./logo-2.svg";
import { ReactComponent as Logo_Dark } from "./logo-2-dark.svg";
import "../index.css";
import ThemeChanger from "./ThemeChanger";

function BenchmarkGraphHeader({ isDarkTheme, toggleTheme }) {

  
  return (
    <header className="inline-flex items-center justify-between p-4 w-screen bg-gray-100 dark:bg-gray-900  mx-auto border-orange-500 overflow-hidden shadow-xl">
      {isDarkTheme ? <Logo /> : <Logo_Dark />}
      <ThemeChanger isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}/>

      </header>
  );
}

export default BenchmarkGraphHeader;
