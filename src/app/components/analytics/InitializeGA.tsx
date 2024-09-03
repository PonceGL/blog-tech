"use client";
import { useEffect } from "react";
import { initializeGA } from "../../../utils/analytics/tagEvent";

export function InitializeGA() {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);
  return null;
}
