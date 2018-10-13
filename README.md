部署：`npm run build`

测试`build`版本：`npm install serve -g&&npm run serve`

前端路由部分：

- 页面加载进去请求userInfo:
  - 根据islogin来判断
    - 已登录 ：在xadmin 或 search 页则不跳转 ，否则跳转到/search
    - 未登录 ： 在login 则不跳转，否则跳转到/login
- /login页面：
  - 根据success来判断
    - 1 ： 跳转到/search
    - 0 : 输出error信息

