学习笔记



1. 请求Github认证

```
GET https://github.com/login/oauth/authorize

open https://github.com/login/oauth/authorize?client_id=Iv1.ef65c5bdf45bada5

```

2. auth 路由：接收 code ，用code、client_id、client_secret获取access_token

```
// 用code取交换获取access token:

POST https://github.com/login/oauth/access_token

code=${code}&client_id=XXX&client_secret=xxx`

```
3. 创建publish-tool server，接受token，然后点击发布。
```
POST /publish/?token=
```


4. publish路由：用 token 获取用户信息，检查权限，接受发布


```
// access token可以让你以用户的身份请求API
Authorization: token OAUTH-TOKEN
GET https://api.github.com/user
"User-Agent": "bobo-pub"

```

实际操作过程，github网站访问、虚拟机端口转发、拼写错误、调试问题，还是需要耐心和细心才能走通的练习。