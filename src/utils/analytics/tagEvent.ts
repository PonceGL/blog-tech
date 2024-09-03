"use client";

import ReactGA from "react-ga4";
import { TagEventProps } from "../../types/analytics";

export const initializeGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? "");
};

export function tagEvent({ action, category, label, params }: TagEventProps) {
  if (!window) return;
  const event = {
    action,
    category,
    label,
  };
  ReactGA.event(event, params);
}
