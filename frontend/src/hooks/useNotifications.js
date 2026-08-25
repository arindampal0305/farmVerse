import { useState, useEffect } from 'react';

const STORAGE_KEY = "farmverse_notifications";

export const useNotifications = () => {
  // Load initial notifications from localStorage
  const getStoredNotifications = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }
    return [];
  };

  const [notifications, setNotifications] = useState(getStoredNotifications);

  // Sync state when storage updates via custom event
  useEffect(() => {
    const handleUpdate = () => {
      setNotifications(getStoredNotifications());
    };

    window.addEventListener("farmverse_notif_update", handleUpdate);
    return () => {
      window.removeEventListener("farmverse_notif_update", handleUpdate);
    };
  }, []);

  const saveAndBroadcast = (newNotifs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotifs));
    setNotifications(newNotifs);
    window.dispatchEvent(new Event("farmverse_notif_update"));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveAndBroadcast(updated);
  };

  const clearAll = () => {
    saveAndBroadcast([]);
  };

  const addNotification = (message, type) => {
    const newNotification = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      message,
      type,
      read: false,
      time: new Date().toISOString(),
    };
    const updated = [newNotification, ...notifications];
    saveAndBroadcast(updated);
  };

  return { notifications, unreadCount, markAllAsRead, clearAll, addNotification };
};
