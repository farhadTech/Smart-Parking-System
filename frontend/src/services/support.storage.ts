import type { SupportMessage, SupportTicket } from "../types/support.types";

const SUPPORT_KEY = "smart_parking_support_tickets";

export const getSupportTickets = (): SupportTicket[] => {
  const data = localStorage.getItem( SUPPORT_KEY );

  if ( !data ) return [];

  try {
    return JSON.parse( data ) as SupportTicket[];
  } catch {
    return [];
  }
};

export const saveSupportTicket = ( ticket: SupportTicket ) => {
  const tickets = getSupportTickets();
  localStorage.setItem( SUPPORT_KEY, JSON.stringify( [ ticket, ...tickets ] ) );
};

export const addSupportMessage = (
  ticketId: string,
  message: SupportMessage
) => {
  const tickets = getSupportTickets().map( ( ticket ) =>
    ticket.id === ticketId
      ? {
        ...ticket,
        status:
          message.senderRole === "USER"
            ? ( "Pending" as const )
            : ( "Open" as const ),
        messages: [ ...ticket.messages, message ],
      }
      : ticket
  );

  localStorage.setItem( SUPPORT_KEY, JSON.stringify( tickets ) );
};

export const updateSupportTicketStatus = (
  ticketId: string,
  status: SupportTicket[ "status" ]
) => {
  const tickets = getSupportTickets().map( ( ticket ) =>
    ticket.id === ticketId
      ? {
        ...ticket,
        status,
      }
      : ticket
  );

  localStorage.setItem( SUPPORT_KEY, JSON.stringify( tickets ) );
};