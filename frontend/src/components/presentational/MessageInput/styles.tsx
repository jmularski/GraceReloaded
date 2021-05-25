import style from 'styled-components';
import { InputBase } from '@material-ui/core';

export const StyledInput = style(InputBase)`
    & .MuiInputBase-root {
        flex: 1;
    }

    & .MuiInputBase-input {
        height: 100%;
        flex-grow: 1;
    }
`;