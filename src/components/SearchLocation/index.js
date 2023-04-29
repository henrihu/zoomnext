import { Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';

export default ({ value, type = '', onChange, ...props }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (value && typeof value == 'string') {
      setSearch(value);
    }
  }, [value]);

  const handleSelect = async (address, placeId) => {
    const [place] = await geocodeByPlaceId(placeId);
    const { lat: latitude = '', lng: longitude = '' } = await getLatLng(place);
    const { long_name: zipcode = '' } =
      place.address_components.find((c) => c.types.includes('postal_code')) ||
      {};
    console.log('place', place);
    /*
    state
    city
    coutnry
    */
    await onChange({
      zipcode,
      latitude,
      longitude,
      address: place.formatted_address,
      country:
        place.address_components.length > 0 &&
        place.address_components[0].long_name,
      state:
        place.address_components.length > 1
          ? place.address_components[1].long_name
          : '',
      city:
        place.address_components.length > 2
          ? place.address_components[2].long_name
          : '',
    });
    setSearch(place.formatted_address);
  };

  return (
    <PlacesAutocomplete
      value={search}
      onChange={(v) => setSearch(v)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
            {...props}
            // suffix={loading && <Spin spinning={true} size="small" />}
          />
          <div className="autocomplete-dropdown-container">
            {suggestions &&
              suggestions.length > 0 &&
              suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
