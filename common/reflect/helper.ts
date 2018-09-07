export function initMetadata<T>(key: string, target: object, defaultValue: T): T {

    let meta: T = Reflect.getMetadata(key, target);
    if (meta) {
        return meta;
    }

    Reflect.defineMetadata(key, defaultValue, target);

    return defaultValue;
}
