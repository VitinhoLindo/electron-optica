import Crypto from './crypto'
let { ipcRenderer } = window.require('electron');

class System extends Crypto {
  // declaração de atributos
  timeout: number;
  sendedListiner: { 
    [key : number]: { 
      url: string,
      data: any,
      date: string,
      encrypt: boolean,
      resolve: (value: any) => void,
      reject: (value: any) => void
    }
  };

  constructor() { 
    super();
    // timeout em segundos
    this.timeout = 12;
    this.sendedListiner = {};
  }

  // encrypta os dados enviados
  async prepareBody(data: any, encrypt: boolean): Promise<any> {
    if (encrypt) data = await this.EncryptDecrypt(data, 'encrypt');
    return data;
  }

  // adiciona nova chamada a thread de chamadas
  setNewListen(
    url: string,
    pid: number,
    date: Date,
    encrypt: boolean,
    data: any,
    resolve: (value: any) => void, 
    reject: (value:any) => void
  ) {
    this.sendedListiner[pid] = {
      url: url,
      data: data,
      date: date.toJSON(),
      encrypt: encrypt,
      resolve: resolve,
      reject: reject
    };
  }

  // nova chamada
  request(arg: { url: string, data: any, encrypt?: boolean }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // obtem um novo pid que não é repetido
      let pid = this.getPid(Object.keys(this.sendedListiner));

      // adicona a thread e realiza a chamada
      this.setNewListen(arg.url, pid, new Date(), arg.encrypt || false, arg.data, resolve, reject);
      ipcRenderer.send('client-send', {
        url: arg.url,
        pid: pid,
        data: await this.prepareBody(arg.data, arg.encrypt || false)          
      });
    });
  }

  listenResponse() {
    try {
      // retorna os dados recebidos
      ipcRenderer.on('server-send', async (event: any, arg: { url: string, data: any, pid: number }) => {
        if (!arg.pid) return;
        const listen = this.sendedListiner[arg.pid];
        if (!listen) return;

        if (arg.data && arg.data && listen.encrypt) arg.data = await this.EncryptDecrypt(arg.data, 'decrypt');
        listen.resolve(arg);
        delete this.sendedListiner[arg.pid];
      });

      // verifica se o tempo ultrapassou o timeout;
      setInterval(() => {
        for(let pid in this.sendedListiner) {
          const listen = this.sendedListiner[pid];

          let dateSend = new Date(listen.date);
          let currentDate = new Date();

          dateSend.setSeconds(dateSend.getSeconds() + this.timeout);

          if (dateSend <= currentDate) {
            listen.reject({
              status: 'error',
              message: 'Sended Timeout',
              result: {}
            });
            delete this.sendedListiner[pid];
          }
        }
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  async sync(): Promise<void> {
    try {
      let response = await this.request({
        url: '/sync',
        data: {
          key: await this.exportKey(this.keys.app.publicKey, 'spki')
        }
      });

      console.log('response', response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default System;