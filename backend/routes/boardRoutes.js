const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// board routes

// GET /boards/
router.get('/boards', async (req, res) => {
    const {category, title, recent} = req.query
    const query = {};      
    console.log(query)

    if (title || category) { 
        query.where = {};

        if (title) {
            query.where.title = {
                contains: title,       
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
router.get('/boards/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    if (Number.isNaN(boardId)) {
        return res.status(400).json({ error: 'Invalid board id' });
    }

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
router.post('/boards/new_board', async (req, res) => {
  const { title, category, author } = req.body;

  if (!title || !category) {
    return res
      .status(400)
      .json({ error: 'title and category are required' });
  }

  const image = 'https://picsum.photos/200/200';

  try {
    const data = {
      title,
      category,
      image,
      date: new Date()
    };


  data.author = author || 'Anonymous';

  const newBoard = await prisma.board.create({ data });
    res.status(201).json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create board' });
  }
});


// DELETE /boards/:boardId  → board + its cards
router.delete('/boards/:boardId', async (req, res) => {
  const boardId = Number(req.params.boardId);

  if (Number.isNaN(boardId)) {
    return res.status(400).json({ error: 'Invalid board id' });
  }

  try {
    const deletedBoard = await prisma.$transaction(async (tx) => {
      // remove all cards that belong to this board
      await tx.card.deleteMany({ where: { boardId } });

      // now delete the board
      return tx.board.delete({ where: { id: boardId } });
    });

    res.json(deletedBoard);
  } catch (err) {
    console.error(err);

    // Board not found
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.status(500).json({ error: 'Failed to delete board' });
  }
}); 


// card routes

// GET all cards /cards
router.get('/all_cards', async (req, res) => {
  const { boardId, owner } = req.query;
  const where = {};

  if (boardId) where.boardId = Number(boardId);
  if (owner)   where.owner   = owner;

  try {
    const cards = await prisma.card.findMany({
      where,                 
      orderBy: { id: 'asc' } 
    });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});


// GET cards for a board /:boardId/cards
router.get('/boards/:boardId/cards', async (req, res) => {
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
router.post('/boards/:boardId/new_card', async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const { title, description, gif_url, owner } = req.body;

  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        description,
        gif_url,
        date : new Date(),
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

  if (Number.isNaN(cardId)) {
    return res.status(400).json({ error: 'Invalid card id' });
  }

  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { vote_cnt: { increment: 1 } }            
    });
    res.json(updatedCard);
  } catch (err) {
    console.error(err);

    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(500).json({ error: 'Unable to update like count' });
  }
});


// DELETE cards /cards/:cardId
router.delete('/cards/:cardId', async (req, res) => {
  const cardId = parseInt(req.params.cardId);

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