type TxParams = Array<any>;

interface ITxParams {
  build(): TxParams;
}

class TxParamsBuilder {
  private pallet: string;
  private method: string;

  constructor(pallet: string, method: string) {
    this.pallet = pallet;
    this.method = method;
  }

  selectClass(key: string) {

  }
}


