import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  RefreshCcw,
  Search,
  Wallet,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import Topbar from "../../components/layout/Topbar";

import {
  getAllPayments,
  refundPayment,
  type PaymentResponse,
} from "../../services/payment.api";

const AdminPaymentPage = () => {
  const [ payments, setPayments ] = useState<PaymentResponse[]>( [] );
  const [ search, setSearch ] = useState( "" );
  const [ loading, setLoading ] = useState( true );
  const [ refundingId, setRefundingId ] = useState<number | null>( null );

  const loadPayments = async () => {
    try {
      setLoading( true );
      const data = await getAllPayments();
      setPayments( data );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to load payments" );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    loadPayments();
  }, [] );

  const handleRefund = async ( paymentId: number ) => {
    try {
      setRefundingId( paymentId );

      await refundPayment( paymentId );

      toast.success( "Payment refunded successfully" );
      await loadPayments();
    } catch ( error ) {
      console.error( error );
      toast.error( "Refund failed" );
    } finally {
      setRefundingId( null );
    }
  };

  const filteredPayments = useMemo( () => {
    return payments.filter( ( payment ) => {
      const text = `
        ${ payment.transactionId }
        ${ payment.bookingCode }
        ${ payment.userName }
        ${ payment.userEmail }
        ${ payment.locationName }
        ${ payment.slotCode }
        ${ payment.vehicleNumber }
        ${ payment.method }
        ${ payment.status }
      `.toLowerCase();

      return text.includes( search.toLowerCase() );
    } );
  }, [ payments, search ] );

  const paidPayments = payments.filter( ( payment ) => payment.status === "PAID" );

  const refundedPayments = payments.filter(
    ( payment ) => payment.status === "REFUNDED"
  );

  const totalRevenue = paidPayments.reduce(
    ( total, payment ) => total + payment.amount,
    0
  );

  const refundedAmount = refundedPayments.reduce(
    ( total, payment ) => total + payment.amount,
    0
  );

  return (
    <>
      <Topbar title="Payments" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Payment Management
          </h1>

          <p className="text-blue-600 dark:text-blue-300">
            Track transactions, revenue, and refunds
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          { [
            {
              label: "Total Payments",
              value: payments.length,
              icon: CreditCard,
              color: "text-blue-500",
            },
            {
              label: "Paid Revenue",
              value: `৳${ totalRevenue }`,
              icon: Wallet,
              color: "text-emerald-500",
            },
            {
              label: "Successful",
              value: paidPayments.length,
              icon: CheckCircle,
              color: "text-green-500",
            },
            {
              label: "Refunded",
              value: `৳${ refundedAmount }`,
              icon: RotateCcw,
              color: "text-yellow-500",
            },
          ].map( ( item ) => {
            const Icon = item.icon;

            return (
              <div
                key={ item.label }
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                  <Icon className={ item.color } size={ 24 } />
                </div>

                <p className="text-sm text-blue-600 dark:text-blue-300">
                  { item.label }
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  { item.value }
                </h2>
              </div>
            );
          } ) }
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 lg:w-96">
              <Search size={ 18 } className="text-blue-500" />

              <input
                value={ search }
                onChange={ ( event ) => setSearch( event.target.value ) }
                placeholder="Search transaction, user, booking..."
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
              />
            </div>

            <button
              type="button"
              onClick={ loadPayments }
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
            >
              <RefreshCcw size={ 18 } />
              Refresh
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          { loading ? (
            <div className="p-10 text-center text-blue-500">
              Loading payments...
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">
              No payments found.
            </div>
          ) : (
            <>
              <div className="space-y-4 p-4 lg:hidden">
                { filteredPayments.map( ( payment ) => (
                  <div
                    key={ payment.id }
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-300">
                          Transaction
                        </p>

                        <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                          { payment.transactionId }
                        </h3>
                      </div>

                      <span
                        className={ `rounded-xl px-3 py-1 text-xs font-bold ${ payment.status === "PAID"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : payment.status === "REFUNDED"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-red-500/10 text-red-500"
                          }` }
                      >
                        { payment.status }
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Booking
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.bookingCode }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          User
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.userEmail }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Location
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.locationName }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Slot
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.slotCode }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Method
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { payment.method }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Amount
                        </p>
                        <p className="font-bold text-blue-600 dark:text-blue-400">
                          ৳{ payment.amount }
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={
                        payment.status === "REFUNDED" ||
                        refundingId === payment.id
                      }
                      onClick={ () => handleRefund( payment.id ) }
                      className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <RefreshCcw size={ 15 } />
                      { refundingId === payment.id ? "Refunding..." : "Refund" }
                    </button>
                  </div>
                ) ) }
              </div>

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1100px] text-left text-sm">
                  <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/50 dark:text-blue-300">
                    <tr>
                      <th className="px-6 py-4">Transaction</th>
                      <th className="px-6 py-4">Booking</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Slot</th>
                      <th className="px-6 py-4">Method</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Paid At</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    { filteredPayments.map( ( payment ) => (
                      <tr
                        key={ payment.id }
                        className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                      >
                        <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                          { payment.transactionId }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.bookingCode }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.userEmail }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.locationName }
                        </td>

                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                          { payment.slotCode }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.method }
                        </td>

                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                          ৳{ payment.amount }
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={ `rounded-xl px-3 py-1 text-xs font-bold ${ payment.status === "PAID"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : payment.status === "REFUNDED"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-red-500/10 text-red-500"
                              }` }
                          >
                            { payment.status }
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { payment.paidAt
                            ? new Date( payment.paidAt ).toLocaleString()
                            : "N/A" }
                        </td>

                        <td className="px-6 py-4">
                          <button
                            type="button"
                            disabled={
                              payment.status === "REFUNDED" ||
                              refundingId === payment.id
                            }
                            onClick={ () => handleRefund( payment.id ) }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <RefreshCcw size={ 15 } />
                            { refundingId === payment.id
                              ? "Refunding..."
                              : "Refund" }
                          </button>
                        </td>
                      </tr>
                    ) ) }
                  </tbody>
                </table>
              </div>
            </>
          ) }
        </section>
      </div>
    </>
  );
};

export default AdminPaymentPage;