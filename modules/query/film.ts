export interface Film {
  id: number;
  title: string;
  rentalRate: number;
  rating: string;
  category: string;
  timesRented: number;
}

export const film = (data: any): Film => {
  return {
    id: data.film_id,
    title: data.title,
    rentalRate: data.rental_rate,
    rating: data.rating,
    category: data.category,
    timesRented: data.times_rented || 0, // Can be null.
  };
};
