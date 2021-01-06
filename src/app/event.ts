import Util from './util'

class Event extends Util {
  listiners: { [key: string]: {[key: number]: (...args: any) => void} };

  constructor() {
    super();
    this.listiners = {};
  }

  setListiner(listiner: string, pid: number, listen: () => void) {
    if (!this.listiners[listiner]) 
      this.listiners[listiner] = {};
    this.listiners[listiner][pid] = listen;
  }

  getPid(arg: string[]): number {
    let pid;

    do {
      pid = this.rand(0, 1000000);
    } while(this.inArray(arg, pid));

    return pid;
  }

  on(listiner: string, listen: (...args: any) => void, callback?: (error: any, result: any) => void) {
    if (!this.listiners[listiner])
      this.listiners[listiner] = {};
    let pid = this.getPid(Object.keys(this.listiners[listiner])), error;

    try {
      this.listiners[listiner][pid] = listen;
    } catch (err) {
      error = err;
    }

    if (callback) {
      if (error) return callback(error, null);
      else       return callback(null, { pid });
    } else {
      if (!error) return;
      console.error(`error in add listiner ${listiner}`);
      throw error;
    }
  }

  emit(listiner: string, ...args: any) {
    if (!this.listiners[listiner]) return;
    const listiners = this.listiners[listiner];

    for(const key in listiners) {
      const func = listiners[key];

      func.apply(null, args);
    }
  }
}

export default Event;