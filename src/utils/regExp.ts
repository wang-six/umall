const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/ // 6 - 12 位字母数字组合
const fkongReg = /\S/    //不能为空
const twoDecimalReg = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/ //非零开头的最多带两位小数的数字
const HanziReg = /^[\u4e00-\u9fa5]{0,}$/  //汉字

export {
    passwordReg,
    fkongReg,
    twoDecimalReg,
    HanziReg
}