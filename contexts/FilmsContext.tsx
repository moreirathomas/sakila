import { createContext, Dispatch, FunctionComponent, useState } from "react";
import { OrderBy, Page } from "../modules/query";

import { Film } from "../modules/query/film";

const initialState: Film[] = [];

type FilmAction = {
  type: "query";
  page: Page;
  orderBy: OrderBy;
};

// Default values of the context.
export const FilmsContext = createContext({
  state: initialState,
  dispatch: (() => {}) as Dispatch<FilmAction>,
});

type AsyncReducer<S, A> = (prevState: S, action: A) => Promise<S>;

function useAsyncReducer<S, A>(
  reducer: AsyncReducer<S, A>,
  initialState: S
): [S, Dispatch<A>] {
  const [state, setState] = useState(initialState);
  const dispatch = async (action: A) => setState(await reducer(state, action));
  return [state, dispatch];
}

async function reducer(state: Film[], action: FilmAction): Promise<Film[]> {
  switch (action.type) {
    case "query":
      const res = await fetch(
        `api/films?cursor=${action.page.cursor}&limit=${action.page.limit}&order=${action.orderBy.order}&by=${action.orderBy.by}`
      );
      const data = await res.json();
      // TODO handle error
      return data.films;
    default:
      return state;
  }
}

export const FilmsProvider: FunctionComponent = (props) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState);

  return (
    <FilmsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FilmsContext.Provider>
  );
};
