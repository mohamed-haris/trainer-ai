export interface Message {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
  sessionId: string;
}
