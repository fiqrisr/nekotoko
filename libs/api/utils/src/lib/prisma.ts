export async function transformStringFieldUpdateInput<
  T extends undefined | string | { set?: string }
>(input: T, transform: (input: string) => Promise<string>): Promise<T> {
  if (typeof input === 'object' && typeof input?.set === 'string') {
    return { set: await transform(input.set) } as T;
  }
  if (typeof input === 'object') {
    if (typeof input.set === 'string') {
      return { set: await transform(input.set) } as T;
    }
    return input;
  }
  if (typeof input === 'string') {
    return (await transform(input)) as T;
  }
  return input;
}
