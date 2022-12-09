import Head from "next/head";
import styles from "../styles/Home.module.css";

import { createClient } from "contentful";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Filter from "../components/Filter";
import RecipeCard from "../components/RecipeCard";
import Paginate from "../components/Paginate";

export async function getStaticProps() {
  // Connects to my contentful Space
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  const res = await client.getEntries({ content_type: "recipe" });
  const allTags = await client.getTags();
  // Gets all Entries under Content Type: Recipe and returns them as Array of Objects
  return {
    props: {
      recipes: res.items,
      tags: allTags.items,
    },
  };
}

export default function Recipes({ recipes, tags }) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [filterBool, setFilterBool] = useState(false);

  // ####   Paginate State   ####
  const [recipesPerPage, setRecipesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  // #### Pagination Change Page ####
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const nodeRef = useRef(null);

  const toggleFilter = () => {
    setFilterBool(!filterBool);
  };
  return (
    <>
      <Head>
        <title>Recipe Collection Blog</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        ></meta>
        <meta
          name="description"
          content="This page has all of our recipies. You can filter by CookTime or by Tag"
        ></meta>
      </Head>

      <div className={styles.container}>
        {/* <button> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleFilter}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.filterIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
        {/* </button> */}

        {filterBool && (
          <Filter
            tags={tags}
            recipes={recipes}
            setFilteredRecipes={setFilteredRecipes}
          />
        )}

        {/* styles.recipeList */}
        <div
          className={`${
            currentRecipes.length > 1
              ? styles.recipeList
              : styles.recipeListOneItem
          }`}
        >
          {currentRecipes.map((recipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))}
        </div>

        <Paginate
          filteredRecipes={filteredRecipes}
          recipesPerPage={recipesPerPage}
          currentPage={currentPage}
          changePage={changePage}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
        />
      </div>
    </>
  );
}