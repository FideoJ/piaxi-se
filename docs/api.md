FORMAT: 1A
HOST: https://piaxi.resetbypear.com/api

# PIAXI 

# Group Session

## Sessions Collection [/sessions]

### Create a session [POST]

+ Request (application/json)

        {
            "code": "071aeBTI06CYvh2SY2RI0CtqTI0aeBTB",
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "登录成功",
            "data": {
                "openid": "oWsRr5fWB2ppL4SyqEt4do2iD6T4"
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "weixin登录失败",
            "data": {}
        }

# Group Video

## Videos Collection [/videos]

### Retrieve videos [GET]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取video列表成功",
            "data": {
                "videos": [
                    {
                        "video_id": 1,
                        "name": "泰囧",
                        "duration": 10
                    },
                    {
                        "video_id": 2,
                        "name": "无间道",
                        "duration": 10
                    }
                ]
            }
        }

## Video [/videos/{video_id}]

+ Parameters
    - video_id : 1 (number, required) - Video ID

### Retrieve one video [GET]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取video3详情成功",
            "data": {
                "name": "无间道",
                "duration": 10,
                "roles": [
                    {
                        "role_id": 10,
                        "name": "陈永仁"
                    },
                    {
                        "role_id": 11,
                        "name": "刘健明"
                    }
                ]
            }
        }

### Retrieve video subtitle [GET /videos/{video_id}/subtitle]

+ Parameters
    - video_id : 1 (number, required) - Video ID

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取video字幕成功",
            "data": {
                "subtitle": [
                    {
                        "start": 0,
                        "end": 442,
                        "text": "去哪"
                    },
                    {
                        "start": 512,
                        "end": 1418,
                        "text": "我怎么知道"
                    },
                    {
                        "start": 1680,
                        "end": 2733,
                        "text": "你带的路"
                    }
                ]
            }
        }
                
# Group Bgm

## Bgms Collection [/bgms]

### Retrieve bgms [GET]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取bgm列表成功",
            "data": {
                "bgms": [
                    {
                        "bgms_id": 1,
                        "name": "天台",
                        "duration": 10
                    },
                    {
                        "bgms_id": 2,
                        "name": "菜市场",
                        "duration": 10
                    }
                ]
            }
        }

# Group Works

## Works Collection [/works]

### Create one works [POST]

+ Request(application/json)

        {
            "video_id": 2
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "新建作品成功",
            "data": {
                "works_id": 3
            }
        }

### Retrieve works [GET]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取当前用户的works列表成功",
            "data": {
                "works": [
                    {
                        "works_id": 1,
                        "video_id": 23,
                        "name": "无间道",
                        "duration": 10
                    },
                    {
                        "works_id": 2,
                        "video_id": 12,
                        "name": "泰囧",
                        "duration": 10
                    }
                ]
            }
        }

## Works [/works/{works_id}]

### Start face replacing [POST /works/{works_id}/face-replacing]

+ Parameters
    - works_id : 1 (number, required) - Works ID

+ Request(application/json)

        {
            "role_id": 2
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "人脸替换任务提交成功",
            "data": {
                "task": {
                    "state": "ready",
                    "created_at": 1529721555
                }
            }
        }

### Upload subtitle [POST /works/{works_id}/subtitle]

+ Parameters
    - works_id : 1 (number, required) - Works ID

+ Request(application/json)

        {
            "subtitle": [
                {
                    "start": 0,
                    "end": 442,
                    "text": "去哪"
                },
                {
                    "start": 512,
                    "end": 1418,
                    "text": "我怎么知道"
                },
                {
                    "start": 1680,
                    "end": 2733,
                    "text": "你带的路"
                }
            ]
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "字幕上传成功",
            "data": {}
        }

### Start dubbing [POST /works/{works_id}/dubbing]

+ Parameters
    - works_id : 1 (number, required) - Works ID

+ Request(application/json)

        {
            "bgm_id": 3
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "配音任务提交成功",
            "data": {
                "task": {
                    "state": "ready",
                    "created_at": 1529721589
                }
            }
        }

### Query works progress [GET /works/{works_id}/progress]

+ Parameters
    - works_id : 1 (number, required) - Works ID

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "任务进度查询成功",
            "data": {
                "tasks": [
                    {
                        "type": "face",
                        "state": "running",
                        "created_at": 1529721555
                    },
                    {
                        "type": "dub",
                        "state": "ready",
                        "created_at": 1529721589
                    }
                ]
            }
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "任务进度查询成功",
            "data": {
                "tasks": [
                    {
                        "type": "face",
                        "state": "finished",
                        "created_at": 1529721555
                    },
                    {
                        "type": "dub",
                        "state": "running",
                        "created_at": 1529721589
                    }
                ]
            }
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "任务进度查询成功",
            "data": {
                "tasks": [
                    {
                        "type": "face",
                        "state": "finished",
                        "created_at": 1529721555
                    },
                    {
                        "type": "dub",
                        "state": "finished",
                        "created_at": 1529721589
                    }
                ]
            }
        }