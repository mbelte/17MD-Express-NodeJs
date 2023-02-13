export function truncate(str: string, length = 200) {
    return str.length > length
        ? `${str.substring(0, length)}...`
        : str;
}

export function replaceWithBr(text: string) {
    return text.replace(/\n/g, "<br />")
}