"use client";

import { useEffect, useState } from "react";

const IndexPage = () => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Replace 'YOUR_WEBSOCKET_SERVER_URL' with the actual URL of your WebSocket server
    const socketUrl = "wss://websocket-server-production-9ee7.up.railway.app";

    const ws = new WebSocket(socketUrl);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log("Received Message:", message);

      // Trigger push notification
      if (Notification.permission === "granted") {
        const notification = new Notification("New Message", {
          body: message,
        });
      }

      setMessages((messages) => [...messages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  // Request notification permission on component mount
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <div>
      <h1>Next.js WebSocket Example</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
