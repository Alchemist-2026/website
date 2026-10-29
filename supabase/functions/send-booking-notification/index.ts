import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// Keep this origin aligned with the URL where your frontend runs.
// Add your production frontend origin here when deploying.
const allowedOrigins = new Set([
  "http://localhost:5173",
]);

const corsHeadersFor = (req: Request): Record<string, string> => {
  const origin = req.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin)
      ? origin
      : "http://localhost:5173",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      req.headers.get("Access-Control-Request-Headers") ??
      "authorization, apikey, x-client-info, content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
};

function jsonResponse(
  req: Request,
  data: Record<string, unknown>,
  status = 200,
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeadersFor(req),
      "Content-Type": "application/json",
    },
  });
}

interface BookingRequest {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
}

serve(async (req: Request) => {
  const corsHeaders = corsHeadersFor(req);

  // Respond to the browser preflight before doing auth, parsing, or other work.
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, {
      success: false,
      error: "Method not allowed",
    }, 405);
  }

  try {
    let booking: BookingRequest;

    try {
      booking = await req.json();
    } catch {
      return jsonResponse(req, {
        success: false,
        error: "Invalid JSON request body",
      }, 400);
    }

    const name = typeof booking.name === "string" ? booking.name.trim() : "";
    const phone = typeof booking.phone === "string" ? booking.phone.trim() : "";
    const date = typeof booking.date === "string" ? booking.date.trim() : "";
    const time = typeof booking.time === "string" ? booking.time.trim() : "";
    const guests = booking.guests;

    if (!name || !date || !time || guests == null) {
      return jsonResponse(req, {
        success: false,
        error: "Name, date, time and guests are required",
      }, 400);
    }

    if (
      name.length > 120 ||
      phone.length > 30 ||
      date.length > 30 ||
      time.length > 30
    ) {
      return jsonResponse(req, {
        success: false,
        error: "One or more fields are too long",
      }, 400);
    }

    if (
      typeof guests !== "number" ||
      !Number.isInteger(guests) ||
      guests < 1 ||
      guests > 100
    ) {
      return jsonResponse(req, {
        success: false,
        error: "Guests must be between 1 and 100",
      }, 400);
    }

    const email = typeof booking.email === "string" ? booking.email.trim() : "";
    if (email.length > 254) {
      return jsonResponse(req, {
        success: false,
        error: "Email is too long",
      }, 400);
    }

    const message = typeof booking.message === "string"
      ? booking.message.trim()
      : "";
    if (message.length > 2000) {
      return jsonResponse(req, {
        success: false,
        error: "Message is too long",
      }, 400);
    }

    const ntfyTopic = Deno.env.get("NTFY_TOPIC") || "Cafe-Reservation26";
    const ntfyServer = Deno.env.get("NTFY_SERVER_URL") || "https://ntfy.sh";

    const baseUrl = ntfyServer.replace(/\/+$/, "");

    const notification = [
      "New reservation received",
      "",
      `Name: ${name}`,
      `Phone: ${phone || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Guests: ${guests}`,
      `Message: ${message || "None"}`,
    ].join("\n");

    try {
      const notificationResponse = await fetch(
        `${baseUrl}/${encodeURIComponent(ntfyTopic)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Title": "New Cafe Reservation",
            "Priority": "high",
            "Tags": "bell",
          },
          body: notification,
          signal: AbortSignal.timeout(5000),
        },
      );

      if (!notificationResponse.ok) {
        const providerError = await notificationResponse.text();
        console.warn(
          "Ntfy request status:",
          notificationResponse.status,
          providerError.slice(0, 500),
        );
      }
    } catch (ntfyErr) {
      console.warn("Direct ntfy notification skipped/error (database trigger handles notification):", ntfyErr);
    }

    return jsonResponse(req, {
      success: true,
      message: "Reservation notification handled successfully",
    });
  } catch (error) {
    console.error(
      "Booking notification error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return jsonResponse(req, {
      success: false,
      error: "An unexpected error occurred while processing the request",
    }, 500);
  }
});
