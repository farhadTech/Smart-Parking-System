import { Link } from "react-router-dom";
import { Car, MapPin, CreditCard, Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "../../features/theme/ThemeContext";

const HomePage = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <section className="relative min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6">
      <button
        type="button"
        onClick={ toggleTheme }
        className="absolute right-6 top-6 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      >
        { isDark ? <Sun size={ 20 } /> : <Moon size={ 20 } /> }
      </button>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Smart Parking Platform
          </p>

          <h1 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            Smart Parking System
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            Find parking spaces, book slots, manage payments, and use AI-powered
            recommendations for a smarter parking experience.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-blue-300"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          { [
            [ "Find Parking", "Locate available parking nearby.", MapPin ],
            [ "Book Slots", "Reserve parking before arrival.", Car ],
            [ "Payments", "Manage secure payment history.", CreditCard ],
            [ "AI Suggestions", "Get smarter parking recommendations.", Sparkles ],
          ].map( ( [ title, desc, Icon ] ) => (
            <div
              key={ title as string }
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Icon size={ 22 } />
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white">
                { title as string }
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                { desc as string }
              </p>
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
};

export default HomePage;