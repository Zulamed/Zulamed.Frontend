export function replacePropertyValueIfSame(
    obj: Record<string, unknown>,
    oldObj: Record<string, unknown>
) {
    for (const key in obj) {
        if (key in oldObj) {
            oldObj[key] = obj[key];
        }
    }
}
