import { NextResponse } from "next/server";
import { verifyWebhook } from "@psicare/billing";
import { createAdminClient } from "@psicare/db/server";
import { emit } from "@psicare/jobs";

export async function POST(req: Request) {
  const sig = req.headers.get("x-signature") ?? "";
  const body = await req.json();

  const ok = await verifyWebhook(body, sig);
  if (!ok) return NextResponse.json({ error: "invalid signature" }, { status: 401 });

  // STUB handler — when going live, parse Mercado Pago event types:
  // - payment.created → fetch payment + update subscription
  // - subscription.authorized / cancelled → update subscriptions table
  console.log("[MP Webhook]", body);

  const admin = createAdminClient();
  // Example minimal handling
  if (body.action === "payment.created" || body.type === "payment") {
    const paymentId = body.data?.id;
    if (paymentId) {
      // TODO: fetch payment details from MP API and upsert into payments table
      await emit({ type: "PAYMENT_RECEIVED", payload: { payment_id: paymentId, subscription_id: "" } });
    }
  }

  return NextResponse.json({ received: true });
}
