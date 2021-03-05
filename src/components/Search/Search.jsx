import React from 'react';
import { SearchBarContainer } from './styled';
import { Input } from 'semantic-ui-react';

const Search = ({ placeHolder, search }) => {
  return (
    <SearchBarContainer>
      <Input
        icon='search'
        fluid={true}
        onChange={search}
        placeholder={`Search for ${placeHolder}s...`}
      />
    </SearchBarContainer>
  );
};

export { Search as SearchBar };
