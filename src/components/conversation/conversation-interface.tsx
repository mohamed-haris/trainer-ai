"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send, X, Paperclip, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent, Message, currentUser } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ConversationInterfaceProps {
  agent: Agent;
  initialMessages?: Message[];
  onSessionEnd?: () => void;
  mode?: "training" | "evaluation" | "quick-prep";
}

export function ConversationInterface({
  agent,
  initialMessages = [],
  onSessionEnd,
  mode = "training",
}: ConversationInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMicAvailable, setIsMicAvailable] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Check if microphone is available
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsMicAvailable(true);
      })
      .catch(() => {
        setIsMicAvailable(false);
      });

    // If no initial messages, generate a greeting from the agent
    if (initialMessages.length === 0) {
      const greeting = generateAgentGreeting();
      setMessages([greeting]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  // Mock function to generate agent greeting based on agent type
  const generateAgentGreeting = (): Message => {
    let content = "";
    if (agent.type === "training") {
      content = `Hello! I'm your ${agent.name}. I'm here to help you learn and practice. What would you like to start with today?`;
    } else if (agent.type === "evaluation") {
      content = `Welcome to your evaluation session. I'll be assessing your knowledge and skills in ${agent.industry}. Are you ready to begin?`;
    } else {
      content = `Hi there! I'm your ${agent.name}. How can I assist you today?`;
    }
  
    return {
      id: `msg_${Date.now()}`,
      sender: "agent",
      content,
      timestamp: new Date().toISOString(),
      sessionId: "session_current",
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleRecording = () => {
    if (!isMicAvailable) return;
    setIsRecording(!isRecording);
    // In a real app, this would start/stop speech recognition
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: "user",
      content: input,
      timestamp: new Date().toISOString(),
      sessionId: "session_current",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Focus back on input
    inputRef.current?.focus();

    // Simulate agent typing delay
    setTimeout(() => {
      const agentResponse = generateAgentResponse(input);
      setMessages((prev) => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s
  };

  // Mock function to generate agent responses
  const generateAgentResponse = (userInput: string): Message => {
    // This would be replaced with actual AI responses in production
    const responses = [
      "That's a great point. Can you tell me more about that?",
      "I understand. In this situation, I'd recommend focusing on the customer's needs first.",
      "Excellent! That's exactly the right approach for this scenario.",
      "Let's think about this differently. What if we considered the problem from the customer's perspective?",
      "That's partially correct. However, remember that our company policy is to always verify identity before proceeding.",
      "Good question! This is something that comes up often in training. The best practice is to...",
    ];

    let responseText = "";

    // If user input contains a question mark, treat it as a question
    if (userInput.includes("?")) {
      responseText = "That's a great question. " + responses[Math.floor(Math.random() * responses.length)];
    } else if (userInput.length < 20) {
      // Short input gets a prompt for more details
      responseText = "Could you elaborate a bit more on that? " + responses[0];
    } else {
      // Regular response
      responseText = responses[Math.floor(Math.random() * responses.length)];
    }

    return {
      id: `msg_${Date.now()}`,
      sender: "agent",
      content: responseText,
      timestamp: new Date().toISOString(),
      sessionId: "session_current",
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="flex flex-col h-[80vh]">
      <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/images/agent-avatar.png" alt={agent.name} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{agent.type.charAt(0).toUpperCase() + agent.type.slice(1)} Agent</p>
          </div>
        </div>
        {mode !== "quick-prep" && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onSessionEnd}
          >
            End Session
          </Button>
        )}
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col max-w-[80%]",
                message.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === "agent" ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/agent-avatar.png" alt={agent.name} />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                ) : (
                  <span className="text-xs text-muted-foreground">You</span>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <div
                className={cn(
                  "rounded-lg px-4 py-2 mb-1",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start max-w-[80%] mr-auto">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/images/agent-avatar.png" alt={agent.name} />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-2 rounded-lg bg-muted px-4 py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t px-4 py-3">
        <div className="flex items-end gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="relative flex-grow">
            <Textarea
              ref={inputRef}
              placeholder="Type your message..."
              className="resize-none pr-10 min-h-[60px] max-h-[200px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute bottom-2 right-2"
              onClick={handleSendMessage}
              disabled={isTyping || input.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className="flex-shrink-0"
            onClick={handleToggleRecording}
            disabled={!isMicAvailable}
            title={isMicAvailable ? "Toggle microphone" : "Microphone not available"}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}