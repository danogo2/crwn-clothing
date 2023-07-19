import { createContext, useState, useEffect } from 'react';
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';

// ############### Shop Data Context ############
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // upload data to the firebase
  // ONE TIME OPERATION so we can later download it
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  // get data from firebase
  // to call async function inside useEffect (getCategoriesAndDocuments) instead of making callback async(DON'T!) - we create new async function (getCategoriesMap) within the callback where we call this async function with await and call the whole wrapping function at the bottom
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories');

      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap, setCategoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
