type GreetingProps = { name: string };

export function Greeting({ name }: GreetingProps) {
  return <div>Hello, {name}! (SSR)</div>;
}
