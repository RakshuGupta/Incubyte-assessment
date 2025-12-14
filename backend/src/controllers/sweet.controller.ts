import { Request, Response } from 'express';
import { SweetService } from '../services/sweet.service';
import { validationResult } from 'express-validator';

const sweetService = new SweetService();

export const createSweet = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const sweet = await sweetService.create(req.body);
    res.status(201).json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await sweetService.findAll();
    res.json(sweets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {
      name: name as string | undefined,
      category: category as string | undefined,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
    };

    const sweets = await sweetService.search(query);
    res.json(sweets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const sweet = await sweetService.update(id, req.body);
    
    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await sweetService.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await sweetService.purchase(id, quantity);
    
    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await sweetService.restock(id, quantity);
    
    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

