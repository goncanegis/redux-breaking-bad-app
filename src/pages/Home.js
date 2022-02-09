import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../redux/charactersSlice';
import Masonry from 'react-masonry-css';
import styles from './Home.module.css';
import Loading from '../components/Loading';

const Home = () => {
  const characters = useSelector((state) => state.characters.items);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === 'failed') {
    return <div>Error</div>;
  }

  return (
    <>
      <main>
        <h1>Characters</h1>
        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 800: 2, 475: 1 }}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {characters.map((character) => (
            <div key={character.char_id}>
              <Link to={`char/${character.char_id}`}>
                <img
                  src={character.img}
                  alt={character.name}
                  className={styles.character}
                />
                <h2>{character.name}</h2>
              </Link>
            </div>
          ))}
        </Masonry>
        {status === 'loading' && <Loading />}

        {hasNextPage && status !== 'loading' && (
          <button
            className={styles.btn}
            onClick={() => dispatch(fetchCharacters(nextPage))}
          >
            Load More
          </button>
        )}

        {!hasNextPage && (
          <div>
            <p>No more characters to show</p>{' '}
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              Back to top
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
