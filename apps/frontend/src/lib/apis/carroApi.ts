const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  carros: `${BASE_URL}/api/carros`,
  carroPorId: (id: string) => `${BASE_URL}/api/carros/${id}`,

  allItems: `${BASE_URL}/api/items`,
};
