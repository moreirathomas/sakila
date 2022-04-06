export interface Film {
  title: string;
  rentalRate: number;
  rating: string;
  category: string;
  timesRented: number;
}

export const film = (data: any): Film => {
  return {
    title: data.title,
    rentalRate: data.rental_rate,
    rating: data.rating,
    category: data.category,
    timesRented: data.times_rented || 0, // Can be null.
  };
};
