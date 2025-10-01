import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.menu.deleteMany({});
  await prisma.tree.deleteMany({});

  console.log('Cleared existing data');

  // Create Tree 1: System Management
  const tree1 = await prisma.tree.create({
    data: {
      treeName: 'System Management',
    },
  });

  console.log(`Created tree: ${tree1.treeName} (${tree1.treeId})`);

  // Level 0: Root - System Management
  const systemManagement = await prisma.menu.create({
    data: {
      name: 'System Management',
      depth: 0,
      parentId: null,
      treeId: tree1.treeId,
    },
  });

  // Level 1: Main Sections
  const systems = await prisma.menu.create({
    data: {
      name: 'Systems',
      depth: 1,
      parentId: systemManagement.id,
      treeId: tree1.treeId,
    },
  });

  const usersAndGroups = await prisma.menu.create({
    data: {
      name: 'Users & Groups',
      depth: 1,
      parentId: systemManagement.id,
      treeId: tree1.treeId,
    },
  });

  // Level 2: Systems Sub-sections
  const systemCode = await prisma.menu.create({
    data: {
      name: 'System Code',
      depth: 2,
      parentId: systems.id,
      treeId: tree1.treeId,
    },
  });

  const properties = await prisma.menu.create({
    data: {
      name: 'Properties',
      depth: 2,
      parentId: systems.id,
      treeId: tree1.treeId,
    },
  });

  const menus = await prisma.menu.create({
    data: {
      name: 'Menus',
      depth: 2,
      parentId: systems.id,
      treeId: tree1.treeId,
    },
  });

  const apiList = await prisma.menu.create({
    data: {
      name: 'API List',
      depth: 2,
      parentId: systems.id,
      treeId: tree1.treeId,
    },
  });

  // Level 3: System Code Sub-items
  await prisma.menu.create({
    data: {
      name: 'Code Registration',
      depth: 3,
      parentId: systemCode.id,
      treeId: tree1.treeId,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'Code Registration - 2',
      depth: 3,
      parentId: systemCode.id,
      treeId: tree1.treeId,
    },
  });

  // Level 3: Menus Sub-items
  await prisma.menu.create({
    data: {
      name: 'Menu Registration',
      depth: 3,
      parentId: menus.id,
      treeId: tree1.treeId,
    },
  });

  // Level 3: API List Sub-items
  await prisma.menu.create({
    data: {
      name: 'API Registration',
      depth: 3,
      parentId: apiList.id,
      treeId: tree1.treeId,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'API Edit',
      depth: 3,
      parentId: apiList.id,
      treeId: tree1.treeId,
    },
  });

  // Level 2: Users & Groups Sub-sections
  const users = await prisma.menu.create({
    data: {
      name: 'Users',
      depth: 2,
      parentId: usersAndGroups.id,
      treeId: tree1.treeId,
    },
  });

  const groups = await prisma.menu.create({
    data: {
      name: 'Groups',
      depth: 2,
      parentId: usersAndGroups.id,
      treeId: tree1.treeId,
    },
  });

  const userApproval = await prisma.menu.create({
    data: {
      name: '사용자 승인',
      depth: 2,
      parentId: usersAndGroups.id,
      treeId: tree1.treeId,
    },
  });

  // Level 3: Users Sub-items
  await prisma.menu.create({
    data: {
      name: 'User Account Registration',
      depth: 3,
      parentId: users.id,
      treeId: tree1.treeId,
    },
  });

  // Level 3: Groups Sub-items
  await prisma.menu.create({
    data: {
      name: 'User Group Registration',
      depth: 3,
      parentId: groups.id,
      treeId: tree1.treeId,
    },
  });

  // Level 3: User Approval Sub-items
  await prisma.menu.create({
    data: {
      name: '사용자 승인 상세',
      depth: 3,
      parentId: userApproval.id,
      treeId: tree1.treeId,
    },
  });

  console.log(`Created ${19} menus for ${tree1.treeName}`);

  // Create Tree 2: Main Navigation
  const tree2 = await prisma.tree.create({
    data: {
      treeName: 'Main Navigation',
    },
  });

  console.log(`Created tree: ${tree2.treeName} (${tree2.treeId})`);

  const home = await prisma.menu.create({
    data: {
      name: 'Home',
      depth: 0,
      treeId: tree2.treeId,
    },
  });

  const products = await prisma.menu.create({
    data: {
      name: 'Products',
      depth: 0,
      treeId: tree2.treeId,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'Electronics',
      depth: 1,
      parentId: products.id,
      treeId: tree2.treeId,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'Clothing',
      depth: 1,
      parentId: products.id,
      treeId: tree2.treeId,
    },
  });

  console.log(`Created ${4} menus for ${tree2.treeName}`);

  // Create Tree 3: Footer Navigation
  const tree3 = await prisma.tree.create({
    data: {
      treeName: 'Footer Navigation',
    },
  });

  console.log(`Created tree: ${tree3.treeName} (${tree3.treeId})`);

  const company = await prisma.menu.create({
    data: {
      name: 'Company',
      depth: 0,
      treeId: tree3.treeId,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'About Us',
      depth: 1,
      parentId: company.id,
      treeId: tree3.treeId,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'Contact',
      depth: 1,
      parentId: company.id,
      treeId: tree3.treeId,
    },
  });

  console.log(`Created ${3} menus for ${tree3.treeName}`);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
