import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const commande = await prisma.commande.findUnique({
    where: { id: Number(params.id) },
    include: { product: true },
  });
  return Response.json(commande);
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    const updated = await prisma.commande.update({
      where: { id: Number(params.id) },
      data: {
        status: body.status, // 👉 only status updated
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error("PUT /api/Commande error:", error);
    return Response.json(
      { error: "Failed to update commande" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await prisma.commande.delete({
    where: { id: Number(params.id) },
  });
  return Response.json({ success: true });
}
