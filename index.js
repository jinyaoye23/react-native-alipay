import { NativeModules } from 'react-native';
// import { resolve } from 'dns';

const AlipayModul = NativeModules.AlipayModule;

export default class AlipayModule {
  static aliPayAction(payStr) {
    //payStr为从后台获取的支付字符串
    return new Promise((resolve, reject) => {
      AlipayModul.pay(payStr).then((data) => {
        let resultDic = {};
        /*笔者iOS端和安卓端返回的支付回调结果数据不一致，可能和支付宝sdk版本有关，
        读者可自行根据返回数据进行相关处理，iOS(RCTAlipay.m)和安卓(AlipayModule)
        可自行选择需要resolve回调判断处理的数据，如只返回resultStatus*/
        if (Platform.OS === 'ios') {
          resultDic = data[0];
        } else {
          resultDic = data;
        }
        if (resultDic.resultStatus == '9000') {
          //支付成功
          console.log('resolve=');
          resolve(resultDic)
        } else {
          //支付失败
          console.log('reject=');
          reject(resultDic)
        }
      }).catch((err) => {
        console.log('err=' + err);
        this.refs.toast.show('支付失败');
        reject(resultDic)
      });
    })

  }
};
