import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Clock3,
  CreditCard,
  Eye,
  MapPin,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

import Topbar from "../../components/layout/Topbar";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../features/auth/AuthContext";
import { saveBooking } from "../../services/booking.storage";
import {
  getPayments,
  refundPayment,
  savePayment,
} from "../../services/payment.storage";
import type { Payment, PaymentMethod } from "../../types/payment.types";
import toast from "react-hot-toast";

type PaymentState = {
  locationName?: string;
  locationAddress?: string;
  slot: string;
  zone: string;
  vehicle: string;
  duration: string;
  amount: number;
  subtotal?: number;
  discountAmount?: number;
  discountRate?: number;
  pricePerHour?: number;
  role?: string;
};

const UserPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const booking = location.state as PaymentState | null;
  const isCheckout = Boolean( booking );
  const isAdmin = user?.role === "ADMIN";
  const basePath = isAdmin ? "/admin" : "/user";

  const [ method, setMethod ] = useState<PaymentMethod>( "CARD" );
  const [ isPaid, setIsPaid ] = useState( false );

  const [ cardName, setCardName ] = useState( "" );
  const [ cardNumber, setCardNumber ] = useState( "" );
  const [ expiry, setExpiry ] = useState( "" );
  const [ cvv, setCvv ] = useState( "" );
  const [ walletNumber, setWalletNumber ] = useState( "" );
  const [ selectedPayment, setSelectedPayment ] = useState<Payment | null>( null );
  const [ refreshKey, setRefreshKey ] = useState( 0 );

  const payments = useMemo( () => {
    const allPayments = getPayments();

    if ( isAdmin ) return allPayments;

    return allPayments.filter( ( payment ) => payment.userRole === "USER" );
  }, [ isAdmin, refreshKey ] );

  const totalRevenue = payments
    .filter( ( payment ) => payment.status === "Paid" )
    .reduce( ( sum, payment ) => sum + payment.amount, 0 );

  const validatePayment = () => {
    if ( method === "CARD" ) {
      return cardName.trim() && cardNumber.trim() && expiry.trim() && cvv.trim();
    }

    return walletNumber.trim();
  };

  const handlePayment = () => {
    if ( !booking || !validatePayment() ) return;

    const bookingId = `BK-${ Date.now() }`;
    const paymentId = `PAY-${ Date.now() }`;

    saveBooking( {
      id: bookingId,
      locationName: booking.locationName || "Unknown Location",
      locationAddress: booking.locationAddress || "Unknown Address",
      slot: booking.slot,
      zone: booking.zone,
      vehicle: booking.vehicle,
      duration: booking.duration,
      amount: booking.amount,
      pricePerHour: booking.pricePerHour || 50,
      status: "Active",
      paymentMethod: method,
      userRole: isAdmin ? "ADMIN" : "USER",
      createdAt: new Date().toLocaleString(),
    } );

    savePayment( {
      id: paymentId,
      bookingId,
      locationName: booking.locationName || "Unknown Location",
      slot: booking.slot,
      vehicle: booking.vehicle,
      method,
      amount: booking.amount,
      subtotal: booking.subtotal,
      discountAmount: booking.discountAmount,
      status: "Paid",
      userRole: isAdmin ? "ADMIN" : "USER",
      createdAt: new Date().toLocaleString(),
    } );

    toast.success( "Payment successful" );

    setIsPaid( true );

    setTimeout( () => {
      navigate( `${ basePath }/bookings` );
    }, 1500 );
  };

  const handleRefund = ( paymentId: string ) => {
    refundPayment( paymentId );
    setRefreshKey( ( prev ) => prev + 1 );
    toast.success( "Payment refunded" );
  };

  if ( !isCheckout ) {
    return (
      <>
        <Topbar title="Payments" />

        <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Payment History
              </h1>
              <p className="text-blue-600 dark:text-blue-300">
                { isAdmin
                  ? "Track all platform payments"
                  : "Track your payment receipts" }
              </p>
            </div>

            <button
              type="button"
              onClick={ () => navigate( `${ basePath }/locations` ) }
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] sm:w-fit"
            >
              <CreditCard size={ 18 } />
              New Payment
            </button>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Total Payments
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                { payments.length }
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Total Revenue
              </p>
              <h2 className="mt-3 text-3xl font-bold text-emerald-500">
                ৳{ totalRevenue }
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-blue-600 dark:text-blue-300">Paid</p>
              <h2 className="mt-3 text-3xl font-bold text-blue-500">
                { payments.filter( ( payment ) => payment.status === "Paid" ).length }
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Refunded
              </p>
              <h2 className="mt-3 text-3xl font-bold text-red-500">
                {
                  payments.filter( ( payment ) => payment.status === "Refunded" )
                    .length
                }
              </h2>
            </div>
          </section>

          { payments.length === 0 ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                No payments yet
              </h2>
              <p className="mt-2 text-blue-600 dark:text-blue-300">
                Complete a parking reservation to create a payment record.
              </p>
            </section>
          ) : (
            <>
              <section className="space-y-4 lg:hidden">
                { payments.map( ( payment ) => (
                  <div
                    key={ payment.id }
                    onClick={ () => setSelectedPayment( payment ) }
                    className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-300">
                          Payment ID
                        </p>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          { payment.id }
                        </h3>
                      </div>

                      <StatusBadge status={ payment.status as any } />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Booking</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.bookingId }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Method</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.method }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Slot</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.slot }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Amount</p>
                        <p className="font-bold text-blue-600 dark:text-blue-400">
                          ৳{ payment.amount }
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={ ( event ) => {
                          event.stopPropagation();
                          setSelectedPayment( payment );
                        } }
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600"
                      >
                        <Eye size={ 16 } />
                        View
                      </button>

                      { isAdmin && payment.status === "Paid" && (
                        <button
                          type="button"
                          onClick={ ( event ) => {
                            event.stopPropagation();
                            handleRefund( payment.id );
                          } }
                          className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500/20"
                        >
                          <RefreshCcw size={ 16 } />
                          Refund
                        </button>
                      ) }
                    </div>
                  </div>
                ) ) }
              </section>

              <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/40 dark:text-blue-300">
                    <tr>
                      <th className="px-6 py-4">Payment ID</th>
                      <th className="px-6 py-4">Booking ID</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Method</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    { payments.map( ( payment ) => (
                      <tr
                        key={ payment.id }
                        onClick={ () => setSelectedPayment( payment ) }
                        className="cursor-pointer border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                      >
                        <td className="px-6 py-4 text-blue-600 dark:text-blue-400">
                          { payment.id }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.bookingId }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.locationName }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.method }
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                          ৳{ payment.amount }
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={ payment.status as any } />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={ ( event ) => {
                                event.stopPropagation();
                                setSelectedPayment( payment );
                              } }
                              className="cursor-pointer text-blue-500 hover:text-blue-400"
                            >
                              <Eye size={ 16 } />
                            </button>

                            { isAdmin && payment.status === "Paid" && (
                              <button
                                type="button"
                                onClick={ ( event ) => {
                                  event.stopPropagation();
                                  handleRefund( payment.id );
                                } }
                                className="cursor-pointer text-red-500 hover:text-red-400"
                              >
                                <RefreshCcw size={ 16 } />
                              </button>
                            ) }
                          </div>
                        </td>
                      </tr>
                    ) ) }
                  </tbody>
                </table>
              </section>
            </>
          ) }
        </div>

        { selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
                Payment Details
              </h2>

              <div className="space-y-4 text-sm">
                { [
                  [ "Payment ID", selectedPayment.id ],
                  [ "Booking ID", selectedPayment.bookingId ],
                  [ "Location", selectedPayment.locationName ],
                  [ "Slot", selectedPayment.slot ],
                  [ "Vehicle", selectedPayment.vehicle ],
                  [ "Method", selectedPayment.method ],
                  [ "Amount", `৳${ selectedPayment.amount }` ],
                  [ "Created At", selectedPayment.createdAt ],
                ].map( ( [ label, value ] ) => (
                  <div key={ label } className="flex justify-between gap-5">
                    <span className="text-blue-600 dark:text-blue-300">
                      { label }
                    </span>
                    <span className="text-right font-bold text-slate-900 dark:text-white">
                      { value }
                    </span>
                  </div>
                ) ) }

                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-300">
                    Status
                  </span>
                  <StatusBadge status={ selectedPayment.status as any } />
                </div>
              </div>

              <button
                type="button"
                onClick={ () => setSelectedPayment( null ) }
                className="mt-6 w-full rounded-2xl bg-blue-500 py-3 font-bold text-white hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        ) }
      </>
    );
  }

  const validateDisabled = isPaid || !validatePayment();

  return (
    <>
      <Topbar title="Payment" />

      <div className="bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          { isPaid && (
            <div className="flex animate-pulse items-center gap-4 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-emerald-500">
              <CheckCircle size={ 32 } />
              <div>
                <h2 className="text-xl font-bold">Payment Successful</h2>
                <p className="text-sm">Redirecting to bookings...</p>
              </div>
            </div>
          ) }

          <section className="grid gap-6 md:grid-cols-3">
            { [
              [ "CARD", "Card Payment", "Visa / Mastercard", CreditCard ],
              [ "BKASH", "bKash", "Mobile wallet", Smartphone ],
              [ "NAGAD", "Nagad", "Mobile wallet", Wallet ],
            ].map( ( [ value, title, subtitle, Icon ] ) => (
              <button
                key={ value as string }
                type="button"
                onClick={ () => setMethod( value as PaymentMethod ) }
                className={ `group cursor-pointer rounded-3xl border p-8 text-center transition hover:-translate-y-1 ${ method === value
                    ? "border-blue-500 bg-blue-500/15"
                    : "border-slate-200 bg-white hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900"
                  }` }
              >
                <Icon
                  className="mx-auto mb-4 text-blue-500 transition group-hover:scale-110"
                  size={ 36 }
                />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  { title as string }
                </h3>
                <p className="mt-2 text-sm text-slate-500">{ subtitle as string }</p>
              </button>
            ) ) }
          </section>

          <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              { method === "CARD" ? (
                <>
                  <div className="mb-6 flex items-center gap-3">
                    <ShieldCheck className="text-blue-500" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Secure Card Payment
                    </h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={ cardName }
                      onChange={ ( e ) => setCardName( e.target.value ) }
                      placeholder="Card holder name"
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <input
                      value={ cardNumber }
                      onChange={ ( e ) => setCardNumber( e.target.value ) }
                      placeholder="Card number"
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <input
                      value={ expiry }
                      onChange={ ( e ) => setExpiry( e.target.value ) }
                      placeholder="MM/YY"
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <input
                      value={ cvv }
                      onChange={ ( e ) => setCvv( e.target.value ) }
                      placeholder="CVV"
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                    { method === "BKASH" ? "bKash" : "Nagad" } Payment
                  </h2>

                  <input
                    value={ walletNumber }
                    onChange={ ( e ) => setWalletNumber( e.target.value ) }
                    placeholder="Enter wallet number"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </>
              ) }

              <button
                type="button"
                onClick={ handlePayment }
                disabled={ validateDisabled }
                className={ `mt-6 w-full rounded-2xl py-4 text-lg font-bold text-white transition ${ validateDisabled
                    ? "cursor-not-allowed bg-blue-500/40"
                    : "cursor-pointer bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
                  }` }
              >
                { isPaid ? "Payment Completed" : `Pay ৳${ booking?.amount }` }
              </button>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                Booking Summary
              </h2>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin className="text-blue-500" />
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Location
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      { booking?.locationName }
                    </p>
                    <p className="text-sm text-slate-500">
                      { booking?.locationAddress }
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock3 className="text-blue-500" />
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Duration
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      { booking?.duration }
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Slot</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      { booking?.slot }
                    </span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Vehicle</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      { booking?.vehicle }
                    </span>
                  </div>

                  { isAdmin && (
                    <>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          ৳{ booking?.subtotal }
                        </span>
                      </div>

                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Discount</span>
                        <span className="font-bold text-emerald-500">
                          -৳{ booking?.discountAmount }
                        </span>
                      </div>
                    </>
                  ) }

                  <div className="mt-4 flex justify-between border-t border-slate-300 pt-4 dark:border-slate-700">
                    <span className="text-lg text-blue-600 dark:text-blue-300">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                      ৳{ booking?.amount }
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPaymentPage;