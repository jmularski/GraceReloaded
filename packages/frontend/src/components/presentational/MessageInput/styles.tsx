import style from 'styled-components';
import {InputBase} from '@material-ui/core';

export const StyledInput = style(InputBase)`
    && .MuiInputBase-root {
        height: 100%
    }

    & .MuiInputBase-input {
        padding: 1%;
        flex-grow: 1;
    }
`;
