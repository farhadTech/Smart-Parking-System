import { MessageCircle, Plus, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Topbar from "../../components/layout/Topbar";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../features/auth/AuthContext";

import {
  addSupportMessage,
  getSupportTickets,
  saveSupportTicket,
} from "../../services/support.storage";

import type {
  SupportCategory,
  SupportTicket,
} from "../../types/support.types";

import {
  buttonStyle,
  cardStyle,
  clickableCardStyle,
  inputStyle,
  mutedTextStyle,
  pageStyle,
  titleStyle,
} from "../../styles/theme";

const categories: SupportCategory[] = [
  "Booking",
  "Payment",
  "Parking",
  "Account",
  "Emergency",
  "Other",
];

const UserSupportPage = () => {
  const { user } = useAuth();

  const [ tickets, setTickets ] = useState<SupportTicket[]>( [] );
  const [ selectedTicket, setSelectedTicket ] = useState<SupportTicket | null>(
    null
  );

  const [ showCreateModal, setShowCreateModal ] = useState( false );
  const [ subject, setSubject ] = useState( "" );
  const [ category, setCategory ] = useState<SupportCategory>( "Booking" );
  const [ message, setMessage ] = useState( "" );
  const [ reply, setReply ] = useState( "" );

  const loadTickets = () => {
    const allTickets = getSupportTickets();

    setTickets(
      allTickets.filter( ( ticket ) => ticket.userEmail === user?.email )
    );
  };

  useEffect( () => {
    loadTickets();
  }, [] );

  const createTicket = () => {
    if ( !subject.trim() || !message.trim() ) return;

    const ticket: SupportTicket = {
      id: `SUP-${ Date.now() }`,
      subject,
      category,
      status: "Open",
      userName: user?.name || "Demo User",
      userEmail: user?.email || "user@example.com",
      createdAt: new Date().toLocaleString(),
      messages: [
        {
          id: `MSG-${ Date.now() }`,
          senderRole: "USER",
          senderName: user?.name || "Demo User",
          message,
          createdAt: new Date().toLocaleString(),
        },
      ],
    };

    saveSupportTicket( ticket );
    toast.success( "Support ticket created" );

    setSubject( "" );
    setMessage( "" );
    setCategory( "Booking" );
    setShowCreateModal( false );
    loadTickets();
  };

  const sendReply = () => {
    if ( !selectedTicket || !reply.trim() ) return;

    addSupportMessage( selectedTicket.id, {
      id: `MSG-${ Date.now() }`,
      senderRole: "USER",
      senderName: user?.name || "Demo User",
      message: reply,
      createdAt: new Date().toLocaleString(),
    } );

    toast.success( "Message sent" );

    setReply( "" );
    loadTickets();

    const updatedTicket = getSupportTickets().find(
      ( ticket ) => ticket.id === selectedTicket.id
    );

    setSelectedTicket( updatedTicket || null );
  };

  return (
    <>
      <Topbar title="Support" />

      <div className={ pageStyle }>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={ `text-3xl font-bold ${ titleStyle }` }>
              Customer Support
            </h1>

            <p className={ `mt-2 ${ mutedTextStyle }` }>
              Create tickets and chat with support
            </p>
          </div>

          <button
            type="button"
            onClick={ () => setShowCreateModal( true ) }
            className={ `flex w-full items-center justify-center gap-2 sm:w-fit ${ buttonStyle }` }
          >
            <Plus size={ 18 } />
            New Ticket
          </button>
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
              "Closed",
              tickets.filter( ( ticket ) => ticket.status === "Closed" ).length,
              "text-red-500",
            ],
          ].map( ( [ label, value, color ] ) => (
            <div
              key={ label }
              className={ `${ clickableCardStyle } p-6 text-center` }
            >
              <p className={ `text-3xl font-bold ${ color }` }>{ value }</p>
              <p className={ `text-sm ${ mutedTextStyle }` }>{ label }</p>
            </div>
          ) ) }
        </section>

        { tickets.length === 0 ? (
          <section className={ `${ cardStyle } p-10 text-center` }>
            <MessageCircle className="mx-auto text-blue-500" size={ 42 } />

            <h2 className={ `mt-4 text-2xl font-bold ${ titleStyle }` }>
              No support tickets yet
            </h2>

            <p className={ `mt-2 ${ mutedTextStyle }` }>
              Create a ticket if you need help with booking, payment, or
              parking.
            </p>
          </section>
        ) : (
          <section className="grid gap-4 lg:grid-cols-2">
            { tickets.map( ( ticket ) => (
              <button
                key={ ticket.id }
                type="button"
                onClick={ () => setSelectedTicket( ticket ) }
                className={ `${ clickableCardStyle } p-5 text-left` }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                      { ticket.id }
                    </p>

                    <h2 className={ `mt-1 text-lg font-bold ${ titleStyle }` }>
                      { ticket.subject }
                    </h2>
                  </div>

                  <StatusBadge status={ ticket.status as any } />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Category
                    </p>

                    <p className={ `font-semibold ${ titleStyle }` }>
                      { ticket.category }
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Messages
                    </p>

                    <p className={ `font-semibold ${ titleStyle }` }>
                      { ticket.messages.length }
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Created: { ticket.createdAt }
                </p>
              </button>
            ) ) }
          </section>
        ) }
      </div>

      { showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl animate-in fade-in zoom-in rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl duration-300 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className={ `text-2xl font-bold ${ titleStyle }` }>
                Create Support Ticket
              </h2>

              <button
                type="button"
                onClick={ () => setShowCreateModal( false ) }
                className="cursor-pointer rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={ subject }
                onChange={ ( event ) => setSubject( event.target.value ) }
                placeholder="Subject"
                className={ inputStyle }
              />

              <select
                value={ category }
                onChange={ ( event ) =>
                  setCategory( event.target.value as SupportCategory )
                }
                className={ inputStyle }
              >
                { categories.map( ( item ) => (
                  <option key={ item }>{ item }</option>
                ) ) }
              </select>

              <textarea
                value={ message }
                onChange={ ( event ) => setMessage( event.target.value ) }
                placeholder="Describe your issue..."
                rows={ 5 }
                className={ inputStyle }
              />
            </div>

            <button
              type="button"
              onClick={ createTicket }
              disabled={ !subject.trim() || !message.trim() }
              className={ `mt-6 w-full rounded-2xl py-3 font-bold text-white transition-all duration-300 ${ subject.trim() && message.trim()
                  ? "cursor-pointer bg-blue-500 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
                  : "cursor-not-allowed bg-blue-500/40"
                }` }
            >
              Create Ticket
            </button>
          </div>
        </div>
      ) }

      { selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl animate-in fade-in zoom-in flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl duration-300 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <div>
                <h2 className={ `text-xl font-bold ${ titleStyle }` }>
                  { selectedTicket.subject }
                </h2>

                <p className="text-sm text-blue-600 dark:text-blue-300">
                  { selectedTicket.id } · { selectedTicket.category }
                </p>
              </div>

              <button
                type="button"
                onClick={ () => setSelectedTicket( null ) }
                className="cursor-pointer rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
              >
                <X />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              { selectedTicket.messages.map( ( item ) => {
                const mine = item.senderRole === "USER";

                return (
                  <div
                    key={ item.id }
                    className={ `flex ${ mine ? "justify-end" : "justify-start" }` }
                  >
                    <div
                      className={ `max-w-[80%] rounded-2xl p-4 ${ mine
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
                  placeholder="Type your message..."
                  className={ `${ inputStyle } flex-1` }
                />

                <button
                  type="button"
                  onClick={ sendReply }
                  disabled={ !reply.trim() }
                  className={ `rounded-2xl px-5 text-white transition-all duration-300 ${ reply.trim()
                      ? "cursor-pointer bg-blue-500 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
                      : "cursor-not-allowed bg-blue-500/40"
                    }` }
                >
                  <Send size={ 18 } />
                </button>
              </div>
            ) }
          </div>
        </div>
      ) }
    </>
  );
};

export default UserSupportPage;