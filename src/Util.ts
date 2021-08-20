/**
 * Converts a hex string into rgba array.
 * 
 * @param hexString The hex string.
 * @example hexToRgb('ffffff') == [0, 0, 0, 1]
 */
export function hexToRgb(hexString: string): [number, number, number, number] {
    if (typeof hexString == "string" && /^([0-9A-F]{3}){1,2}$/i.test(hexString)) throw new TypeError("Invalid hex code provided!");

    let hex = hexString.replace(/^#/, "");
    let alpha = 1;

    if (hex.length === 8) {
        alpha = parseInt(hex.slice(6, 8), 16) / 255;
        hex = hex.slice(0, 6);
    }

    if (hex.length === 4) {
        alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
        hex = hex.slice(0, 3);
    }

    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255, alpha];
}