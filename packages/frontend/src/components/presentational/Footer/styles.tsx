import style from 'styled-components';
import {Paper} from '@material-ui/core';

export const FooterContainer = style(Paper)`
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 0.5% 1%;
`;

export const FooterContent = style.div`
    flex-grow: 1;
`;
