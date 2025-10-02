import { PushNotificationsManager } from "@/app/components/PushNotificationManager";
import { InstallPrompt } from "@/app/components/InstallPrompt";

export default function HomePage() {
  return (
    <div
      className="font-sans grid grid-rows-[auto_1fr] items-start justify-items-end min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <div className="w-full p-4 rounded flex flex-col gap-[32px] items-center sm:items-start bg-gray-800">
        <PushNotificationsManager/>
      </div>
      <div className='w-full'>
        <InstallPrompt/>
      </div>
    </div>
  );
}


