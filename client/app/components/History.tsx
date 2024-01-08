import prisma from "@/app/lib/db";
import { MotionsRecord } from "@prisma/client";

export const History = async () => {
  const history: MotionsRecord[] = await getHistory();

  return (
    <div>
      {history.map((motion) => {
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
  return prisma.motionsRecord.findMany({});
}
