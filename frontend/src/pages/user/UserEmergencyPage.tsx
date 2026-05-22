import {
  Phone,
  ShieldAlert,
  Ambulance,
  Flame,
  Wrench,
} from "lucide-react";

import Topbar from "../../components/layout/Topbar";

import {
  pageStyle,
  cardStyle,
  clickableCardStyle,
  titleStyle,
  mutedTextStyle,
} from "../../styles/theme";

const emergencyCards = [
  {
    title: "Security Alert",
    subtitle: "Contact parking security immediately",
    button: "Call Security",
    phone: "+8801234567890",
    icon: ShieldAlert,
    color:
      "border-red-500/40 bg-red-500/10 hover:border-red-500 text-red-500 dark:text-red-400",
  },
  {
    title: "Medical Help",
    subtitle: "Emergency medical assistance",
    button: "Call Ambulance",
    phone: "+8805555111222",
    icon: Ambulance,
    color:
      "border-blue-500/40 bg-blue-500/10 hover:border-blue-500 text-blue-500 dark:text-blue-400",
  },
  {
    title: "Fire Emergency",
    subtitle: "Report fire or smoke in the facility",
    button: "Call Fire Dept.",
    phone: "199",
    icon: Flame,
    color:
      "border-orange-500/40 bg-orange-500/10 hover:border-orange-500 text-orange-500 dark:text-orange-400",
  },
  {
    title: "Vehicle Breakdown",
    subtitle: "Request towing or roadside assistance",
    button: "Request Towing",
    phone: "+8809876543210",
    icon: Wrench,
    color:
      "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-500 text-emerald-500 dark:text-emerald-400",
  },
];

const contacts = [
  [ "📞", "Emergency Hotline", "+880 1234 567890" ],
  [ "🛡️", "Parking Security", "+880 9876 543210" ],
  [ "🏥", "Medical Response", "+880 5555 111222" ],
  [ "🚒", "Fire Department", "199" ],
];

const UserEmergencyPage = () => {
  const handleCall = ( phone: string ) => {
    window.location.href = `tel:${ phone }`;
  };

  return (
    <>
      <Topbar title="Emergency" />

      <div className={ pageStyle }>
        <div>
          <h1 className={ `text-3xl font-bold ${ titleStyle }` }>
            Emergency Support
          </h1>

          <p className={ `mt-2 ${ mutedTextStyle }` }>
            Get emergency assistance immediately
          </p>
        </div>

        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-5 text-red-500 dark:text-red-400">
          <h2 className="font-bold">⚠ Emergency protocols active</h2>
          <p className="mt-1 text-sm">
            Response time: under 3 minutes. All calls are recorded.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          { emergencyCards.map( ( card ) => {
            const Icon = card.icon;

            return (
              <button
                key={ card.title }
                type="button"
                onClick={ () => handleCall( card.phone ) }
                className={ `group cursor-pointer rounded-2xl border p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.98] ${ card.color }` }
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition duration-300 group-hover:scale-110 dark:bg-slate-900">
                  <Icon size={ 28 } />
                </div>

                <h2 className={ `text-2xl font-bold ${ titleStyle }` }>
                  { card.title }
                </h2>

                <p className={ `mt-2 ${ mutedTextStyle }` }>{ card.subtitle }</p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-blue-600">
                  <Phone size={ 18 } />
                  { card.button }
                </div>
              </button>
            );
          } ) }
        </section>

        <section className={ `${ cardStyle } overflow-hidden` }>
          { contacts.map( ( [ icon, title, phone ] ) => (
            <button
              key={ title }
              type="button"
              onClick={ () => handleCall( phone.replaceAll( " ", "" ) ) }
              className="flex w-full cursor-pointer items-center justify-between border-b border-slate-200 px-5 py-5 text-left transition-all duration-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/80 sm:px-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{ icon }</span>

                <div>
                  <h3 className={ `font-bold ${ titleStyle }` }>{ title }</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    { phone }
                  </p>
                </div>
              </div>

              <span className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-500 transition hover:bg-blue-500 hover:text-white dark:text-blue-400">
                Call
              </span>
            </button>
          ) ) }
        </section>
      </div>
    </>
  );
};

export default UserEmergencyPage;