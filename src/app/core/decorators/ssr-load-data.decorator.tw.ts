//The solution to fix the angular universal problem, ApplicationRef.isStable
// is always false, when using a WebSocket to receive data

export function SSRLoadData() {
  return (
    target: Object,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const internal = setInterval(() => null, 500);
      await method?.apply(this, args);
      clearInterval(internal);
    };
  };
}
