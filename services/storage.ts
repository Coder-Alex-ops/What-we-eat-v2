import { Meal, HistoryEntry } from '../types';

const MEALS_KEY = 'we_eating_meals_v1';
const HISTORY_KEY = 'we_eating_history_v1';

const initialMeals: Omit<Meal, 'id'>[] = [
  // Здравословни
  { name: 'Пиле на грил със салата', category: 'Healthy', mealType: 'Both', cookingTime: 20, difficulty: 'Easy', priceLevel: 'Medium', proteinType: 'Chicken', cuisine: 'Българска', isActive: true },
  { name: 'Печена риба със зеленчуци', category: 'Healthy', mealType: 'Both', cookingTime: 30, difficulty: 'Medium', priceLevel: 'Expensive', proteinType: 'Fish', cuisine: 'Българска', isActive: true },
  { name: 'Пилешка супа', category: 'Healthy', mealType: 'Both', cookingTime: 45, difficulty: 'Medium', priceLevel: 'Cheap', proteinType: 'Chicken', cuisine: 'Българска', isActive: true },
  { name: 'Омлет със зеленчуци', category: 'Healthy', mealType: 'Both', cookingTime: 10, difficulty: 'Easy', priceLevel: 'Cheap', proteinType: 'Eggs', cuisine: 'Българска', isActive: true },
  { name: 'Салата с риба тон', category: 'Healthy', mealType: 'Both', cookingTime: 10, difficulty: 'Easy', priceLevel: 'Medium', proteinType: 'Fish', cuisine: 'Средиземноморска', isActive: true },
  { name: 'Леща чорба', category: 'Healthy', mealType: 'Both', cookingTime: 40, difficulty: 'Medium', priceLevel: 'Cheap', proteinType: 'Vegetarian', cuisine: 'Българска', isActive: true },
  { name: 'Печени зеленчуци със сирене', category: 'Healthy', mealType: 'Both', cookingTime: 35, difficulty: 'Easy', priceLevel: 'Medium', proteinType: 'Vegetarian', cuisine: 'Българска', isActive: true },
  // Средни
  { name: 'Мусака', category: 'Medium', mealType: 'Both', cookingTime: 90, difficulty: 'Hard', priceLevel: 'Medium', proteinType: 'Pork', cuisine: 'Българска', isActive: true },
  { name: 'Пълнени чушки', category: 'Medium', mealType: 'Both', cookingTime: 70, difficulty: 'Hard', priceLevel: 'Medium', proteinType: 'Pork', cuisine: 'Българска', isActive: true },
  { name: 'Пиле с ориз', category: 'Medium', mealType: 'Both', cookingTime: 50, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Chicken', cuisine: 'Българска', isActive: true },
  { name: 'Свинско с картофи', category: 'Medium', mealType: 'Both', cookingTime: 60, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Pork', cuisine: 'Българска', isActive: true },
  { name: 'Кюфтета със салата', category: 'Medium', mealType: 'Both', cookingTime: 40, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Mixed', cuisine: 'Българска', isActive: true },
  { name: 'Боб чорба', category: 'Medium', mealType: 'Both', cookingTime: 60, difficulty: 'Medium', priceLevel: 'Cheap', proteinType: 'Vegetarian', cuisine: 'Българска', isActive: true },
  { name: 'Зеленчукова яхния', category: 'Medium', mealType: 'Both', cookingTime: 45, difficulty: 'Easy', priceLevel: 'Cheap', proteinType: 'Vegetarian', cuisine: 'Българска', isActive: true },
  { name: 'Спагети Болонезе', category: 'Medium', mealType: 'Both', cookingTime: 40, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Beef', cuisine: 'Италианска', isActive: true },
  // Junk
  { name: 'Пица', category: 'Junk', mealType: 'Both', cookingTime: 30, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Mixed', cuisine: 'Италианска', isActive: true },
  { name: 'Дюнер', category: 'Junk', mealType: 'Both', cookingTime: 15, difficulty: 'Easy', priceLevel: 'Cheap', proteinType: 'Chicken', cuisine: 'Турска', isActive: true },
  { name: 'Бургер', category: 'Junk', mealType: 'Both', cookingTime: 20, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Beef', cuisine: 'Американска', isActive: true },
  { name: 'Пържени пилешки хапки', category: 'Junk', mealType: 'Both', cookingTime: 25, difficulty: 'Medium', priceLevel: 'Medium', proteinType: 'Chicken', cuisine: 'Международна', isActive: true },
  { name: 'Пържени картофи с месо', category: 'Junk', mealType: 'Both', cookingTime: 20, difficulty: 'Easy', priceLevel: 'Cheap', proteinType: 'Mixed', cuisine: 'Българска', isActive: true },
  { name: 'Принцеси с кайма', category: 'Junk', mealType: 'Both', cookingTime: 10, difficulty: 'Easy', priceLevel: 'Cheap', proteinType: 'Mixed', cuisine: 'Българска', isActive: true },
  { name: 'Баница с айрян', category: 'Junk', mealType: 'Both', cookingTime: 60, difficulty: 'Medium', priceLevel: 'Cheap', proteinType: 'Eggs', cuisine: 'Българска', isActive: true },
  { name: 'Мешана скара', category: 'Junk', mealType: 'Both', cookingTime: 30, difficulty: 'Medium', priceLevel: 'Expensive', proteinType: 'Mixed', cuisine: 'Българска', isActive: true },
];

export const getMeals = (): Meal[] => {
  const stored = localStorage.getItem(MEALS_KEY);
  if (!stored) {
    const seeded = initialMeals.map((m, i) => ({ ...m, id: `seed-${i}` }));
    saveMeals(seeded);
    return seeded;
  }
  return JSON.parse(stored);
};

export const saveMeals = (meals: Meal[]) => {
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
};

export const addMeal = (meal: Omit<Meal, 'id'>) => {
  const meals = getMeals();
  const newMeal = { ...meal, id: crypto.randomUUID() };
  saveMeals([...meals, newMeal]);
  return newMeal;
};

export const updateMeal = (id: string, updates: Partial<Meal>) => {
  const meals = getMeals();
  const index = meals.findIndex(m => m.id === id);
  if (index !== -1) {
    meals[index] = { ...meals[index], ...updates };
    saveMeals(meals);
  }
};

export const deleteMeal = (id: string) => {
  const meals = getMeals();
  saveMeals(meals.filter(m => m.id !== id));
};

export const getHistory = (): HistoryEntry[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveHistory = (history: HistoryEntry[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'dateTime' | 'cooked'>) => {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    dateTime: new Date().toISOString(),
    cooked: false
  };
  saveHistory([newEntry, ...history]);
  return newEntry;
};

export const markAsCooked = (historyId: string) => {
  const history = getHistory();
  const index = history.findIndex(h => h.id === historyId);
  if (index !== -1) {
    history[index].cooked = true;
    saveHistory([...history]);
  }
};