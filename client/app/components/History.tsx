import prisma from "@/app/lib/db";
import { MotionsRecord } from "@prisma/client";

export const History = async () => {
  const data: MotionsRecord[] = (await getHistory()).data;

  return (
    <div>
      {data.map((motion) => {
        return (
          <div key={motion.id}>
            <p>Motion Detected at {motion.createdAt.toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
};

async function getHistory() {
  return await fetch("https://dog-alert-psi.vercel.app/api").then((res) =>
    res.json()
  );
}
