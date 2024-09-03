"use client";

import { useEffect } from "react";
import { TagEventProps } from "../../../types/analytics";
import { tagEvent } from "../../../utils/analytics";

interface Props {
  event: TagEventProps;
}

export function Analytics({ event }: Props): JSX.Element {
  useEffect(() => {
    tagEvent(event);
  }, [event]);

  return <input type="hidden" name="analytics" />;
}
