import React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {HeaderContainer, ContentContainer} from './styles';
import {SearchBox} from '../SearchBox';

export const Header = ({
  setSearchValue,
}: HeaderProps) => {
  return (
    <HeaderContainer>
      <AppBar position="fixed">
        <Toolbar>
          <ContentContainer>
            <Typography variant="h6" noWrap>
                Grace
            </Typography>
            <SearchBox setSearchValue={setSearchValue}/>
          </ContentContainer>
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  );
};

const headerPropTypes = {
  setSearchValue: PropTypes.func.isRequired,
};

type HeaderProps = InferProps<typeof headerPropTypes>;
