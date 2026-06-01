import { NextResponse } from "next/server";
import { createClient } from "@psicare/db/server";
import { createCheckout } from "@psicare/billing";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json();
  const result = await createCheckout({
    organization_id: body.organization_id,
    plan_id: "pro",
    ciclo: body.ciclo,
    payer_email: user.email!,
  });

  return NextResponse.json(result);
}
