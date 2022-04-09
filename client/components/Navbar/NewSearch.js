import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import './App.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './NewSearch.css';
import dateFormat from 'dateformat';

function NewSearch() {
  const items = useSelector((state) => state.events);
  let history = useHistory();

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(`Hovered`);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(`Selected`);
    history.push(`/events/${item.city}/${item.id}`);
  };

  const handleOnFocus = () => {
    // console.log('Focused');
  };

  const formatResult = (item) => {
    return (
      //   <span style={{ display: 'block', textAlign: 'left' }}>
      //     name: {item.name}
      //   </span>
      <div className="searchResult">
        <img src={item.imageUrl} />
        <div className="resultDetails">
          <p className="capitalize">{item.name}</p>
          <p>{item.venueName}</p>
          <p>{item.venueAddress}</p>
          <p>
            {dateFormat(item.date, 'fullDate')} at {item.startTime}
          </p>
          <p className="capitalize">{item.city}</p>
        </div>
      </div>
    );
  };

  if (!items) return;

  return (
    <div className="newSearch">
      <header>
        <div style={{ width: 350 }}>
          <ReactSearchAutocomplete
            items={items}
            placeholder="Search by Name, Venue, Location, and More!"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{ zIndex: 1001, fontSize: '13px' }}
          />
        </div>
      </header>
    </div>
  );
}

export default NewSearch;
