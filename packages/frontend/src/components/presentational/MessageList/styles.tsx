import style from 'styled-components';
import {List} from '@material-ui/core';

export const ListContainer = style.div`
    padding: 3% 2% 5%;
`;

export const StyledList = style(List)`
    maxHeight: 100%;
    overflow: auto;
`;
