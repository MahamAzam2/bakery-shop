import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@bakery.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@bakery.com', password: adminPassword, role: 'ADMIN' },
  });

  // Seed products
  const products = [
    { name: 'Sourdough Loaf', description: 'Classic tangy sourdough with a crispy crust.', price: 8.99, image: '🍞', category: 'bread', stock: 20, rating: 4.9 },
    { name: 'Baguette', description: 'Traditional French baguette, baked fresh daily.', price: 3.99, image: '🥖', category: 'bread', stock: 30, rating: 4.7 },
    { name: 'Whole Wheat Loaf', description: 'Hearty whole wheat bread packed with fiber.', price: 6.99, image: '🍞', category: 'bread', stock: 15, rating: 4.5 },
    { name: 'Butter Croissant', description: 'Flaky, buttery croissant made with pure butter.', price: 3.49, image: '🥐', category: 'pastries', stock: 25, rating: 4.8 },
    { name: 'Cinnamon Roll', description: 'Soft roll with cinnamon sugar and cream cheese frosting.', price: 4.99, image: '🌀', category: 'pastries', stock: 18, rating: 4.7 },
    { name: 'Blueberry Muffin', description: 'Moist muffin bursting with fresh blueberries.', price: 3.29, image: '🫐', category: 'pastries', stock: 22, rating: 4.6 },
    { name: 'Chocolate Cake', description: 'Rich triple-layer chocolate cake with ganache.', price: 34.99, image: '🎂', category: 'cakes', stock: 5, rating: 5.0 },
    { name: 'Strawberry Shortcake', description: 'Light sponge with fresh strawberries and cream.', price: 28.99, image: '🍰', category: 'cakes', stock: 6, rating: 4.8 },
    { name: 'Lemon Drizzle Cake', description: 'Zesty lemon cake with a sweet glaze.', price: 24.99, image: '🍋', category: 'cakes', stock: 8, rating: 4.7 },
  ];

  for (const p of products) {
    const id = p.name.toLowerCase().replace(/ /g, '-');
    await prisma.product.upsert({
      where: { id },
      update: {},
      create: { id, ...p as any },
    });
  }

  console.log('✅ Database seeded!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
