import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ POST endpoint to add a new sale
app.post('/api/sales', async (req, res) => {
  const { productName, company, productNumber, basePrice, discount, gstPercentage } = req.body;

  const discountedPrice = basePrice - (discount || 0);
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
        totalPrice
      }
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create sale' });
  }
});

// ✅ GET endpoint to fetch all sales
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await prisma.sale.findMany();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

// ✅ Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
