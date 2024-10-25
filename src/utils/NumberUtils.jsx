
export default class NumberUtils {
    static format(dateString) {
        const date = new Date(dateString);
        const day = String(date.getMonth() + 1).padStart(2, '0');
        const month = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

}