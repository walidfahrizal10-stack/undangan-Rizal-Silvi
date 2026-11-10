export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  sentAt: string;
}

export type FormFeedback = {
  kind: "success" | "error" | "info";
  message: string;
};