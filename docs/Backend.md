# 后端接口文档

## 获取本地地址

### 请求

```
GET /ip
```

### 返回数据

```json
{
  "id": 205591541,
  "name": "Tongzhou District",
  "name_zh": "通州区",
  "lon": 116.6516918,
  "lat": 39.9069176
}
```

## 天气实况

### 请求

```
GET /qweather/now
- query:
    lon required
    lat required
    lang optional (zh/en)
    unit optional (m/i)
```

### 返回数据

```json
{
  "now": {
    "obsTime": "2026-04-15T15:42+08:00",
    "temp": "23",
    "feelsLike": "20",
    "icon": "502",
    "text": "霾",
    "wind360": "112",
    "windDir": "东南风",
    "windScale": "2",
    "windSpeed": "11",
    "humidity": "42",
    "precip": "0.0",
    "pressure": "1007",
    "vis": "6",
    "cloud": "10",
    "dew": "9"
  }
}
```

## 天气预报

### 请求

```
GET /qweather/forecast
- query:
    lon required
    lat required
    lang optional (zh/en)
    unit optional (m/i)
```

### 返回数据

```json
{
  "daily": [
    {
      "fxDate": "2026-04-17",
      "sunrise": "05:35",
      "sunset": "18:54",
      "moonrise": "04:59",
      "moonset": "18:56",
      "moonPhase": "新月",
      "moonPhaseIcon": "800",
      "tempMax": "24",
      "tempMin": "13",
      "iconDay": "100",
      "textDay": "晴",
      "iconNight": "150",
      "textNight": "晴",
      "wind360Day": "225",
      "windDirDay": "西南风",
      "windScaleDay": "1-3",
      "windSpeedDay": "3",
      "wind360Night": "180",
      "windDirNight": "南风",
      "windScaleNight": "1-3",
      "windSpeedNight": "3",
      "humidity": "63",
      "precip": "0.0",
      "pressure": "1005",
      "vis": "25",
      "cloud": "1",
      "uvIndex": "7"
    }
  ]
}
```

## 生活指数

### 请求

```
GET /qweather/indice
- qury
    lon required
    lat required
    lang optional (zh/en)
```

### 返回数据

```json
{
  "daily": [
    {
      "date": "2026-04-14",
      "type": "9",
      "name": "感冒指数",
      "level": "1",
      "category": "少发",
      "text": "各项气象条件适宜，无明显降温过程，发生感冒机率较低。"
    }
  ]
}
```

## 日相/月相

### 请求

```
GET /qweather/astronomy
- query
    lon required
    lat required
    astronomy optional (sun/moon)
    date string (yyyyMMdd)
```

### 返回数据

```json
{
  "sunrise": "2021-02-20T06:58+08:00",
  "sunset": "2021-02-20T17:57+08:00"
}
```

```json
{
  "moonrise": "2021-11-20T17:25+08:00",
  "moonset": "2021-11-21T07:42+08:00",
  "moonPhase": [
    {
      "fxTime": "2021-11-20T00:00+08:00",
      "value": "0.51",
      "name": "亏凸月",
      "illumination": "100",
      "icon": "805"
    }
  ]
}
```

## 灾害预警

### 请求

```
GET /qweather/alert
- query
    lon required
    lat required
    lang optional (zh/en)
```

### 返回数据

alerts可能为空

```json
{
  "alerts": [
    {
      "id": "202510241119105837988676",
      "senderName": "临桂区气象台",
      "issuedTime": "2025-10-24T11:19+08:00",
      "messageType": {
        "code": "update",
        "supersedes": ["202510181140100706230391"]
      },
      "eventType": {
        "name": "大风",
        "code": "1006"
      },
      "urgency": null,
      "severity": "minor",
      "certainty": null,
      "icon": "1006",
      "color": {
        "code": "blue",
        "red": 30,
        "green": 50,
        "blue": 205,
        "alpha": 1
      },
      "effectiveTime": "2025-10-24T11:19+08:00",
      "onsetTime": "2025-10-24T11:19+08:00",
      "expireTime": "2025-10-25T11:19+08:00",
      "headline": "临桂区气象台更新大风蓝色预警信号",
      "description": "临桂区气象台24日11时19分继续发布大风蓝色预警信号：预计未来24小时内临桂将出现6级（或阵风7级）以上大风，请做好防范。",
      "criteria": "24小时内可能受大风影响，平均风力可达6级以上，或者阵风7级以上；或者已经受大风影响，平均风力为6～7级，或者阵风7～8级并可能持续。",
      "responseTypes": [],
      "instruction": "1. 政府及有关部门按照职责做好防大风工作。\n2. 关好门窗，加固围板、棚架、广告牌等易被风吹动的搭建物，妥善安置易受大风影响的室外物品，遮盖建筑物资。\n3. 相关水域水上作业和过往船舶采取积极的应对措施，如回港避风或者绕道航行等。\n4. 行人注意尽量少骑自行车，刮风时不要在广告牌、临时搭建物等下面逗留。\n5. 有关部门和单位注意森林、草原等防火。"
    }
  ]
}
```

## 空气质量

### 请求

```
GET /qweather/air
- query
    lon required
    lat required
    lang optional (zh/en)
```

### 返回数据

```json
{
  "indexes": [
    {
      "code": "cn-mee",
      "name": "AQI (CN)",
      "aqi": 72,
      "aqiDisplay": "72",
      "level": "2",
      "category": "良",
      "color": {
        "red": 255,
        "green": 255,
        "blue": 0,
        "alpha": 1
      },
      "primaryPollutant": {
        "code": "pm10",
        "name": "PM 10",
        "fullName": "颗粒物（粒径小于等于10µm）"
      },
      "health": {
        "effect": "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。",
        "advice": {
          "generalPopulation": "一般人群可正常活动。",
          "sensitivePopulation": "极少数异常敏感人群应减少户外活动。"
        }
      }
    }
  ],
  "pollutants": [
    {
      "code": "pm2p5",
      "name": "PM 2.5",
      "fullName": "颗粒物（粒径小于等于2.5µm）",
      "concentration": {
        "value": 41,
        "unit": "μg/m³"
      },
      "subIndexes": [
        {
          "code": "cn-mee",
          "aqi": 58,
          "aqiDisplay": "58"
        }
      ]
    },
    {
      "code": "pm10",
      "name": "PM 10",
      "fullName": "颗粒物（粒径小于等于10µm）",
      "concentration": {
        "value": 93.57,
        "unit": "μg/m³"
      },
      "subIndexes": [
        {
          "code": "cn-mee",
          "aqi": 72,
          "aqiDisplay": "72"
        }
      ]
    },
    {
      "code": "no2",
      "name": "NO2",
      "fullName": "二氧化氮",
      "concentration": {
        "value": 26.57,
        "unit": "μg/m³"
      },
      "subIndexes": [
        {
          "code": "cn-mee",
          "aqi": 14,
          "aqiDisplay": "14"
        }
      ]
    },
    {
      "code": "o3",
      "name": "O3",
      "fullName": "臭氧",
      "concentration": {
        "value": 100.57,
        "unit": "μg/m³"
      },
      "subIndexes": [
        {
          "code": "cn-mee",
          "aqi": 32,
          "aqiDisplay": "32"
        }
      ]
    },
    {
      "code": "so2",
      "name": "SO2",
      "fullName": "二氧化硫",
      "concentration": {
        "value": 6.43,
        "unit": "μg/m³"
      },
      "subIndexes": [
        {
          "code": "cn-mee",
          "aqi": 3,
          "aqiDisplay": "3"
        }
      ]
    },
    {
      "code": "co",
      "name": "CO",
      "fullName": "一氧化碳",
      "concentration": {
        "value": 0.65,
        "unit": "mg/m³"
      },
      "subIndexes": [
        {
          "code": "cn-mee",
          "aqi": 7,
          "aqiDisplay": "7"
        }
      ]
    }
  ]
}
```

## 城市搜索

### 请求

```
GET /geo/coordinate
- keyword required
```

### 返回数据

```json
{
  "data": [
    {
      "id": "430728805",
      "lat": 40.02693907316662,
      "lon": 116.23325262900065,
      "name": "Haidian District",
      "name_zh": "海淀区",
      "adcode": "110108",
      "display": "China，Beijing，Haidian District",
      "display_zh": "中国，北京市，海淀区"
    },
    {
      "id": "391080742",
      "lat": 39.91187589459959,
      "lon": 116.36562919413204,
      "name": "Xicheng District",
      "name_zh": "西城区",
      "adcode": "110102",
      "display": "China，Beijing，Xicheng District",
      "display_zh": "中国，北京市，西城区"
    }
  ]
}
```
