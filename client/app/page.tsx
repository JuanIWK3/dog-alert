import { History } from "./components/History";
import { Messages } from "./components/Messages";

export default async function Page() {
  return (
    <main>
      <Messages />
      <History />
    </main>
  );
}
