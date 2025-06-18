const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// board routes

// GET /boards/:boardId
router.get('/', async (req, res) => {
    const {category, title, recent} = req.query
    const query = {};       

    if (title || category) { 
        query.where = {};

        if (title) {
            query.where.title = {
                equals: title,       
                mode: 'insensitive'
            };
        }

        if (category) {
            query.where.category = category;   
        }
    }

    if (recent) {
        query.orderBy = { date: 'desc' };
        query.take = 6;
    }

    try {
        const boards = await prisma.board.findMany(query);   
        res.json(boards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch boards' });
    }
});

// GET /boards/:boardId
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId);

    try {
        const board = await prisma.board.findUnique({ where: { id: boardId } });

        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }

        res.json(board);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch board' });
    }
});

// POST /boards/new_board
router.post('/new_board', async (req, res) => {
  const { title, category, author } = req.body;


  if (!title || !category || !author) {
    return res.status(400).json({ error: 'title, category and author are required' });
  }

  try {
    const newBoard = await prisma.board.create({
      data: { title, category, author, date: new Date() }
    });
    res.status(201).json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// DELETE /boards/:boardId
router.delete('/:boardId', async (req, res) => {       
  const boardId = parseInt(req.params.boardId);

  try {
    const deletedBoard = await prisma.board.delete({
      where: { id: boardId }
    });
    res.json(deletedBoard);
  } catch (err) {
    console.error(err);

   
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.status(500).json({ error: 'Failed to delete board' });
  }
});

// card routes
// GET boards/:boardId/cards
router.get('/:boardId/cards', async (req, res) => {
  const boardId = parseInt(req.params.boardId);

  try {
    const cards = await prisma.card.findMany({
      where: { boardId },
      orderBy: { id: 'asc' }   
    });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to fetch cards');
  }
});

// POST boards/:boardId/cards
router.post('/:boardId/cards', async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const { title, description, gif_url, owner } = req.body;

  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        description,
        gif_url,
        owner,
        vote_cnt: 0,
        board: { connect: { id: boardId } }
    }
    });
    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to create card');
  }
});

// PATCH 
router.patch('/cards/:cardId/like', async (req, res) => {
  const cardId = parseInt(req.params.cardId, 10);
  const { increment, set } = req.body;   // choose ONE of these

  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: set !== undefined
        ? { vote_cnt: set }
        : { vote_cnt: { increment: increment ?? 1 } }
    });
    res.json(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to update like count');
  }
})

// DELETE boards/cards/:cardId
router.delete('/cards/:cardId', async (req, res) => {
  const cardId = parseInt(req.params.cardId, 10);

  try {
    const deletedCard = await prisma.card.delete({
      where: { id: cardId }
    });
    res.json(deletedCard);
  } catch (err) {
    console.error(err);
    res.status(400).send('Unable to delete card');
  }
});






module.exports = router