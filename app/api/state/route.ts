import { eq, sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { getChatGPTUser } from "../../chatgpt-auth";
import { userStates } from "../../../db/schema";

export const dynamic = "force-dynamic";

function unauthenticated() {
  return Response.json({ error: "Sign in is required." }, { status: 401 });
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return unauthenticated();
  const db = getDb();
  const [record] = await db.select({ stateJson: userStates.stateJson, updatedAt: userStates.updatedAt }).from(userStates).where(eq(userStates.userId, user.userId)).limit(1);
  let state: unknown = null;
  if (record?.stateJson) { try { state = JSON.parse(record.stateJson); } catch { state = null; } }
  return Response.json({ state, updatedAt: record?.updatedAt ?? null, user: { email: user.email, displayName: user.displayName } }, { headers: { "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return unauthenticated();
  let payload: { state?: unknown };
  try { payload = await request.json() as { state?: unknown }; }
  catch { return Response.json({ error: "Invalid data." }, { status: 400 }); }
  if (!payload.state || typeof payload.state !== "object" || Array.isArray(payload.state)) return Response.json({ error: "A tracker state is required." }, { status: 400 });
  const stateJson = JSON.stringify(payload.state);
  if (stateJson.length > 1_500_000) return Response.json({ error: "Tracker data is too large." }, { status: 413 });
  const db = getDb();
  await db.insert(userStates).values({ userId: user.userId, stateJson }).onConflictDoUpdate({ target: userStates.userId, set: { stateJson, updatedAt: sql`CURRENT_TIMESTAMP` } });
  return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
