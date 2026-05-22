export type SupportCategory =
  | "Booking"
  | "Payment"
  | "Parking"
  | "Account"
  | "Emergency"
  | "Other";

export type SupportStatus = "Open" | "Pending" | "Closed" | "Urgent";

export type SupportMessage = {
  id: string;
  senderRole: "USER" | "ADMIN";
  senderName: string;
  message: string;
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  category: SupportCategory;
  status: SupportStatus;
  userName: string;
  userEmail: string;
  createdAt: string;
  messages: SupportMessage[];
};