import { ipcMain } from 'electron'
import process from './process'

ipcMain.on('client-send', async (event, arg: { url: string, data: any, pid: number }): Promise<void> => {
  event.reply('server-send', await process.handle(arg));
});
