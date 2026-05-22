import { useState } from "react";
import {
  CalendarDays,
  Car,
  CreditCard,
  UserCog,
  X,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

import Topbar from "../../components/layout/Topbar";

type ManagementType = "users" | "parking" | "bookings" | "payments";

type ManagementItem = {
  type: ManagementType;
  title: string;
  description: string;
  icon: typeof UserCog;
};

const items: ManagementItem[] = [
  {
    type: "users",
    title: "User Management",
    description: "Create, update, disable, or review platform users.",
    icon: UserCog,
  },
  {
    type: "parking",
    title: "Parking Slot Management",
    description: "Add, edit, disable, or monitor parking slots.",
    icon: Car,
  },
  {
    type: "bookings",
    title: "Booking Management",
    description: "Review reservations, cancellations, and booking status.",
    icon: CalendarDays,
  },
  {
    type: "payments",
    title: "Payment Management",
    description: "Track payments, invoices, refunds, and revenue records.",
    icon: CreditCard,
  },
];

const modalData = {
  users: {
    title: "User Management",
    action: "Add User",
    headers: [ "Name", "Email", "Role", "Status" ],
    rows: [
      [ "Shaju Ahmed", "shaju@example.com", "USER", "Active" ],
      [ "Admin User", "admin@example.com", "ADMIN", "Active" ],
      [ "Riya Khan", "riya@example.com", "USER", "Disabled" ],
    ],
  },
  parking: {
    title: "Parking Slot Management",
    action: "Add Slot",
    headers: [ "Slot", "Location", "Status", "Rate" ],
    rows: [
      [ "G-A02", "Gulshan", "Available", "৳50/hr" ],
      [ "BN-A01", "Banani", "Available", "৳60/hr" ],
      [ "DH-A03", "Dhanmondi", "Occupied", "৳45/hr" ],
    ],
  },
  bookings: {
    title: "Booking Management",
    action: "New Booking",
    headers: [ "Booking ID", "Slot", "Vehicle", "Status" ],
    rows: [
      [ "BK-1001", "G-A02", "DHK-1234", "Active" ],
      [ "BK-1002", "BN-A01", "SYL-9012", "Upcoming" ],
      [ "BK-1003", "DH-A03", "CTG-5678", "Completed" ],
    ],
  },
  payments: {
    title: "Payment Management",
    action: "Export Payments",
    headers: [ "Payment ID", "Method", "Amount", "Status" ],
    rows: [
      [ "PAY-1001", "bKash", "৳100", "Paid" ],
      [ "PAY-1002", "Card", "৳240", "Paid" ],
      [ "PAY-1003", "Nagad", "৳180", "Pending" ],
    ],
  },
};

const AdminManagementPage = () => {
  const [ activeType, setActiveType ] = useState<ManagementType | null>( null );

  const activeData = activeType ? modalData[ activeType ] : null;

  return (
    <>
      <Topbar title="Management" />

      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Management</h1>
          <p className="text-blue-300">Admin control center</p>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          { items.map( ( item ) => {
            const Icon = item.icon;

            return (
              <button
                key={ item.type }
                type="button"
                onClick={ () => setActiveType( item.type ) }
                className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.99]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 transition duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                  <Icon />
                </div>

                <h2 className="text-2xl font-bold text-white">
                  { item.title }
                </h2>

                <p className="mt-3 text-blue-300">{ item.description }</p>

                <div className="mt-8 inline-flex items-center rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition group-hover:bg-blue-600">
                  Manage
                </div>
              </button>
            );
          } ) }
        </section>
      </div>

      { activeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  { activeData.title }
                </h2>
                <p className="text-sm text-blue-300">
                  View, manage, and update records
                </p>
              </div>

              <button
                type="button"
                onClick={ () => setActiveType( null ) }
                className="rounded-full bg-slate-800 p-2 text-slate-300 hover:text-white"
              >
                <X size={ 20 } />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 md:w-96">
                  <Search size={ 18 } className="text-blue-300" />
                  <input
                    placeholder="Search records..."
                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
                >
                  <Plus size={ 18 } />
                  { activeData.action }
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/70 text-blue-300">
                    <tr>
                      { activeData.headers.map( ( header ) => (
                        <th key={ header } className="px-6 py-4">
                          { header }
                        </th>
                      ) ) }
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    { activeData.rows.map( ( row, rowIndex ) => (
                      <tr
                        key={ rowIndex }
                        className="border-t border-slate-800 transition hover:bg-slate-800/70"
                      >
                        { row.map( ( value, index ) => (
                          <td
                            key={ index }
                            className={ `px-6 py-4 ${ index === 0
                                ? "font-bold text-white"
                                : "text-slate-300"
                              }` }
                          >
                            { value }
                          </td>
                        ) ) }

                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye size={ 16 } />
                            </button>

                            <button className="text-yellow-400 hover:text-yellow-300">
                              <Edit size={ 16 } />
                            </button>

                            <button className="text-red-400 hover:text-red-300">
                              <Trash2 size={ 16 } />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) ) }
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-slate-400">
                This is frontend demo management. Later these actions will
                connect to Spring Boot admin APIs.
              </p>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default AdminManagementPage;
