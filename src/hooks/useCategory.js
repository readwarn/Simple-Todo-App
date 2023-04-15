import { useState, useMemo, useEffect } from "react";
import categoryColorPalette from "../constants/category-color-pallete";
import CATEGORIES from "../constants/categories";

const useCategory = (categories = CATEGORIES) => {
  const [updatedCategories, setUpdatedCategory] = useState(categories);
  const [renderred, setRenderred] = useState(false);

  useEffect(() => {
    if (renderred) setUpdatedCategory(categories);
    else setRenderred(true);
  }, [categories]);

  const updateCategory = (id) => {
    setUpdatedCategory((state) => {
      return state.map((category) => {
        return {
          ...category,
          selected: category.id === id ? !category.selected : category.selected,
        };
      });
    });
  };

  const selectedTags = useMemo(() => {
    return [...updatedCategories].reduce((tags, category) => {
      if (category.selected)
        return tags.length
          ? tags.concat(`_${category.type}`)
          : tags.concat(category.type);

      return tags;
    }, "");
  }, [updatedCategories]);

  const getCategoryColor = (type) => categoryColorPalette[type] || "bg-red-500";

  return {
    categories: updatedCategories,
    updateCategory,
    selectedTags,
    getCategoryColor,
  };
};

export default useCategory;
