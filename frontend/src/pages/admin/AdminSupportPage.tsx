import {
  CheckCircle,
  MessageCircle,
  Search,
  Send,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Topbar from "../../components/layout/Topbar";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../features/auth/AuthContext";
import {
  addSupportMessage,
  getSupportTickets,
  updateSupportTicketStatus,
} from "../../services/support.storage";
import type { SupportStatus, SupportTicket } from "../../types/support.types";
import toast from "react-hot-toast";

type FilterStatus = "All" | SupportStatus;

const filters: FilterStatus[] = [ "All", "Open", "Pending", "Urgent", "Closed" ];

const AdminSupportPage = () => {
  const { user } = useAuth();

  const [ tickets, setTickets ] = useState<SupportTicket[]>( [] );
  const [ selectedTicket, setSelectedTicket ] = useState<SupportTicket | null>(
    null
  );
  const [ search, setSearch ] = useState( "" );
  const [ filter, setFilter ] = useState<FilterStatus>( "All" );
  const [ reply, setReply ] = useState( "" );

  const loadTickets = () => {
    setTickets( getSupportTickets() );
  };

  useEffect( () => {
    loadTickets();
  }, [] );

  const filteredTickets = useMemo( () => {
    return tickets.filter( ( ticket ) => {
      const matchesFilter = filter === "All" || ticket.status === filter;

      const text = `${ ticket.id } ${ ticket.subject } ${ ticket.userName } ${ ticket.userEmail } ${ ticket.category }`.toLowerCase();

      const matchesSearch = text.includes( search.toLowerCase() );

      return matchesFilter && matchesSearch;
    } );
  }, [ tickets, search, filter ] );

  const sendReply = () => {
    if ( !selectedTicket || !reply.trim() ) return;

    addSupportMessage( selectedTicket.id, {
      id: `MSG-${ Date.now() }`,
      senderRole: "ADMIN",
      senderName: user?.name || "Admin Support",
      message: reply,
      createdAt: new Date().toLocaleString(),
    } );

    toast.success( "Reply sent" );

    setReply( "" );
    loadTickets();

    const updatedTicket = getSupportTickets().find(
      ( ticket ) => ticket.id === selectedTicket.id
    );

    setSelectedTicket( updatedTicket || null );
  };

  const changeStatus = ( status: SupportStatus ) => {
    if ( !selectedTicket ) return;

    updateSupportTicketStatus( selectedTicket.id, status );
    loadTickets();

    toast.success( `Ticket marked as ${ status }` );
    
    const updatedTicket = getSupportTickets().find(
      ( ticket ) => ticket.id === selectedTicket.id
    );

    setSelectedTicket( updatedTicket || null );
  };

  return (
    <>
      <Topbar title="Support" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Support Center
          </h1>
          <p className="text-blue-600 dark:text-blue-300">
            Manage user support tickets and conversations
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          { [
            [ "Total", tickets.length, "text-blue-500" ],
            [
              "Open",
              tickets.filter( ( ticket ) => ticket.status === "Open" ).length,
              "text-emerald-500",
            ],
            [
              "Pending",
              tickets.filter( ( ticket ) => ticket.status === "Pending" ).length,
              "text-yellow-500",
            ],
            [
              "Urgent",
              tickets.filter( ( ticket ) => ticket.status === "Urgent" ).length,
              "text-red-500",
            ],
          ].map( ( [ label, value, color ] ) => (
            <div
              key={ label }
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className={ `text-3xl font-bold ${ color }` }>{ value }</p>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                { label }
              </p>
            </div>
          ) ) }
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800 xl:w-96">
              <Search size={ 18 } className="text-blue-500" />
              <input
                value={ search }
                onChange={ ( event ) => setSearch( event.target.value ) }
                placeholder="Search tickets..."
                className="w-full bg-transparent outline-none dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              { filters.map( ( item ) => (
                <button
                  key={ item }
                  type="button"
                  onClick={ () => setFilter( item ) }
                  className={ `cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition ${ filter === item
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 text-blue-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700"
                    }` }
                >
                  { item }
                </button>
              ) ) }
            </div>
          </div>
        </section>

        { filteredTickets.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <MessageCircle className="mx-auto text-blue-500" size={ 42 } />
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              No support tickets found
            </h2>
            <p className="mt-2 text-blue-600 dark:text-blue-300">
              New user support requests will appear here.
            </p>
          </section>
        ) : (
          <section className="grid gap-4 xl:grid-cols-2">
            { filteredTickets.map( ( ticket ) => (
              <button
                key={ ticket.id }
                type="button"
                onClick={ () => setSelectedTicket( ticket ) }
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                      { ticket.id }
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      { ticket.subject }
                    </h2>
                  </div>

                  <StatusBadge status={ ticket.status as any } />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">User</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      { ticket.userName }
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Category</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      { ticket.category }
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Messages</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      { ticket.messages.length }
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Created</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      { ticket.createdAt }
                    </p>
                  </div>
                </div>
              </button>
            ) ) }
          </section>
        ) }
      </div>

      { selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  { selectedTicket.subject }
                </h2>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  { selectedTicket.userName } · { selectedTicket.category }
                </p>
              </div>

              <button
                onClick={ () => setSelectedTicket( null ) }
                className="cursor-pointer rounded-full bg-slate-100 p-2 dark:bg-slate-800"
              >
                <X />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
              { ( [ "Open", "Pending", "Urgent", "Closed" ] as SupportStatus[] ).map(
                ( status ) => (
                  <button
                    key={ status }
                    type="button"
                    onClick={ () => changeStatus( status ) }
                    className={ `cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition ${ selectedTicket.status === status
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-blue-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-blue-300"
                      }` }
                  >
                    { status }
                  </button>
                )
              ) }
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              { selectedTicket.messages.map( ( item ) => {
                const admin = item.senderRole === "ADMIN";

                return (
                  <div
                    key={ item.id }
                    className={ `flex ${ admin ? "justify-end" : "justify-start"
                      }` }
                  >
                    <div
                      className={ `max-w-[80%] rounded-2xl p-4 ${ admin
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                        }` }
                    >
                      <p className="text-sm">{ item.message }</p>
                      <p className="mt-2 text-xs opacity-70">
                        { item.senderName } · { item.createdAt }
                      </p>
                    </div>
                  </div>
                );
              } ) }
            </div>

            { selectedTicket.status !== "Closed" && (
              <div className="flex gap-3 border-t border-slate-200 p-4 dark:border-slate-800">
                <input
                  value={ reply }
                  onChange={ ( event ) => setReply( event.target.value ) }
                  placeholder="Reply to user..."
                  className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <button
                  type="button"
                  onClick={ sendReply }
                  disabled={ !reply.trim() }
                  className={ `rounded-2xl px-5 text-white ${ reply.trim()
                      ? "cursor-pointer bg-blue-500 hover:bg-blue-600"
                      : "cursor-not-allowed bg-blue-500/40"
                    }` }
                >
                  <Send size={ 18 } />
                </button>
              </div>
            ) }

            { selectedTicket.status !== "Closed" && (
              <button
                type="button"
                onClick={ () => changeStatus( "Closed" ) }
                className="m-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white hover:bg-emerald-600"
              >
                <CheckCircle size={ 18 } />
                Close Ticket
              </button>
            ) }
          </div>
        </div>
      ) }
    </>
  );
};

export default AdminSupportPage;