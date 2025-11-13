import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET — Fetch all commandes with product and compte info
export async function GET() {
  try {
    const commandes = await prisma.commande.findMany({
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

// ✅ POST — Create new commande
export async function POST(req) {
  try {
    const body = await req.json();

    if (
      !body.adresse ||
      !body.emballage ||
      !body.quantite ||
      !body.productId ||
      !body.compteId
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const commande = await prisma.commande.create({
      data: {
        adresse: body.adresse,
        emballage: body.emballage,
        quantite: parseInt(body.quantite),
        status: body.status || false,
        product: { connect: { id: parseInt(body.productId) } },
        compte: { connect: { id: parseInt(body.compteId) } },
      },
      include: {
        product: true,
        compte: true,
      },
    });

    return Response.json(commande);
  } catch (error) {
    console.error("POST /api/commandes error:", error);
    return Response.json(
      { error: "Failed to create commande" },
      { status: 500 }
    );
  }
}

// ✅ PUT — Update a commande
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, adresse, emballage, quantite, status, productId, compteId } =
      body;

    if (!id) {
      return Response.json(
        { error: "Commande ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.commande.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existing) {
      return Response.json({ error: "Commande not found" }, { status: 404 });
    }

    const updatedCommande = await prisma.commande.update({
      where: { id: parseInt(id) },
      data: {
        adresse: adresse !== undefined ? adresse : existing.adresse,
        emballage: emballage !== undefined ? emballage : existing.emballage,
        quantite:
          quantite !== undefined ? parseInt(quantite) : existing.quantite,
        status: status !== undefined ? status : existing.status,
        productId:
          productId !== undefined ? parseInt(productId) : existing.productId,
        compteId:
          compteId !== undefined ? parseInt(compteId) : existing.compteId,
      },
      include: {
        product: true,
        compte: true,
      },
    });

    return Response.json({
      message: "Commande updated successfully",
      commande: updatedCommande,
    });
  } catch (error) {
    console.error("PUT /api/commandes error:", error);
    return Response.json(
      { error: "Failed to update commande" },
      { status: 500 }
    );
  }
}

// ✅ DELETE — Delete a commande by ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));

    if (!id) {
      return Response.json(
        { error: "Commande ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.commande.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Commande not found" }, { status: 404 });
    }

    await prisma.commande.delete({ where: { id } });

    return Response.json({ message: "Commande deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/commandes error:", error);
    return Response.json(
      { error: "Failed to delete commande" },
      { status: 500 }
    );
  }
}
