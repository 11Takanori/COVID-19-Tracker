import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Countries from "./Countries";

function Search(props: any) {
  const searchCountry = (event: any) => {
    const country = Countries.find(
      (object) => object.Country === event.target.value
    );

    if (country) {
      props.setcountryName(country.Slug);
    }
  };

  return (
    <div className="search">
      <div style={{ width: 400 }}>
        <Autocomplete
          className="countryName"
          freeSolo
          options={Countries.map((option) => option.Country)}
          defaultValue="Japan"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by country"
              margin="normal"
              variant="outlined"
            />
          )}
          onSelect={(event) => searchCountry(event)}
        />
      </div>
    </div>
  );
}

export default Search;
