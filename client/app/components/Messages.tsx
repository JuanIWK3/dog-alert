"use client";

import { useEffect, useState } from "react";

export const Messages = () => {
  useEffect(() => {
    const saveMessage = async () => {
      const res = await fetch("https://dog-alert-psi.vercel.app/api", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to save message");
      }

      return res.json();
    };
    // Replace 'YOUR_WEBSOCKET_SERVER_URL' with the actual URL of your WebSocket server
    const socketUrl = "wss://websocket-server-production-9ee7.up.railway.app";

    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = async (event) => {
      const message = event.data;
      console.log("Received Message:", message);

      // Trigger push notification
      if (Notification.permission === "granted") {
        const notification = new Notification("New Message", {
          body: message,
        });
      }

      // Save message to database
      const res = await saveMessage();
      console.log("Saved Message:", res);
      window.location.reload();
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
  }, []);

  // Request notification permission on component mount
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return <div></div>;
};
