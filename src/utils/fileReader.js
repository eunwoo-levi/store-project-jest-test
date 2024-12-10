import { readFileSync } from 'fs';
import Product from '../models/Product.js';
import PromotionProduct from '../models/PromotionProduct.js';
import Promotion from '../models/Promotion.js';
import Stock from '../models/Stock.js';

export const readProducts = () => {
  try {
    const content = readFileSync('public/products.md', 'utf-8');
    return parseProducts(content);
  } catch (error) {
    console.error('Error reading products:', error);
  }
};

export const readPromotions = () => {
  try {
    const content = readFileSync('public/promotions.md', 'utf-8');
    return parsePromotions(content);
  } catch (error) {
    console.error('Error reading promotions:', error);
  }
};

const parseProducts = (content) => {
  const [headers, ...lines] = content.split('\n').filter((line) => line.trim() !== '');
  const products = lines.map((line) => {
    const [name, price, quantity, promotion] = line.split(',').map((item) => item.trim());
    if (promotion === 'null') {
      return new Product(name, price, quantity);
    }
    return new PromotionProduct(name, price, quantity, promotion);
  });

  return new Stock(products);
};

const parsePromotions = (content) => {
  const [headers, ...lines] = content.split('\n').filter((line) => line.trim() !== '');
  return lines.map((line) => {
    const [name, buy, get, startDate, endDate] = line.split(',').map((item) => item.trim());
    return new Promotion(name, Number(buy), Number(get), startDate, endDate);
  });
};
