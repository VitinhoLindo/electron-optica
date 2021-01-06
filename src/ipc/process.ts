import ServerSend from './ServerSend'

interface Send {
  pid?: number,
  data?: any,
  url?: string,
  status?: string
}

class IpcHandle {
  declaredFunctions: {
    [key: string] : (arg: { url: string, data: any, pid: number }) => Promise<Send>;
  }

  constructor() {
    this.declaredFunctions = {
      '/': async function (arg: { url: string, data: any, pid: number }): Promise<Send> {
        return ServerSend({});
      },
      '/sync': async function (arg: { url: string, data: any, pid: number }): Promise<Send> {
        return ServerSend({
          pid: arg.pid,
          status: 'success'
        });
      },
      '404': async function (arg: { url: string, data: any, pid: number }): Promise<Send> {
        return ServerSend({
          url: arg.url,
          pid: arg.pid,
          data: {},
          status: 'error'
        });
      }
    };
  }
  
  async handle(arg: { url: string, data: any, pid: number }): Promise<any> {
    const func = this.declaredFunctions[arg.url];
    
    if (!func) return await this.declaredFunctions['404'](arg);
    return await func(arg);
  }
}

export default new IpcHandle();