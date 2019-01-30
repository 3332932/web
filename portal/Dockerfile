FROM hub.wonhigh.cn/tools/nginx:1.10.1

#MAINTAINER 格式为 MAINTAINER <name>，指定维护者信息。
MAINTAINER liuyuewu <liu.yw@wonhigh.cn>

ENV LANG C.UTF-8

# 修改时区、虚拟终端的TERM类型
ENV TZ=Asia/Shanghai \
    TERM=linux \
    BACKEND_DEFAULT_URL=dev-petrel.sz19f.belle.lan \
    BACKEND_URL=dev-petrel.sz19f.belle.lan \
    ENV_TAG=env-dev

ADD nginx.conf /etc/nginx/nginx.conf  
ADD dist   /var/www/nginx/html/dist/

COPY entrypoint.sh /sbin/entrypoint.sh
RUN chmod 755 /sbin/entrypoint.sh
