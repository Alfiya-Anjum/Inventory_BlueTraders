import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productName, company, productNumber, basePrice, discount, gstPercentage } = req.body;

    const discountedPrice = basePrice - discount;
    const gstAmount = (discountedPrice * gstPercentage) / 100;
    const totalPrice = discountedPrice + gstAmount;

    try {
      const sale = await prisma.sale.create({
        data: {
          productName,
          company,
          productNumber,
          basePrice,
          discount,
          gstPercentage,
          totalPrice,
        },
      });

      return res.status(201).json(sale);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create sale' });
    }
  } else if (req.method === 'GET') {
    try {
      const sales = await prisma.sale.findMany();
      return res.status(200).json(sales);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch sales' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
