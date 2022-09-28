import { memo } from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesProps> = memo(
  ({ categoryId, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? "active" : ""}
              key={index}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
