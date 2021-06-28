import TelegramBot, { Message } from 'node-telegram-bot-api';
import { Command, Text } from './app.const';
import { checkAvailable } from './app.transport';
require('dotenv').config();

const telegramBot = new TelegramBot(process.env.TOKEN!, { polling: true });
const jobQueue = new Map<number, NodeJS.Timeout>();
const ONE_HOUR = 60 * 60 * 1000;

telegramBot.onText(Command.START, ({ chat }: Message) => {
    const { id: chatId } = chat;

    if (jobQueue.has(chatId)) return telegramBot.sendMessage(chatId, Text.ALREADY_JOB);

    const check = () => {
        void checkAvailable()
            .then((isAvailable: boolean) => {
                if (!isAvailable) return;

                void telegramBot.sendMessage(chatId, Text.HOODIE_AVAILABLE, { parse_mode: 'Markdown' });
                const currentJob = jobQueue.get(chatId);

                if (currentJob) deleteJob(currentJob, chatId);
            })
            .catch(() => void 0);

        return check;
    };

    const job = setInterval(check(), ONE_HOUR);
    jobQueue.set(chatId, job);
    void telegramBot.sendMessage(chatId, Text.ADD_JOB);
});

telegramBot.onText(Command.STOP, ({ chat }: Message) => {
    const { id: chatId } = chat;
    const job = jobQueue.get(chatId);

    if (!job) return telegramBot.sendMessage(chatId, Text.NOT_FOUND_JOB);

    deleteJob(job, chatId);
});

function deleteJob(job: NodeJS.Timeout, chatId: number): void {
    clearInterval(job);
    jobQueue.delete(chatId);
    void telegramBot.sendMessage(chatId, Text.DELETE_JOB);
}
