import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window');

export const COLORS = {
    
    //base color
    primary: '#81ecec',
    secondary: '#cdcdd2',


    //color
    black: '#1e1f20',
    white: '#ffffff',

    lightGray: '#f5f5f6',
    lightGray2: '#f6f6f7',
    lightGray3: '#efeff1',
    lightGray4: '#f8f8f9',

    darkGray: '#898c95',
    transparent: 'transparent',
    
}

export const SIZES = {
    //global size,

    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    largeTitle: 50,
    h1: 30,
    h2: 22, 
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    //APP Demension

    width,
    height,
    
}

const appTheme = {COLORS, SIZES}

export default appTheme