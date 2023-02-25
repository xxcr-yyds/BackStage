// mock 数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    // Mock.Random.float 产生随机数，100-8000 之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          努比亚: Mock.Random.float(100, 8000, 0, 0),
          一加: Mock.Random.float(100, 8000, 0, 0),
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '苹果',
            value: 2999
          },
          {
            name: 'vivo',
            value: 5999
          },
          {
            name: 'oppo',
            value: 1500
          },
          {
            name: '魅族',
            value: 1888
          },
          {
            name: '努比亚',
            value: 2200
          },
          {
            name: '一加',
            value: 1600
          }
        ],

        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          },
        ],

        // 折线图
        orderData: {
          date: ['2023001', '2023002', '2023003', '2023004', '2023005', '2023006', '2023007'],
          data: List
        },

        tableData: [
          {
            name: '苹果',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: 'oppo',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '魅族',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '努比亚',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '一加',
            todayBuy: 350,
            monthBuy: 500,
            totalBuy: 3000
          },
        ]
      }
    }
  }
}