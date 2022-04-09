import React from 'react';
import { styled } from '@mui/material/styles';
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  RefinementList,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import FeaturedEvent from '../Events/FeaturedEvent';
const indexName = 'clique';
const searchClient = algoliasearch(
  'BP2RHU4QID',
  '9fd4954b4dcf4de28c9a08cf0ba8b719'
);
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';
import { connectAutoComplete } from 'react-instantsearch-dom';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Autocomplete = ({ hits, currentRefinement = 'odobjsfg', refine }) => (
  <ul>
    <li>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <input
        type="search"
        id="searchbar"
        placeholder="Search by Name, Venue, Location, and More"
        value={currentRefinement}
        onChange={(event) => {
          const hitDisplay = document.querySelector('.search-results');
          hitDisplay.classList.remove('hidden');
          refine(event.currentTarget.value);
        }}
        onBlur={(event) => {
          const hitDisplay = document.querySelector('.search-results');
          hitDisplay.classList.add('hidden');
        }}
      />
    </li>
    <div className="search-results hidden">
      {hits.map((hit) => (
        <p>{hit.name}</p>
      ))}
    </div>
  </ul>
);

export const CustomAutocomplete = connectAutoComplete(Autocomplete);

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="clique">
      <CustomAutocomplete />
      {/* <Hits
        hitComponent={(hit) => (
          <FeaturedEvent key={hit.hit.objectID} event={hit.hit} />
        )}
      /> */}
    </InstantSearch>
  );
};
