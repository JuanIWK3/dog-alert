import prisma from "@/app/lib/db";
import { MotionsRecord } from "@prisma/client";

export const History = async () => {
  const data: MotionsRecord[] = (await getHistory()).data;

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-4">
      {data.map((motion) => {
        return (
          <div key={motion.id}>
            <p className="text-xl">
              Motion Detected at {motion.createdAt.toString().slice(0, 10)}{" "}
              {motion.createdAt.toString().slice(11, 19)}
            </p>
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
