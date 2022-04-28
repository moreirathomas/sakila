import type { OrderBy } from "./query";

const statementTemplate = (order: OrderBy["order"]) => `
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
order by ?? ${order}, film.film_id asc
limit ?
offset ?;
`;

/**
 * Returns a SQL statement for querying films. The statement has 3 dynamic parameters,
 * in this order: `field` to order by, `limit` and `offset`.
 * @param order internally defines the cursor operator and the direction.
 */
export const statement = (order: OrderBy["order"]) => statementTemplate(order);
