import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (process.env.CONTACT_FORM_ENABLED !== 'true' || !process.env.DATABASE_URL) {
    return Response.json({ error: 'El formulario de contacto todavía no está disponible.' }, { status: 503 });
  }
  try {
    const { db } = await import('@/db');
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || name.length < 2) {
      return Response.json({ error: "Indica un nombre válido." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Indica un correo electrónico válido." }, { status: 400 });
    }
    if (!subject || subject.length < 3) {
      return Response.json({ error: "Indica un asunto válido." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return Response.json(
        { error: "El mensaje debe tener al menos 10 caracteres." },
        { status: 400 },
      );
    }

    await db.insert(contactMessages).values({ name, email, subject, message });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Error al guardar el mensaje de contacto", error);
    return Response.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde." },
      { status: 500 },
    );
  }
}
