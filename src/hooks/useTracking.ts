import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

function getSessionId(): string {
  let sid = sessionStorage.getItem("ser_session");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("ser_session", sid);
  }
  return sid;
}

export function usePageView() {
  useEffect(() => {
    supabase.from("page_events").insert({
      event_type: "pageview",
      page: window.location.pathname,
      session_id: getSessionId(),
    }).then(() => {});
  }, []);
}

export function trackCTAClick(element: string) {
  supabase.from("page_events").insert({
    event_type: "cta_click",
    element,
    page: window.location.pathname,
    session_id: getSessionId(),
  }).then(() => {});
}
