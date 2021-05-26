import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { SearchContainer, SearchContainerIcon, InputContainer } from './styles';

export const SearchBox = ({ setSearchValue }: SearchBoxProps) => {
    
    return (
        <SearchContainer>
            <SearchContainerIcon>
                <SearchIcon />
            </SearchContainerIcon>
            <InputContainer
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => setSearchValue(event.target.value)}
                id="search"
            />
        </SearchContainer>
    )
}

const searchBoxProps = {
    setSearchValue: PropTypes.func.isRequired
};

type SearchBoxProps = InferProps<typeof searchBoxProps>;