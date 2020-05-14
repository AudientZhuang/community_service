import request from './network.js'

export class Repair {
  constructor(repair) {
    this.householdId = repair.householdId;
    this.name = repair.name;
    this.telephone = repair.telephone;
    this.content = repair.content;
    this.date = repair.date;
    this.status = 0;
    this.reply = "";
  }
}
//新增报修
export function addRepair(repair) {
  return request({
    url: '/repair',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      householdId: repair.householdId,
      name: repair.name,
      telephone: repair.telephone,
      content: repair.content,
      date: repair.date,
      status: repair.status,
      reply: repair.reply
    }
  })
}
//获取住户报修
export function getMyRepairs(householdId) {
  return request({
    url: '/repair',
    data: {
      householdId
    }
  })
}