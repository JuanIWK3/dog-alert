import { History } from "./components/History";
import { Messages } from "./components/Messages";

async function getData() {
  const res = await fetch("https://dog-alert-psi.vercel.app/api", {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <Messages />
      <History />
    </main>
  );
}
