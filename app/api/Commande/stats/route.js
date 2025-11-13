import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  // Total commandes
  const total = await prisma.commande.count();

  // Group by productId
  const commandesByProduct = await prisma.commande.groupBy({
    by: ["productId"],
    _count: {
      productId: true,
    },
  });

  // Fetch product titles
  const productTitles = await prisma.product.findMany({
    where: {
      id: { in: commandesByProduct.map((c) => c.productId) },
    },
    select: {
      id: true,
      title: true,
    },
  });

  // Merge product count + titles
  const commandesWithTitles = commandesByProduct.map((item) => {
    const product = productTitles.find((p) => p.id === item.productId);
    return {
      title: product.title || "Unknown",
      count: item._count.productId,
    };
  });

  // Group commandes by client country
  const commandes = await prisma.commande.findMany({
    include: { compte: true },
  });
  const commandesByCountrys = commandes.reduce((acc, cmd) => {
    const country = cmd.compte.country || "Unknown";
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  const commandesByCountry = Object.entries(commandesByCountrys).map(
    ([region, _count]) => ({
      region,
      _count,
    })
  );

  return Response.json({
    totalCommandes: total,
    commandesByCountry,
    commandesWithTitles,
  });
}
