import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const churchBranchesData = [
  {
    name: "Bowenpally",
    country: "India",
    address: "# 42, 1st floor, Moksha Arcade,Soujanya Colony, New Bowenpally, Secunderabad",
    phone: "+91 988 555 0877",
    order: 0,
    services: [
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "Telugu Service",
        time: "8:00 AM IST",
        location: "Main Sanctuary"
      },
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "English Service",
        time: "10:00 AM IST",
        location: "Main Sanctuary"
      }
    ]
  },
  {
    name: "Hi-tech City",
    country: "India",
    address: "1st floor, A*Heights, Cyber Tower Road, Khanamet, Hyd, TG-82.",
    phone: "+91 99890 99890",
    order: 1,
    services: [
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "Telugu Service",
        time: "8:00 AM IST",
        location: "Main Sanctuary"
      },
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "English Service",
        time: "10:00 AM IST",
        location: "Main Sanctuary"
      }
    ]
  },
  {
    name: "Vikrampuri",
    country: "India",
    address: "11-B, Vikrampuri Colony, Karkhana, Secunderabad, TG-15",
    phone: "+91 99890 99890",
    order: 2,
    services: [
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "Hindi Service",
        time: "8:00 AM IST",
        location: "Main Sanctuary"
      },
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "English Service",
        time: "10:30 AM IST",
        location: "Main Sanctuary"
      }
    ]
  },
  {
    name: "Bangalore",
    country: "India",
    address: "2nd floor, No 8, 80 feet road, Above Dominios, RT Nagar, Bangalore, Karnataka",
    phone: "+91 99890 99890",
    order: 3,
    services: [
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "English Service",
        time: "10:00 AM IST",
        location: "Main Sanctuary"
      }
    ]
  },
  {
    name: "Tumsar",
    country: "India",
    address: "Tumsar, Maharashtra, India",
    phone: "+91 99890 99890",
    order: 4,
    services: [
      {
        day: "Sunday",
        type: "In-Person",
        serviceType: "Hindi Service",
        time: "9 AM IST",
        location: "Tumsar Church"
      }
    ]
  },
  {
    name: "Singapore",
    country: "Singapore",
    address: "Online Service",
    phone: "+65 99890 99890",
    order: 5,
    services: [
      {
        day: "Sunday",
        type: "Online",
        time: "9 AM SG",
        location: "Zoom",
        link: "https://zoom.us/j/123456789"
      }
    ]
  },
  {
    name: "City Harvest AG Church",
    country: "USA",
    address: "Online Service",
    phone: "+1 973 905 0486",
    order: 6,
    services: [
      {
        day: "Sunday",
        type: "Online",
        time: "9 AM EST",
        location: "Zoom",
        link: "https://zoom.us/j/123456789"
      }
    ]
  }
];

async function migrateChurchBranches() {
  console.log('Starting church branches migration...');
  
  try {
    // Clear existing data
    await prisma.service.deleteMany({});
    await prisma.churchBranch.deleteMany({});
    
    // Insert new data
    for (const branchData of churchBranchesData) {
      const branch = await prisma.churchBranch.create({
        data: {
          name: branchData.name,
          country: branchData.country,
          address: branchData.address,
          phone: branchData.phone,
          order: branchData.order,
          services: {
            create: branchData.services || []
          }
        },
        include: {
          services: true
        }
      });
      
      console.log(`Created branch: ${branch.name} with ${branch.services.length} services`);
    }
    
    console.log('Church branches migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateChurchBranches();
