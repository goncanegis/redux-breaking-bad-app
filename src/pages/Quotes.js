import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllQuotes,
  quotesSelector,
  statusSelector,
  errorSelector,
} from '../redux/quotesSlice';
import Error from '../components/Error.js';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const Quotes = () => {
  const dispatch = useDispatch();
  const data = useSelector(quotesSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllQuotes());
    }
  }, [dispatch, status]);

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Navbar />
      <h1>Quotes ({data.length})</h1>
      {status === 'loading' && <Loading />}
      <main>
        {status === 'succeeded' &&
          data.map((item) => (
            <div className="singleQuote" key={item.quote_id}>
              <Link to={`/quotes/${item.quote_id}`}>
                <q>{item.quote}</q>
                <span>
                  <strong> - {item.author}</strong>
                </span>
              </Link>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Quotes;
