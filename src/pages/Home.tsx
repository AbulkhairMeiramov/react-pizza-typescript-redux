import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination/Pagination";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { SortPopup } from "../components/SortPopup";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pizzas, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // fetch(
    //   `https://6322b272a624bced307cb4d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setPizzas(arr);
    //     setIsLoading(false);
    //   });

    // await axios
    //   .get(
    //     `https://6322b272a624bced307cb4d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((response) => {
    //     setPizzas(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  const onClickCategory = useCallback(
    (index: number) => {
      dispatch(setCategoryId(index));
    },
    [dispatch]
  );

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <SortPopup sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((pizza: any) => (
                <PizzaBlock
                  id={pizza.id}
                  title={pizza.title}
                  price={pizza.price}
                  imageUrl={pizza.imageUrl}
                  sizes={pizza.sizes}
                  types={pizza.types}
                  key={pizza.id}
                />
              ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
