export class HotPromise<T = void> extends Promise<T> {
  resolve: () => void;
}

export const createHotPromise = () => {
  let resolve;
  const promise = new HotPromise((r) => {
    resolve = r;
  });
  promise.resolve = resolve;
  return promise;
};

export const debug = (name: string, value) => {
  (window as any)[name] = value;
};
