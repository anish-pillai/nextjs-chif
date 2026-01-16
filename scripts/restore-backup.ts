import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function restoreBackup() {
  try {
    console.log('Starting backup restoration...');

    // Read ChurchBranch data
    const churchBranchesPath = join(__dirname, '../src/app/backup/ChurchBranch.json');
    const churchBranchesData = JSON.parse(readFileSync(churchBranchesPath, 'utf-8'));
    
    // Read Service data
    const servicesPath = join(__dirname, '../src/app/backup/Service.json');
    const servicesData = JSON.parse(readFileSync(servicesPath, 'utf-8'));

    console.log(`Found ${churchBranchesData.length} church branches and ${servicesData.length} services to restore`);

    // Restore ChurchBranches using raw SQL for better control over IDs
    console.log('Restoring ChurchBranches...');
    for (const branch of churchBranchesData) {
      await prisma.$executeRaw`
        INSERT INTO "ChurchBranch" (id, name, address, country, phone, "isActive", "order", "createdAt", "updatedAt")
        VALUES (
          ${branch.id},
          ${branch.name},
          ${branch.address},
          ${branch.country},
          ${branch.phone},
          ${branch.isActive},
          ${branch.order},
          ${branch.createdAt},
          ${branch.updatedAt}
        )
        ON CONFLICT (id) DO UPDATE
        SET 
          name = ${branch.name},
          address = ${branch.address},
          country = ${branch.country},
          phone = ${branch.phone},
          "isActive" = ${branch.isActive},
          "order" = ${branch.order},
          "updatedAt" = ${branch.updatedAt}
        RETURNING *;
      `;
      console.log(`✓ Restored branch: ${branch.name}`);
    }

    // Restore Services using raw SQL for better control over IDs
    console.log('Restoring Services...');
    for (const service of servicesData) {
      await prisma.$executeRaw`
        INSERT INTO "Service" (id, day, type, "serviceType", time, location, link, "branchId", "createdAt", "updatedAt")
        VALUES (
          ${service.id},
          ${service.day},
          ${service.type},
          ${service.serviceType},
          ${service.time},
          ${service.location},
          ${service.link},
          ${service.branchId},
          ${service.createdAt},
          ${service.updatedAt}
        )
        ON CONFLICT (id) DO UPDATE
        SET 
          day = ${service.day},
          type = ${service.type},
          "serviceType" = ${service.serviceType},
          time = ${service.time},
          location = ${service.location},
          link = ${service.link},
          "branchId" = ${service.branchId},
          "updatedAt" = ${service.updatedAt}
        RETURNING *;
      `;
      console.log(`✓ Restored service: ${service.serviceType || service.type} on ${service.day}`);
    }

    console.log('✅ Backup restoration completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during backup restoration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the restore function
restoreBackup()
  .then(() => {
    console.log('Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
