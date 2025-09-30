import { PushNotificationsManager } from "@/app/components/PushNotificationManager";
import { InstallPrompt } from "@/app/components/InstallPrompt";

export default function HomePage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PushNotificationsManager />
        <InstallPrompt />
      </main>
    </div>
  );
}
