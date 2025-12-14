import { SweetService } from '../sweet.service';
import { db } from '../../config/database';

jest.mock('../../config/database', () => ({
  db: {
    prepare: jest.fn(),
  },
}));

describe('SweetService', () => {
  let sweetService: SweetService;

  beforeEach(() => {
    sweetService = new SweetService();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new sweet', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockRun = jest.fn().mockReturnValue({ lastInsertRowid: 1 });
      const mockGet = jest.fn().mockReturnValue(mockSweet);

      (db.prepare as jest.Mock)
        .mockReturnValueOnce({ run: mockRun })
        .mockReturnValueOnce({ get: mockGet });

      const result = await sweetService.create({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 100,
      });

      expect(result).toEqual(mockSweet);
    });
  });

  describe('findAll', () => {
    it('should return all sweets', async () => {
      const mockSweets = [
        {
          id: 1,
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 5.99,
          quantity: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Gummy Bears',
          category: 'Gummies',
          price: 3.99,
          quantity: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const mockAll = jest.fn().mockReturnValue(mockSweets);

      (db.prepare as jest.Mock).mockReturnValueOnce({ all: mockAll });

      const result = await sweetService.findAll();

      expect(result).toEqual(mockSweets);
      expect(result.length).toBe(2);
    });
  });

  describe('findById', () => {
    it('should return a sweet by id', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockGet = jest.fn().mockReturnValue(mockSweet);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      const result = await sweetService.findById(1);

      expect(result).toEqual(mockSweet);
    });

    it('should return null if sweet not found', async () => {
      const mockGet = jest.fn().mockReturnValue(undefined);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      const result = await sweetService.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('search', () => {
    it('should search sweets by name', async () => {
      const mockSweets = [
        {
          id: 1,
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 5.99,
          quantity: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const mockAll = jest.fn().mockReturnValue(mockSweets);

      (db.prepare as jest.Mock).mockReturnValueOnce({ all: mockAll });

      const result = await sweetService.search({ name: 'Chocolate' });

      expect(result).toEqual(mockSweets);
    });

    it('should search sweets by category and price range', async () => {
      const mockSweets = [
        {
          id: 1,
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 5.99,
          quantity: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const mockAll = jest.fn().mockReturnValue(mockSweets);

      (db.prepare as jest.Mock).mockReturnValueOnce({ all: mockAll });

      const result = await sweetService.search({
        category: 'Chocolate',
        minPrice: 1,
        maxPrice: 10,
      });

      expect(result).toEqual(mockSweets);
    });
  });

  describe('update', () => {
    it('should update a sweet', async () => {
      const updatedSweet = {
        id: 1,
        name: 'Updated Chocolate Bar',
        category: 'Chocolate',
        price: 6.99,
        quantity: 90,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockRun = jest.fn();
      const mockGet = jest.fn().mockReturnValue(updatedSweet);

      (db.prepare as jest.Mock)
        .mockReturnValueOnce({ run: mockRun })
        .mockReturnValueOnce({ get: mockGet });

      const result = await sweetService.update(1, {
        name: 'Updated Chocolate Bar',
        price: 6.99,
      });

      expect(result).toEqual(updatedSweet);
    });
  });

  describe('delete', () => {
    it('should delete a sweet', async () => {
      const mockRun = jest.fn().mockReturnValue({ changes: 1 });

      (db.prepare as jest.Mock).mockReturnValueOnce({ run: mockRun });

      const result = await sweetService.delete(1);

      expect(result).toBe(true);
    });

    it('should return false if sweet not found', async () => {
      const mockRun = jest.fn().mockReturnValue({ changes: 0 });

      (db.prepare as jest.Mock).mockReturnValueOnce({ run: mockRun });

      const result = await sweetService.delete(999);

      expect(result).toBe(false);
    });
  });

  describe('purchase', () => {
    it('should decrease quantity when purchasing', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updatedSweet = {
        ...mockSweet,
        quantity: 95,
      };

      const mockGet = jest.fn()
        .mockReturnValueOnce(mockSweet)
        .mockReturnValueOnce(updatedSweet);
      const mockRun = jest.fn();

      (db.prepare as jest.Mock)
        .mockReturnValueOnce({ get: mockGet })
        .mockReturnValueOnce({ run: mockRun })
        .mockReturnValueOnce({ get: mockGet });

      const result = await sweetService.purchase(1, 5);

      expect(result?.quantity).toBe(95);
    });

    it('should throw error if insufficient quantity', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockGet = jest.fn().mockReturnValue(mockSweet);

      (db.prepare as jest.Mock).mockReturnValueOnce({ get: mockGet });

      await expect(sweetService.purchase(1, 10)).rejects.toThrow(
        'Insufficient quantity in stock'
      );
    });
  });

  describe('restock', () => {
    it('should increase quantity when restocking', async () => {
      const mockSweet = {
        id: 1,
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 100,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const updatedSweet = {
        ...mockSweet,
        quantity: 150,
      };

      const mockGet = jest.fn()
        .mockReturnValueOnce(mockSweet)
        .mockReturnValueOnce(updatedSweet);
      const mockRun = jest.fn();

      (db.prepare as jest.Mock)
        .mockReturnValueOnce({ get: mockGet })
        .mockReturnValueOnce({ run: mockRun })
        .mockReturnValueOnce({ get: mockGet });

      const result = await sweetService.restock(1, 50);

      expect(result?.quantity).toBe(150);
    });
  });
});
