import React from 'react';
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

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="clique">
      <Hits
        hitComponent={(hit) => (
          <FeaturedEvent key={hit.hit.objectID} event={hit.hit} />
        )}
      />
    </InstantSearch>
  );
};
