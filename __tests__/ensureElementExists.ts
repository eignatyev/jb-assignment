export function ensureElementExists(element: HTMLElement | null): HTMLElement {
    if (element === null) throw `Element ${element} doesn't exists in DOM`;
    return element;
}
