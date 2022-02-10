import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css';
import Loading from './Loading';
import Navbar from './Navbar';

const CharacterDetail = () => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { char_id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios(`${process.env.REACT_APP_BASE_URL}/characters/${char_id}`)
      .then((res) => res.data)
      .then((data) => {
        setChar(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [char_id]);

  return (
    <div>
      <Navbar />
      <h1>Character Details</h1>
      {loading && <Loading />}
      {char && (
        <div className="characterContainer">
          <img src={char.img} alt={char.name} />
          <div className="characterInfo">
            <h3>Name:</h3>
            <p>{char.name}</p>
            <h3>Nickname:</h3>
            <p>{char.nickname}</p>
            <h3>Occupation:</h3>
            <ul className="characterOccupation">
              {char.occupation.map((job, index) => (
                <li key={'job' + index}>{job}</li>
              ))}
            </ul>
            <h3>Portrayed by:</h3>
            <p>{char.portrayed}</p>
            <h3>Status:</h3>
            <p>{char.status}</p>
          </div>
        </div>
      )}
      <hr />
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default CharacterDetail;
