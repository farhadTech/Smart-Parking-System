import { useState } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  MessageSquare,
  Moon,
  RefreshCcw,
  Save,
  Shield,
  Smartphone,
} from "lucide-react";

import Topbar from "../../components/layout/Topbar";
import { useTheme } from "../../features/theme/ThemeContext";

import {
  pageStyle,
  cardStyle,
  titleStyle,
  mutedTextStyle,
  buttonStyle,
} from "../../styles/theme";

const UserSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [ pushNotifications, setPushNotifications ] = useState( true );
  const [ smsAlerts, setSmsAlerts ] = useState( false );
  const [ autoRenewal, setAutoRenewal ] = useState( true );
  const [ emailReceipts, setEmailReceipts ] = useState( true );
  const [ twoFactor, setTwoFactor ] = useState( false );

  const settings = [
    {
      title: "Push Notifications",
      subtitle: "Receive booking and payment updates",
      active: pushNotifications,
      setActive: setPushNotifications,
      icon: Bell,
    },
    {
      title: "SMS Alerts",
      subtitle: "Text messages for expiry warnings",
      active: smsAlerts,
      setActive: setSmsAlerts,
      icon: Smartphone,
    },
    {
      title: "Auto-renewal",
      subtitle: "Extend parking sessions automatically",
      active: autoRenewal,
      setActive: setAutoRenewal,
      icon: RefreshCcw,
    },
    {
      title: "Email Receipts",
      subtitle: "Receive payment receipts by email",
      active: emailReceipts,
      setActive: setEmailReceipts,
      icon: MessageSquare,
    },
    {
      title: "Two-Factor Authentication",
      subtitle: "Add extra account security",
      active: twoFactor,
      setActive: setTwoFactor,
      icon: Shield,
    },
  ];

  const handleSave = () => {
    toast.success( "Settings saved successfully" );
  };

  return (
    <>
      <Topbar title="Settings" />

      <div className={ pageStyle }>
        <div>
          <h1 className={ `text-3xl font-bold ${ titleStyle }` }>Settings</h1>
          <p className={ `mt-2 ${ mutedTextStyle }` }>Manage your preferences</p>
        </div>

        <section className={ `${ cardStyle } max-w-4xl p-6` }>
          <h2 className={ `mb-6 text-xl font-bold ${ titleStyle }` }>
            Notifications & Appearance
          </h2>

          <div className="space-y-2">
            { settings.map( ( item ) => {
              const Icon = item.icon;

              return (
                <button
                  key={ item.title }
                  type="button"
                  onClick={ () => item.setActive( !item.active ) }
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                      <Icon size={ 20 } />
                    </div>

                    <div>
                      <h3 className={ `font-bold ${ titleStyle }` }>
                        { item.title }
                      </h3>
                      <p className={ `text-sm ${ mutedTextStyle }` }>
                        { item.subtitle }
                      </p>
                    </div>
                  </div>

                  <div
                    className={ `flex h-7 w-12 items-center rounded-full p-1 transition ${ item.active
                      ? "bg-blue-500"
                      : "bg-slate-300 dark:bg-slate-700"
                      }` }
                  >
                    <span
                      className={ `h-5 w-5 rounded-full bg-white transition ${ item.active ? "ml-5" : ""
                        }` }
                    />
                  </div>
                </button>
              );
            } ) }

            <button
              type="button"
              onClick={ toggleTheme }
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/70 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                  <Moon size={ 20 } />
                </div>

                <div>
                  <h3 className={ `font-bold ${ titleStyle }` }>
                    { isDark ? "Dark Mode" : "Light Mode" }
                  </h3>
                  <p className={ `text-sm ${ mutedTextStyle }` }>
                    Toggle dark / light interface
                  </p>
                </div>
              </div>

              <div
                className={ `flex h-7 w-12 items-center rounded-full p-1 transition ${ isDark ? "bg-blue-500" : "bg-slate-300"
                  }` }
              >
                <span
                  className={ `h-5 w-5 rounded-full bg-white transition ${ isDark ? "ml-5" : ""
                    }` }
                />
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={ handleSave }
            className={ `mt-6 flex w-full items-center justify-center gap-2 ${ buttonStyle }` }
          >
            <Save size={ 18 } />
            Save Changes
          </button>
        </section>
      </div>
    </>
  );
};

export default UserSettingsPage;