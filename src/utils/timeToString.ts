const M = 'Morning';
const A = 'Afternoon';
const E = 'Evening';
const N = 'Night';

export const timeToString = (t: string) => {
    let tSliced: string = t;
    let remainder: string = '';
    if (t.length > 5) {
        tSliced = t.slice(0, 5);
        remainder = t.slice(5);
    }

    switch (tSliced) {
        case '06:00':
            return M + ' 06:00' + remainder;
        case '09:00':
            return M + ' 09:00' + remainder;
        case '12:00':
            return A + ' 12:00' + remainder;
        case '15:00':
            return A + ' 15:00' + remainder;
        case '18:00':
            return E + ' 18:00' + remainder;
        case '21:00':
            return E + ' 21:00' + remainder;
        case '00:00':
            return N + ' 00:00' + remainder;
        case '03:00':
            return N + ' 03:00' + remainder;
        default:
            return tSliced;
    }
};
