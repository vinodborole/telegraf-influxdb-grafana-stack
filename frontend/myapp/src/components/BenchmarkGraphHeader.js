//import logo from './logo-2.svg'
import { ReactComponent as Logo } from "./logo-2.svg";
import { ReactComponent as Logo_Dark } from "./logo-2-dark.svg";
import "../index.css";

function BenchmarkGraphHeader({ isDarkTheme, toggleTheme }) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900  mx-auto w-screen border-orange-500 overflow-hidden">
      {isDarkTheme ? <Logo /> : <Logo_Dark />}

      
      
        <label class="inline-flex cursor-pointer absolute right-7">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            onClick={toggleTheme}
          />
          <div class="w-14 h-7 bg-orange-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transperant rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
        </label>

        {isDarkTheme ? <span class="absolute right-1 dark:text-orange-500">🌙</span>:<span class="absolute right-1 dark:text-orange-500">☀</span>}
    </header>
  );
}

export default BenchmarkGraphHeader;
