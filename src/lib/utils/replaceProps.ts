export function replacePropertyValueIfSame(
    obj: Record<string, any>,
    oldObj: Record<string, any>
) {
    for (const key in obj) {
        if (key in oldObj) {
            oldObj[key] = obj[key];
        }
    }
}
