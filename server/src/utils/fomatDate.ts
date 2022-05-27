const formatDate = (month: number, year: number): string => {
    const formatMonth = ++month;
    if ( formatMonth >= 10) 
        return `${year}-${formatMonth}`;
    return `${year}-0${formatMonth}`;
};

export default formatDate;