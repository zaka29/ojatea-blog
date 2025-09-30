'use client'

import React, { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '../actions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushNotificationsManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
    <div className='w-full'>
      <h3 className='text-xl mb-2'>Push Notifications</h3>
      {subscription ? (
        <>
          <div className='p-2 border border-gray-700 rounded mb-4'>
            <p className='mb-2'>You are subscribed to push notifications.</p>
            <div>
              <button className='bg-amber-500 py-0.5 px-2 rounded text-sm font-bold'
                      onClick={unsubscribeFromPush}>Unsubscribe
              </button>
            </div>
          </div>


          <div className='flex flex-col gap-4 items-start pt-2'>
            <input
              className='w-full border border-gray-500 p-2 px-2 rounded text-sm'
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='bg-teal-500 py-2 px-2 rounded text-sm font-bold' onClick={sendTestNotification}>Send test notification</button>
          </div>
        </>
      ) : (
        <>
          <p className='mb-2'>You are not subscribed to push notifications.</p>
          <button className='bg-teal-500 py-1 px-2 rounded text-sm font-bold' onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  )

}
