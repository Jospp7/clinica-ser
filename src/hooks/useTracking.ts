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
    (async () => {
      try {
        const { error } = await supabase.from("page_events").insert({
          event_type: "pageview",
          page: window.location.pathname,
          metadata: { session_id: getSessionId() },
        });
        if (error) console.error("[tracking] pageview insert failed:", error);
      } catch (err) {
        console.error("[tracking] pageview threw:", err);
      }
    })();
  }, []);
}

export function trackCTAClick(element: string) {
  (async () => {
    try {
      const { error } = await supabase.from("page_events").insert({
        event_type: "cta_click",
        label: element,
        page: window.location.pathname,
        metadata: { session_id: getSessionId() },
      });
      if (error) console.error("[tracking] cta_click insert failed:", error);
    } catch (err) {
      console.error("[tracking] cta_click threw:", err);
    }
  })();
}
