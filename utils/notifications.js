import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const KEY = 'MobileFlashcard:notifications'
const ID = 'DailyReminder'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: 'Mobile Flashcards Reminder',
        body: "👋 Don't forget to study today!",
        ios: {
            sound: true
        },
        android: {
            channelId: ID,
            sticky: false,
        }
    };
}

function createChannel() {
    return {
        name: 'Daily Reminder',
        description: 'Daily Reminder to study your flashcards.',
        sound: true,
        priority: 'high'
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.presentLocalNotificationAsync(createNotification());
                        Notifications.createChannelAndroidAsync(ID, createChannel())
                            .then(val => console.log('channel return:', val))
                            .then(() => {
                                Notifications.cancelAllScheduledNotificationsAsync();

                                const tomorrow = new Date();
                                tomorrow.setTime(tomorrow.getTime() + 2 * 60000);
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(20);
                                tomorrow.setMinutes(0);

                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(), {
                                        time: tomorrow,
                                        repeat: 'day'
                                    }
                                );

                                AsyncStorage.setItem(KEY, JSON.stringify(true));
                            })
                            .catch(err => {
                                console.log('err', err);
                            });
                    }
                });
            }
        });
}