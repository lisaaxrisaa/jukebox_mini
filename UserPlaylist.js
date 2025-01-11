const { express, prisma } = require('./common');
const router = express.Router();
module.exports = router;

// router.get('/', (req, res) => {
//   res.status(200).json({ message: 'this is a success' });
// });

router.get('/', async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        playlists: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: 'User not found.' });
  }
});

router.post('/:id/playlists', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const response = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerID: id,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});
