type Params =
  | {
      operator: ">";
      direction: "asc";
    }
  | {
      operator: "<=";
      direction: "desc";
    };

const params = (order: "asc" | "desc"): Params => {
  if (order === "asc") {
    return { operator: ">", direction: "asc" };
  }
  return { operator: "<=", direction: "desc" };
};

const templateStatement = (params: Params) => `
with film_rental(film_id, times_rented) as (
  select film.film_id, count(rental.rental_id)
  from rental, inventory, film
  where rental.inventory_id = inventory.inventory_id and inventory.film_id = film.film_id
  group by film.film_id
)
select film.film_id, film.title, film.rental_rate, film.rating, category.name as category, film_rental.times_rented
from film
left outer join film_category on film.film_id = film_category.film_id
left outer join category on film_category.category_id = category.category_id
left outer join film_rental on film.film_id = film_rental.film_id
where film.film_id ${params.operator} ?
order by ?? ${params.direction}
limit ?;
`;

export const statement = (order: "asc" | "desc") =>
  templateStatement(params(order));
