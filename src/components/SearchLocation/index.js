import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';

export default ({ value, onChange, prefix = null, ...props }) => {
  const [search, setSearch] = useState('');

  const getKey = (key) => {
    return prefix ? `${prefix}${key[0].toUpperCase()}${key.slice(1)}` : key;
  };

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
      '';
    await onChange({
      [getKey('zipcode')]: zipcode,
      [getKey('latitude')]: latitude,
      [getKey('longitude')]: longitude,
      [getKey('address')]: place.formatted_address,
      [getKey('country')]:
        place.address_components.length > 0 &&
        place.address_components[0].long_name,
      [getKey('state')]:
        place.address_components.length > 1
          ? place.address_components[1].long_name
          : '',
      [getKey('city')]:
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
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <Select
            {...props}
            searchValue={search}
            showSearch
            loading={loading}
            onSearch={(v) => getInputProps().onChange({ target: { value: v } })}
            onChange={(pid) => {
              const selected = suggestions.find(
                ({ placeId }) => placeId === pid
              );
              if (selected) {
                getSuggestionItemProps(selected).onClick();
              }
            }}
            onBlur={() => setSearch(value)}
            options={
              suggestions &&
              suggestions.length > 0 &&
              suggestions.map((suggestion) => ({
                label: suggestion.description,
                value: suggestion.placeId,
              }))
            }
            filterOption={false}
          />
        );
      }}
    </PlacesAutocomplete>
  );
};
