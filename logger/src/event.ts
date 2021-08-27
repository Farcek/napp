export interface EventerHandle<T> {
    (e: T): void
}
export class Eventer<T> {
    listeners: Array<EventerHandle<T>> = [];

    on(handle: EventerHandle<T>) {
        this.listeners.push(handle);
        return () => {
            this.listeners = this.listeners.filter((h) => h !== handle);
        }
    }
    emit(e: T) {
        this.listeners.forEach((h) => h(e));
    }
}