import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from 'react-places-autocomplete';

export default ({ value, onChange, ...props }) => {
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
      '';
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
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <Select
            {...props}
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
