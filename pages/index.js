import { useState } from 'react';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import Fuse from 'fuse.js';


import styles from '../styles/Home.module.css';

const CodeSampleModal = dynamic(() => import('../components/CodeSampleModal'))
const Footer = dynamic(() => import('../components/Footer'))
const Header = dynamic(() => import('../components/Head'))
const now = dynamic(()=> import('lodash/now'))


export default function Start({ countries }) {
  const [results, setResults] = useState(countries);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  return (
    <div>
      <Header  />

      <main className={styles.container}>
        <h1 className={styles.title}>
          Powered by <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.heroImage}>
          <Image src="/large-image.jpg" alt="Large Image" width={3048} height={2024} priority />
        </div>

        <div>
          <h2 className={styles.secondaryHeading}>Population Lookup</h2>
          <input
            type="text"
            placeholder="Country search..."
            className={styles.input}
            onChange={async (e) => {
              const { value } = e.currentTarget;
              
              const fuse = new Fuse(countries, {
                keys: ['name'],
                threshold: 0.3,
              });
              const searchResult = fuse
                .search(value)
                .map((result) => result.item);

              const updatedResults = searchResult.length
                ? searchResult
                : countries;
              setResults(updatedResults);

              // Fake analytics hit
              console.info({
                searchedAt: now(),
              });
            }}
          />

          <ul className={styles.countries}>
            {results.map((country) => (
              <li key={country.cca2} className={styles.country}>
                <p>
                  {country.name} - {country.population.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.codeSampleBlock}>
          <h2 className={styles.secondaryHeading}>Code Sample</h2>
          <p>Ever wondered how to write a function that prints Hello World?</p>
          <button onClick={() => setIsModalOpen(true)}>Show Me</button>
          {isModalOpen && (
            <CodeSampleModal
              isOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </main>

      <Footer style = {styles} />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();

  return {
    props: {
      countries: countries.map((country) => ({
        name: country.name.common,
        cca2: country.cca2,
        population: country.population,
      })),
    },
  };
}