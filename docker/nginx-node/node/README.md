docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node:15 bash

cd /usr/src/app
npm init
npm install express --save