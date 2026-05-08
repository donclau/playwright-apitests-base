export async function measure(fn: () => Promise<any>) {
  const start = Date.now();
  const response = await fn();
  const duration = Date.now() - start;
  return { response, duration };
}