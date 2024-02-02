import Config from '../httphelper/Config'

export class Utils {
  static ContentToHtml(str) {
    if (str == null) {
      return ''
    }
    var reg = new RegExp('\n', 'g') //创建正则RegExp对象
    str = str.replace(reg, '<br />')
    return str
  }
  static HtmlDecode(str) {
    if (str == null) {
      return ''
    }

    var s = ''
    if (str.length == 0) return ''
    s = str.replace(/&amp;/g, '&')
    s = s.replace(/&lt;/g, '<')
    s = s.replace(/&gt;/g, '>')
    s = s.replace(/&nbsp;/g, ' ')
    s = s.replace(/&#39;/g, "'")
    s = s.replace(/&quot;/g, '"')

    //s = s.replace(new RegExp("</p>", "gm"), "</p><br />");

    var reg = new RegExp('"/alucard263096/huipaimingkoube/upload/', 'g') //创建正则RegExp对象
    s = s.replace(reg, '"https://cmsdev.app-link.org/alucard263096/huipaimingkoube/upload/')

    //var reg = new RegExp('"/upload/', 'g') //创建正则RegExp对象
    //s = s.replace(reg, '"https://api.kalianworld.cn/upload/')

    return s
  }
  static IsMobile(mobile) {
    return Number(mobile).toString().length == 11 && mobile[0] == '1'
  }
  static UUID() {
    var s = []
    var hexDigits = '0123456789ABCDEF'
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23]
    var uuid = s.join('')
    return uuid
  }
  static GetIDString(arr) {
    var arrstr = []
    for (var i = 0; i < arr.length; i++) {
      arrstr.push(arr[i].id)
    }
    return arrstr.join(',')
  }
  static GetPKData(list) {
    var width = 50
    var height = 50
    var ret = []
    ret.push({
      name: '本校',
      x: 0,
      y: 0
    })
    if (list[0] != null) {
      ret.push({
        name: 'TOP 1',
        x: 100,
        y: 0,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[0].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[0]
      })
    }
    if (list[1] != null) {
      ret.push({
        name: 'TOP 2',
        x: 80.9,
        y: 58.78,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[1].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[1]
      })
    }
    if (list[2] != null) {
      ret.push({
        name: 'TOP 3',
        x: 30.9,
        y: 95.11,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[2].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[2]
      })
    }
    if (list[3] != null) {
      ret.push({
        name: 'TOP 4',
        x: -30.9,
        y: 95.11,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[3].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[3]
      })
    }
    if (list[4] != null) {
      ret.push({
        name: 'TOP 5',
        x: -80.9,
        y: 58.78,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[4].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[4]
      })
    }
    if (list[5] != null) {
      ret.push({
        name: 'TOP 6',
        x: -100,
        y: 0,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[5].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[5]
      })
    }
    if (list[6] != null) {
      ret.push({
        name: 'TOP 7',
        x: -80.9,
        y: -58.78,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[6].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[6]
      })
    }
    if (list[7] != null) {
      ret.push({
        name: 'TOP 8',
        x: -30.9,
        y: -95.11,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[7].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[7]
      })
    }
    if (list[8] != null) {
      ret.push({
        name: 'TOP 9',
        x: 30.9,
        y: -95.11,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[8].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[8]
      })
    }
    if (list[9] != null) {
      ret.push({
        name: 'TOP 10',
        x: 80.9,
        y: -58.78,
        symbol: 'image://' + Config.UploadPath + 'daxue/' + list[9].duibi.logo,
        symbolSize: [width, height],
        label: {
          show: false
        },
        duibi: list[9]
      })
    }
    return ret
  }
  static GetPKLinks(list) {
    var ret = []
    for (var i = 0; i <= 9; i++) {
      if (list[i] != null) {
        var k = i + 1
        ret.push({
          source: 'TOP ' + k.toString(),
          target: '本校',
          lineStyle: {
            curveness: 0.15,
            color: '#048695',
            width: 4
          },
          label: {
            offset: [0, 0],
            show: true,
            formatter: list[i].ordershop
          }
        })
        ret.push({
          source: '本校',
          target: 'TOP ' + k.toString(),
          lineStyle: {
            curveness: 0.15,
            color: '#F7AF12'
          },
          label: {
            offset: [0, 0],
            show: true,
            formatter: list[i].bendian
          }
        })
      }
    }
    return ret
  }
  static getAdjustedPageHeight() {
    // 获取视口高度
      var viewportHeight = window.innerHeight;

      // 获取地址栏的高度
      var addressBarHeight = document.documentElement.clientHeight - viewportHeight;

      // 调整后的页面高度
      var adjustedPageHeight = viewportHeight + addressBarHeight;

      return adjustedPageHeight;
  }
}
