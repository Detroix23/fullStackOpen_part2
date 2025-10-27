// services/search.js

const filter_countries = ( names, search ) => (
  names.filter(name => name
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )
  )
);

export default { filter_countries };
