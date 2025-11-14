import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // Get email from query

    // ❗ Email is required
    if (!email) {
      return Response.json(
        { error: "Email is required to fetch commandes." },
        { status: 400 }
      );
    }

    const commandes = await prisma.commande.findMany({
      where: {
        compte: {
          email: email, // Always filter by email
        },
      },
      include: {
        product: true,
        compte: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            country: true,
          },
        },
      },
      orderBy: { Date: "desc" },
    });

    return Response.json(commandes);
  } catch (error) {
    console.error("GET /api/commandes error:", error);
    return Response.json(
      { error: "Failed to fetch commandes" },
      { status: 500 }
    );
  }
}
