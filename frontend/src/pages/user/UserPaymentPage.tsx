import {
  Banknote,
  CreditCard,
  Receipt,
  Smartphone,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Topbar from "../../components/layout/Topbar";
import { useAuth } from "../../features/auth/AuthContext";

import type { BookingResponse } from "../../services/booking.api";

import {
  createPayment,
  getMyPayments,
  type PaymentMethod,
  type PaymentResponse,
} from "../../services/payment.api";

const methods: {
  label: string;
  value: PaymentMethod;
  icon: typeof CreditCard;
  description: string;
}[] = [
    {
      label: "Card",
      value: "CARD",
      icon: CreditCard,
      description: "Pay using debit or credit card",
    },
    {
      label: "bKash",
      value: "BKASH",
      icon: Smartphone,
      description: "Mobile payment with bKash",
    },
    {
      label: "Nagad",
      value: "NAGAD",
      icon: Smartphone,
      description: "Mobile payment with Nagad",
    },
    {
      label: "Cash",
      value: "CASH",
      icon: Banknote,
      description: "Pay cash at parking counter",
    },
  ];

const UserPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const basePath = user?.role === "ADMIN" ? "/admin" : "/user";

  const booking = (
    location.state as {
      booking?: BookingResponse;
    } | null
  )?.booking;

  const [ method, setMethod ] = useState<PaymentMethod>( "CARD" );
  const [ loading, setLoading ] = useState( false );
  const [ payments, setPayments ] = useState<PaymentResponse[]>( [] );
  const [ historyLoading, setHistoryLoading ] = useState( true );

  const loadPayments = async () => {
    try {
      setHistoryLoading( true );
      const data = await getMyPayments();
      setPayments( data );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to load payment history." );
    } finally {
      setHistoryLoading( false );
    }
  };

  useEffect( () => {
    loadPayments();
  }, [] );

  const handlePay = async () => {
    if ( !booking ) return;

    try {
      setLoading( true );

      await createPayment( {
        bookingId: booking.id,
        method,
      } );

      toast.success( "Payment successful" );
      await loadPayments();

      navigate( `${ basePath }/bookings` );
    } catch ( error ) {
      console.error( error );
      toast.error( "Payment failed or already paid." );
    } finally {
      setLoading( false );
    }
  };

  return (
    <>
      <Topbar title="Payment" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Payment
          </h1>

          <p className="text-blue-600 dark:text-blue-300">
            Complete your parking payment
          </p>
        </div>

        { !booking ? (
          <section className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <h2 className="text-xl font-bold text-yellow-600 dark:text-yellow-300">
              No booking selected
            </h2>

            <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
              Please create a booking first, then continue to payment.
            </p>

            <button
              type="button"
              onClick={ () => navigate( `${ basePath }/locations` ) }
              className="mt-5 cursor-pointer rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
            >
              Create Booking
            </button>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
                Select Payment Method
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                { methods.map( ( item ) => {
                  const Icon = item.icon;
                  const active = method === item.value;

                  return (
                    <button
                      key={ item.value }
                      type="button"
                      onClick={ () => setMethod( item.value ) }
                      className={ `cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.98] ${ active
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                        }` }
                    >
                      <Icon className="mb-3 text-blue-500" size={ 26 } />

                      <h3 className="font-bold text-slate-900 dark:text-white">
                        { item.label }
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        { item.description }
                      </p>
                    </button>
                  );
                } ) }
              </div>

              <button
                type="button"
                onClick={ handlePay }
                disabled={ loading }
                className="mt-6 w-full cursor-pointer rounded-2xl bg-blue-500 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                { loading ? "Processing..." : `Pay ৳${ booking.amount }` }
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Receipt />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Payment Summary
                  </h2>

                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Booking #{ booking.bookingCode }
                  </p>
                </div>
              </div>

              { [
                [ "Booking", booking.bookingCode ],
                [ "Location", booking.locationName ],
                [ "Address", booking.locationAddress ],
                [ "Slot", booking.slotCode ],
                [ "Zone", booking.zone ],
                [ "Vehicle", booking.vehicleNumber ],
                [ "Duration", `${ booking.durationHours } hour(s)` ],
              ].map( ( [ label, value ] ) => (
                <div
                  key={ label }
                  className="flex justify-between border-b border-slate-200 py-3 text-sm dark:border-slate-800"
                >
                  <span className="text-slate-500 dark:text-slate-400">
                    { label }
                  </span>

                  <span className="text-right font-bold text-slate-900 dark:text-white">
                    { value }
                  </span>
                </div>
              ) ) }

              <div className="mt-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                <div className="flex justify-between">
                  <span className="font-bold text-blue-600 dark:text-blue-300">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    ৳{ booking.amount }
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) }

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Payment History
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Previous parking payments
            </p>
          </div>

          { historyLoading ? (
            <p className="text-slate-500 dark:text-slate-400">
              Loading payments...
            </p>
          ) : payments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">
                No payments found.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              { payments.map( ( payment ) => (
                <div
                  key={ payment.id }
                  className="rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-800"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        { payment.locationName }
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Booking #{ payment.bookingCode }
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        Slot: { payment.slotCode }
                      </div>

                      <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-500">
                        { payment.method }
                      </div>

                      <div
                        className={ `rounded-xl px-4 py-2 text-sm font-bold ${ payment.status === "PAID"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : payment.status === "REFUNDED"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-red-500/10 text-red-500"
                          }` }
                      >
                        { payment.status }
                      </div>

                      <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
                        ৳{ payment.amount }
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    Transaction ID: { payment.transactionId }
                  </div>

                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Paid At: { new Date( payment.paidAt ).toLocaleString() }
                  </div>
                </div>
              ) ) }
            </div>
          ) }
        </section>
      </div>
    </>
  );
};

export default UserPaymentPage;
