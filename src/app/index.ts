import { App } from '@vue/runtime-core'
import System from './system'

class Main extends System {
  vue: App;

  constructor(vue: App) {
    super();
    this.vue = vue;
  }

  sleep(time: string): Promise<boolean> {
    let t = parseFloat(time) || 1.0;
    t *= 1000;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, t);
    });
  }

  // função de renderização
  // utilizada no inicio da aplicação
  async handle(): Promise<void> {
    // geração de chave Assimetrica
    await this.generateKeys();
    // ouvinte de chamadas de processo
    this.listenResponse();
    // sincronia e chaves
    await this.sync();
  }
}

export default async function (vue: App) {
  let main = new Main(vue);
  await main.handle();
  vue.config.globalProperties.$app = main;
}
