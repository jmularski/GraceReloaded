import style from 'styled-components';
import { InputBase } from '@material-ui/core';

export const HeaderContainer = style.div`
    flex-grow: 1;
`;

export const ContentContainer = style.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
`;

export const SearchContainer = style.div`
    background-color: rgba(255,255,255,0.25);
    border-radius: 4px;
`;

export const SearchContainerIcon = style.div`
    height: 100%;
    padding: 5px 5px;
    position: absolute;
`;

export const InputContainer = style(InputBase)`
    & .MuiInputBase-input {
        padding: 5px 35px;
    }
`;