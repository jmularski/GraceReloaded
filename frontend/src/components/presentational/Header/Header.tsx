import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { HeaderContainer, SearchContainer, SearchContainerIcon, ContentContainer, InputContainer } from './styles';

export const Header = ({
  setSearchValue
}: HeaderProps) => {

  return (
    <HeaderContainer>
      <AppBar position="static">
        <Toolbar>
          <ContentContainer>
            <Typography variant="h6" noWrap>
                Grace
            </Typography>
            <SearchContainer>
                <SearchContainerIcon>
                    <SearchIcon />
                </SearchContainerIcon>
                <InputContainer
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
            </SearchContainer>
          </ContentContainer>
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  );
}

const headerPropTypes = {
  setSearchValue: PropTypes.func.isRequired,
};

type HeaderProps = InferProps<typeof headerPropTypes>;