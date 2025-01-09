const { prisma } = require('./common');
const { faker } = require('@faker-js/faker');

const seed = async (numUsers = 3, numPlaylists = 5) => {
  for (let i = 0; i < numUsers; i++) {
    try {
      const user = await prisma.user.create({
        data: {
          username: faker.internet.username(),
          playlists: {
            create: Array.from({ length: numPlaylists }, () => ({
              name: faker.music.artist(),
              description: faker.lorem.sentences(),
            })),
          },
        },
      });
      console.log('Seeded to database');
    } catch (error) {
      console.error(error);
    }
  }
};

seed();
