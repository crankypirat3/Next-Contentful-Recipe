import styles from "../styles/Paginate.module.css"
import {HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi"


const Paginate = ({
  filteredRecipes,
  recipesPerPage,
  changePage,
  currentPage,
  setEndIndex,
  startIndex,
  setStartIndex,
  endIndex,
}) => {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredRecipes.length / recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const pageArray = pageNumbers.slice(startIndex, endIndex);

  const handleDecrement = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
    if (currentPage > 2) {
      setStartIndex(currentPage - 3);
      setEndIndex(currentPage);
    }
  };

  const handleIncrement = () => {
    if (currentPage < Math.ceil(filteredRecipes.length / recipesPerPage)) {
      changePage(currentPage + 1);
    }
    if (currentPage > 1 && currentPage < pageNumbers.length - 1) {
      setStartIndex(currentPage - 1);
      setEndIndex(currentPage + 2);
    }
  };

  return (
    <nav className={styles.paginateContainer}>
      {/* {currentPage != 1 && ( */}
        <button
          onClick={handleDecrement}
          aria-label={"Previous-Page"}
          className={
            currentPage != 1 
            ? `${styles.paginateButton}` 
            : `${styles.paginateButton} ${styles.paginateIconDisabled}`
          }
        >
          <HiOutlineArrowLeft  className={
            currentPage != 1 
              ? `${styles.paginateIcon}`
              : `${styles.paginateIconDisabled}`
          } />
          
        </button>

      {pageArray.map((number) => (
        <button
          key={number}
          onClick={() => changePage(number)}
          className={
            currentPage == number
              ? ` ${styles.paginateButton} ${styles.paginateNumberActive}`
              : ` ${styles.paginateButton} ${styles.paginateNumber}`
          }
        >
          {number}
        </button>
      ))}
        <button
          onClick={handleIncrement}
          aria-label={"Next-Page"}
          className={
            currentPage != pageNumbers.length &&
              filteredRecipes.length > recipesPerPage 
              ? `${styles.paginateButton}` 
              : `${styles.paginateButton} ${styles.paginateIconDisabled}`
          }
          // className={styles.paginateButton}

        >
          <HiOutlineArrowRight 
          className={
            currentPage != pageNumbers.length &&
            filteredRecipes.length > recipesPerPage 
              ? `${styles.paginateIcon}`
              : `${styles.paginateIconDisabled}`
          } />
          
        </button>
    </nav>
  );
};

export default Paginate;
