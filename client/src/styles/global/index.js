import "./global.scss";
const GlobalStyles = ({ children }) => {
    return children;
};

export const toVietnameseLowerCase = (string) => {
    const stringConvert = string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "");
    return stringConvert.toLowerCase();
};

export default GlobalStyles;
